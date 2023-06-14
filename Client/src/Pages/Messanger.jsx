import React, { useEffect, useState } from "react";
import "../components/chatComponents/CSS_Chat/chat_interface.css";
import "../components/chatComponents/CSS_Chat/temporary.css";
import Chat from "../components/chatComponents/Chat";
import Lobby from "../components/chatComponents/Lobby";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios, {BASE_URL} from "../api/axios";


const Messenger = () =>{ 
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [currRoom, setCurrRoom] = useState(0);
  const [current_message, setCurrent_message] = useState("");
  const [images, setImages] = useState([]);

  const CreateConnect = async () => {   
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(BASE_URL + "/chat")
          .configureLogging(LogLevel.Information)
          .build();
  
          connection.on("ReceiveMessage", message => {            
            setMessages(messages => [...messages, message]);
          });

          connection.on("SetMessages", (messages)=>{
            setMessages(messages);          
          }); 

          connection.on("LoadMoreMessages", (moreMessages) =>{
            setMessages(prevState => [...moreMessages, ...prevState])
          });
       
          connection.onclose(e => {
            setConnection();       
            setCurrRoom(0);
          });
  
          await connection.start();
          setConnection(connection);
      } catch (e) {
        console.log(e);
      }    
  };
  
  useEffect(()=>{
    if(connection){
      connection.invoke("JoinRoom", currRoom);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  const sendImage = async (images) =>{
    let serviceFile = new FormData();
      var i = 0;
      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    
    
      images.forEach(element=>{
        var fileType = element.data_url.substring("data:image/".length, element.data_url.indexOf(";base64"));
        var file = dataURLtoFile(element.data_url, i + '.' + fileType);
        serviceFile.append('images[' + i + ']', file);
        i += 1;
      });
      
    const response = await axios.post(
      "/api/ImageUpload/" + currRoom,
      serviceFile,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    ).then(()=> setImages([]));  
  }

  const sendMessage = async () => {   
    try {
      
      if(images.length)
        sendImage(images);

      if(current_message)
        await connection.invoke("SendMessage", current_message, currRoom);

      setCurrent_message('');
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  const openChat = async (id) => {
      setCurrRoom(id);
      CreateConnect();
      
  }  

  const loadMoreMessages = () =>{
    connection.invoke('LoadMoreMessages', currRoom, messages.length);
  }
    
  return(
        <>     
      <hr className='line' />
        {!connection
          ? <Lobby openChat={openChat} setCurrRoom={setCurrRoom}/>
          : <Chat Current_message={current_message} setCurrent_message={setCurrent_message}
          sendMessage={sendMessage} messages={messages} closeConnection={closeConnection}
          images={images} setImages={setImages} loadMoreMessages={loadMoreMessages}/>}      
        </>
    );
}

export default Messenger;
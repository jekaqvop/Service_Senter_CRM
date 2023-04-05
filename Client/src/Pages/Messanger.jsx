import React, { useState } from "react";
import Avartar from "../components/chatComponents/Avartar";
import MessagesContainer from "../components/chatComponents/MessagesContainer";
import MessageTextBoxContainer from "../components/chatComponents/MessageTextBoxContainer";
import SendButton from "../components/chatComponents/SendButton";
import "./CSS/Messanger.css";
import "../components/chatComponents/CSS_Chat/chat_interface.css";
import "../components/chatComponents/CSS_Chat/temporary.css";


const Messenger = () =>{
    const [Messages, setMessages] = useState([]);
    const [Current_message, setCurrent_message] = useState("");
      

  const addMessageBox = (enter=true) => {
    
    setMessages(prevState => [...prevState, Current_message]);
   
  }

  const handleClick = () => {
    addMessageBox();
    setCurrent_message("");  
  }

  const onChange = (e) => {   
      setCurrent_message(e)  
  }

    const _handleKeyPress = (e) => {
        let enter_pressed = false;
        if(e.key === "Enter"){
          enter_pressed = true;
        }
       
    } 
    return(
        <>
        <div className="messanger">
          <div className="container_rooms">
              <div>
              <ul className="messages" >
                <li className={`message left appeared`}>
                  <Avartar></Avartar>
                  <div >
                      <div className="text">fsfsdfsdf</div>
                  </div>
                </li>
                </ul>
              </div>
          </div>
          <div className="chat_window">
          <MessagesContainer messages={Messages}></MessagesContainer>
            <div className="bottom_wrapper clearfix">
              <MessageTextBoxContainer 
                _handleKeyPress={_handleKeyPress} 
                onChange={onChange} 
                message={Current_message}></MessageTextBoxContainer>
              <SendButton handleClick={handleClick}></SendButton>
            </div>
            
          </div>
        </div>       
        </>
    );
}

export default Messenger;
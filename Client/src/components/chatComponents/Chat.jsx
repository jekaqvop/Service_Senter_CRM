import React, { useEffect, useState } from "react";
import MessagesContainer from "./MessagesContainer";
import MessageTextBoxContainer from "./MessageTextBoxContainer";
import SendButton from "./SendButton";
import ImageUploading from "react-images-uploading";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";
import IconButton from '@material-ui/core/IconButton';

const Chat = (props) =>{
    //const [Messages, setMessages] = useState([]);   
    const {sendMessage, messages, Current_message, 
      setCurrent_message, currId, images, setImages, 
      closeConnection, loadMoreMessages } = props;


    const maxNumber = 5;
    //const handleClick = () => {
    //  setMessages(prevState => [...prevState, Current_message]);      
    //  setCurrent_message("");  
    //}

    const onChange = (e) => {   
        setCurrent_message(e)  
    }

    const onChangeImage = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    const _handleKeyPress = (e) => {        
        if(e.key === "Enter"){
          sendMessage();
        }       
    }  
   
    return(
        <>       
        <div className="messanger">  
          <div className="infoPanel">
            <IconButton onClick={() =>closeConnection()}>
              <img src="/icons8-назад-48.png"/>
            </IconButton>
          </div>         
          <div className="chat_window">  
                
          <MessagesContainer Messages={messages} currId={currId} 
            loadMoreMessages={loadMoreMessages}></MessagesContainer>
            <div className="bottom_wrapper clearfix">
             
              <MessageTextBoxContainer 
                _handleKeyPress={_handleKeyPress} 
                onChange={onChange} 
                message={Current_message}></MessageTextBoxContainer>
              <SendButton handleClick={()=>sendMessage()}></SendButton>
            </div> 
            <ImageUploading
                  multiple
                  value={images}
                  onChange={onChangeImage}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                  }) => (
                    // write your building UI
                    <div >
                      <button 
                          className="addimage_message"
                                              color="primary"
                         
                          disabled={images.length >= maxNumber}
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <img src="/AddImageIcon.png"/>
                      </button>  
                      {/*<button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
                                              onClick={onImageRemoveAll}>Remove all images</button>*/}
                      <div className='images-added'>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={(image.data_url)} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button 
                          className="button is-small is-outlined is-primary"
                                              color="primary" onClick={() => onImageUpdate(index)}>Update</button >
                            <button 
                          className="button is-small is-outlined is-primary"
                                              color="primary"  onClick={() => onImageRemove(index)}>Remove</button >
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                  )}
                </ImageUploading>     
          </div>
        </div>       
        </>       
    );
}

export default Chat;
import React, { useRef } from "react";
import UserMessageBox from "./UserMessageBox";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";

const MessagesContainer = (props) =>{ 
    const scroll = useRef();
    const scrollToBottom = () => {
        var el = scroll;
        el.scrollTop = el.scrollHeight;
      }
    
      const componentDidMount=()=> {
        scrollToBottom();
      }
    
      const componentDidUpdate=()=> {
        scrollToBottom();
      }
    
    
      const createBotMessages = () => {
        console.log(props.messages);
        return props.messages.map((item, index) =>
           <UserMessageBox key={index} message={item} appearance={item["isbotmessage"] ? "left": "right"}/>
        );
      }

      return(
        <ul className="messages" ref={scroll}>
          {createBotMessages()}
        </ul>
      );
      
}

export default MessagesContainer;
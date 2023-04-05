import React from "react";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";

const MessageTextBoxContainer = (props) => {
    return(
        <div className="message_input_wrapper">
          <input id="msg_input" className="message_input" placeholder="Type your messages here..." value={props.message} onChange={(e) => props.onChange(e.target.value)} onKeyPress={props._handleKeyPress}/>
        </div>
      );
}

export default MessageTextBoxContainer;
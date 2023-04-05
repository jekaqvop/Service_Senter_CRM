import React from "react";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";

const SendButton = (props) =>{

    return (
        <div className="send_message" onClick={props.handleClick}>
            <div className="text">send</div>
        </div>
    );
}

export default SendButton;
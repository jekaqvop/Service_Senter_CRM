import React from "react";
import Avartar from "./Avartar";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";

const UserMessageBox = (props) =>{
    return(
        <>
         <li className={`message ${props.appearance} appeared`}>
        <Avartar></Avartar>
        <div className="text_wrapper">
            <div className="text">{props.message}</div>
        </div>
      </li>
        </>
    );
}

export default UserMessageBox;
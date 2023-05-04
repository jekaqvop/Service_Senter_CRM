import React, { useState, useEffect } from "react";
import "./CSS_Chat/room.css"
import "./CSS_Chat/chat_interface.css";
import Avatar from "./Avatar.jsx";

const Room = ({id, openChat, chatName}) => {
   
    return(
        <>      
       <div className="contact" onClick={()=>openChat(id)}>
          <Avatar/>
            <div className="username">
                <h3>{chatName}</h3>
            </div>
        </div>
    </>
    );
}

export default Room;
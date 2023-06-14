import React, { useState, useEffect } from "react";
import "./CSS_Chat/room.css"
import "./CSS_Chat/chat_interface.css";
import Avatar from "./Avatar.jsx";
import { Button } from "@material-ui/core";
import axios from "../../api/axios";

const Room = ({id, openChat, chatName, rooms, setRooms, loadRooms}) => {
    const ROOMS_URL = "/api/private/rooms"
    const deleteRoom = () => {
      const Deleted = async () => {
        const response = await axios.delete(
          ROOMS_URL + "/" + id,         
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        loadRooms();       
      };
      Deleted();
        
    }

    return(
        <>  
        <Button style={{width: "20px", margin:"15px 0 -40px 45%"}} onClick={() => deleteRoom()}>
            <img src="/5990791.png" style={{width: "20px", height: "20px"}}/> 
        </Button>    
       <div className="contact" onClick={()=>openChat(id)} style={{width: ""}}>
          <Avatar/>
            <div className="username">
                
                <h3>{chatName}</h3> 
            </div>
        </div>
    </>
    );
}

export default Room;
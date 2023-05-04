import React, { useEffect, useState } from "react";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";
import Avatar from "./Avatar";

const UserMessageBox = (props) =>{
    const [image, setImage] = useState(null);
    useEffect(()  => {
        const fetchImage = async () => {
            const response = await fetch(`data:image/jpeg;base64,${props.message.messageImage}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImage(url);
        }
        fetchImage();
    }, [props.message.messageImage]);
    return(
        <>
         <li className={`message ${props.appearance} appeared`}>
        <Avatar/>
        <div className="text_wrapper">
            <div className="text">
                {props.message.messageText}
                {props.message.messageImage ? <img src={image} /> : ''}
            </div>
        </div>
      </li>
        </>
    );
}

export default UserMessageBox;
import React from "react";
import "./CSS_Chat/chat_interface.css";

const Avatar = (props) => {
  const formatFullName = (fullName) => {
    let formattedName = fullName.substring(0, 4);
    return formattedName;
  } 
    return(
      <div className="avatar" style={{width: "60px", height: "60px", borderRadius: "30px", textAlign: "center"}}>
        <div style={{marginTop: "15px"}}>
        { props.name ? <>
        {props.name.lenght > 4 ? formatFullName(props.name) + ".." : props.name}</>
        : <></>}
        </div>
      </div>
      );
}

export default Avatar;
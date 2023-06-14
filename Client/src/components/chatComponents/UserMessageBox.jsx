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
    const formatFullName = (fullName) => {
        // Разбиваем строку на массив имени, фамилии и отчества
        const names = fullName.split(' ');
      
        if (names.length >= 3) {
          // Получаем первую букву имени, первую букву отчества и фамилию
          const lastName = names[0].charAt(0).toUpperCase();
          const firstNameInitial = names[1];
          const middleNameInitial = names[2].charAt(0).toUpperCase();
      
          // Соединяем полученные значения в формат "Е.С. Авхачёв"
          const formattedName = `${firstNameInitial} ${middleNameInitial}. ${lastName}.`;
      
          return formattedName;
        }
      
        // Если строка ФИО не содержит необходимых данных, возвращаем исходную строку
        return fullName;
      }

    return(
        <>
         <li className={`message ${props.appearance} appeared`}>
        <Avatar name={props.message.user.login}/>
        <div className="text_wrapper">
            <div className="text">
                <p style={{color: "gray"}}>{formatFullName(props.message.user.userName)}        {new Date(props.message.timeSend).getHours() + ":"  
                        + new Date(props.message.timeSend).getMinutes() + ":" 
                        + new Date(props.message.timeSend).getSeconds()}  </p>  
               
                {props.message.messageText}
                {props.message.messageImage ? <img src={image} /> : ''}
                <br/>             
                
            </div>
        </div>
      </li>
        </>
    );
}

export default UserMessageBox;
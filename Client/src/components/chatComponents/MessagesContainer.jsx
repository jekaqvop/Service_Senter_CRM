import React, { useRef, useState } from "react";
import UserMessageBox from "./UserMessageBox";
import "./CSS_Chat/chat_interface.css";
import "./CSS_Chat/temporary.css";
import { useEffect } from "react";
import axios from "../../api/axios";
import Preloader from "../Preloader/Preloader";

const MessagesContainer = (props) =>{ 
    const scroll = useRef();
    const { Messages, loadMoreMessages } = props;
    const [currId, setCurrId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [prevCountMessages, setPrevCountMessages] = useState(0);
      
      const handleScroll = async () => {        
        const { scrollTop } = scroll.current;       
        if (scrollTop === 0) {                   
          console.log('scroll.current.scrollHeight');
          console.log(scroll.current.scrollHeight);
          setScrollPosition(scroll.current.scrollHeight); 
          setIsLoading(true);
          loadMoreMessages();         
        }
      };    

      const scrollToBottom = () => {
        var el = scroll;
        el.scrollTop = el.scrollHeight;       
      }

      const [scrollPosition, setScrollPosition] = useState(0);
      useEffect(() => {      
        
        if (scroll && scroll.current && prevCountMessages + 1 === Messages.length) {
            const { scrollHeight, clientHeight } = scroll.current;
            scroll.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }else if(scroll && scroll.current && prevCountMessages + 1 < Messages.length){
          setTimeout(() => {
            const { scrollHeight, clientHeight } = scroll.current;
            scroll.current.scrollTo({ left: 0, top: scrollHeight - scrollPosition + clientHeight, behavior: 'smooth' });
            console.log('scrollHeight - scrollPosition');
            console.log(scrollHeight - scrollPosition);
            
          });
        }
        setIsLoading(false);        
        setPrevCountMessages(Messages.length);
      }, [Messages]);
   
      useEffect(() => {
        scroll.current.scrollTop = scroll.current.scrollHeight;
      }, []);

      useEffect(()=>{
        const loadMe = async (e) => {
          try{
             const response = await axios.get(
                "/api/private/AccountPrivateData/me",
                {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true,
                }
            );  
            setCurrId(response.data.id);          
            
          }catch(err){
           console.log(e);
          }         
        };
        loadMe();
      }, []);
             
      return(
        <>        
        <ul className="messages" ref={scroll} onScroll={handleScroll}>
       
          {Messages.map((item, index) =>
           <UserMessageBox key={index} message={item} appearance={item["userId"] !== currId ? "left" : "right"}/>
          )
          }                         
        </ul>       
        </>       
      );
      
}

export default MessagesContainer;
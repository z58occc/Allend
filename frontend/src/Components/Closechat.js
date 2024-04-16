import React, { useContext } from 'react'
import { AiFillMessage } from "react-icons/ai";
import "./chatroom.css";
import { IsLoggedInContext } from "../App";

function Closechat() {

    const {setShowChat} = useContext(IsLoggedInContext);

    const toggleChat = () => {
        setShowChat(true);
    }
  return (
    <button className='chat-close' onClick={()=>toggleChat()}>
      <div style={{paddingRight:'5px'}}><AiFillMessage /></div><span>即時通訊</span>
    </button>
  )
}

export default Closechat

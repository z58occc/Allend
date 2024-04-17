import Axios from "axios"
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

function Messagebox({message ,userId,receiverId}) {



    const formatDate = (value)=>{
        if(!value) return '';
        const date = new Date(value);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const isSentByCurrentUser = message.senderId === userId ;
    return (
        <div >
            <div  style={{ textAlign: message.sender_id === userId || message.receiver_id === userId ? 'right' : 'left' }}>
                <div>
                    <span style={{ backgroundColor: message.sender_id === userId || message.receiver_id === userId ? "#e2f7cb" : "#d4d4d4", width: 'fit-content' }}>{message.content}</span>
                    <p>{formatDate(message.sending_time)}</p>
                </div>
            </div>

        <div style={{ textAlign: isSentByCurrentUser ? 'right' : 'left'}}>
            <div >
                <span style={{backgroundColor:isSentByCurrentUser ?"#e2f7cb":"#d4d4d4",width:'fit-content'}}>{message.message}</span>
                <p >{formatDate(message.created_at)}</p>
            </div>
        </div>
        </div>
    );
}

export default Messagebox

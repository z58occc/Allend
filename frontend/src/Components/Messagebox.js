import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Messagebox({message ,userId,receiverId}) {

    const [library, setLibrary] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost/Allend/backend/public/api/get-message')
        .then(response=>{
            setLibrary(response.data);
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
          });
      }, [])


    const formatDate = (value)=>{
        if(!value) return '';
        const date = new Date(value);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const isSentByCurrentUser = message.senderId === userId;
    return (
        <>
                {library.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender_id === userId ? 'right' : 'left' }}>
            <div>
                <span style={{ backgroundColor: msg.sender_id === userId ? "#e2f7cb" : "#d4d4d4", width: 'fit-content' }}>{msg.content}</span>
                <p>{formatDate(msg.sending_time)}</p>
            </div>
            </div>
            ))}
        <div style={{ textAlign: isSentByCurrentUser ? 'right' : 'left'}}>
            <div >
                <span style={{backgroundColor:isSentByCurrentUser ?"#e2f7cb":"#d4d4d4",width:'fit-content'}}>{message.message}</span>
                <p >{formatDate(message.created_at)}</p>
            </div>
        </div>
        </>
    );
}

export default Messagebox

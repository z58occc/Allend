import Axios from "axios"
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

function Messagebox({message ,userId,receiverId}) {

    const [library, setLibrary] = useState([]);

    useEffect(()=>{
        const fetchMessages = async()=>{
            try{
                const response = await Axios.get('http://localhost/Allend/backend/public/api/get-message', {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
            setLibrary(response.data);
            console.log(response.data);
        }catch(error) {
            console.error('Error fetching messages:', error);
          }
        }
        fetchMessages();
      }, [receiverId])

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
        <div>
            {library.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender_id === userId || msg.receiver_id === userId ? 'right' : 'left' }}>
                <div>
                    <span style={{ backgroundColor: msg.sender_id === userId && msg.receiver_id === receiverId ? "#e2f7cb" : "#d4d4d4", width: 'fit-content' }}>{msg.content}</span>
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
        </div>
    );
}

export default Messagebox

import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Messagebox from './Messagebox';
import Cookies from "js-cookie";
export default function PublicMessagesPage() {

    const [user,setUser] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [member, setMember] = useState('');
    
    async function handleSendMessage(e){
        e.preventDefault();

        if(!message){
            alert('Please type your message');
            return;
        }
        try{
            await Axios.post('/api/new-message', {
                message:message,},{
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
        }catch(error){
            console.error(error);
        }
    };


    useEffect(()=>{
        const fetchMember = async () => {
            try {
            const response = await Axios.get("http://localhost/Allend/backend/public/api/user/email", {
                headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            setMember(response.data.mid);
            } catch (error) {
            console.error('Failed to fetch member email:', error);
            }
        };
        const token = Cookies.get("token");
        if (token) {
            fetchMember();
        }

        Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
        const echo = new Echo({
            authEndpoint: 'http://localhost:8000/broadcasting/auth',
            broadcaster: 'pusher',
            key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
            wsHost: 'realtime-pusher.ably.io',
            wsPort: 443,
            disableStats: true,
            encrypted: true,
            cluster:'eu',
            auth: {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            },
        });


        echo.private('user.' + member).subscribed(()=>{

            console.log('Subscribed to private-chat');
        }).listen('.message.new',(data)=>{
            setMessages((oldMessages)=>[...oldMessages,data]);
            setMessage('');
            console.log(setMessages)
        });
    },[member]);
    return (
        <div>
        <div>
        <div>
        <h1>Public Space</h1>
        <p>Post your random thoughts for the world to see</p>
        </div>
        <div>
        {messages.map((message) => (
        <Messagebox key={message.id} message={message} />
        ))}
        </div>
        <div>
        <form onSubmit={(e) => handleSendMessage(e)}>
        <div>
        <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        />
        <button onClick={(e) => handleSendMessage(e)}>Send</button>
        </div>
        </form>
        </div>
        </div>
        </div>
        );
}

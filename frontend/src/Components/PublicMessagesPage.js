import React, { useContext, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import Axios from "axios"
import Cookies from "js-cookie"
import Echo from "laravel-echo"
import Pusher from "pusher-js"
import Messagebox from "./Messagebox"
import { IsLoggedInContext } from "../App";
import "./chatroom.css";


export default function PublicMessagesPage(props) {
  
  const {setShowChat} = useContext(IsLoggedInContext);

  const [Sconnect, setSconnect] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [senderId, setsenderId] = useState("")
  const [receiverId ,setReceiverId] = useState(props.receiverId)
  const [Library, setLibrary] = useState(false)

  const handleClick = async (receiverId) => {
    setMessages([]);

    try {
      const response = await Axios.get(`http://localhost/Allend/backend/public/api/get-message?receiverId=${receiverId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setMessages(response.data);
      setReceiverId(receiverId);
    } catch (error) {
      console.error("Failed to fetch messages or member email:", error);
    }
  };


    
  const handleCloseChat = () => {
    setShowChat(false);
  }
  async function handleSendMessage(e) {
    e.preventDefault()

    if (!message) {
      alert("Please type your message")
      return
    }
    try {
      await Axios.post(
        `http://localhost/Allend/backend/public/api/new-message?receiverId=${receiverId}`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
  
  const [history, setHistory] = useState([])

  useEffect(() => {

    const historymessage = async ()=> {
      try{
        const response = Axios.get('http://localhost/Allend/backend/public/api/get-mlist',{
        headers:{
          Authorization:`Bearer ${Cookies.get("token")}`,
        }
      })
      .then((response)=>{
        setHistory(response.data)
      })
      }catch(error){
        console.error("Failed to fetch:", error)
      }
  }

    
    const fetchMember = async () => {
      try {
        const response = await Axios.get(`http://localhost/Allend/backend/public/api/user/email?receiverId=${receiverId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        setsenderId(response.data)
      } catch (error) {
        console.error("Failed to fetch member email:", error)
      }
    }
    const token = Cookies.get("token")
    if (token) {
      fetchMember();
      historymessage();
    }

    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
    const fetchDataAndSubscribe = async () => {
      if (senderId.mid && receiverId) {
        try {
          // Fetch messages
          const response = await Axios.get(`http://localhost/Allend/backend/public/api/get-message?receiverId=${receiverId}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          setMessages(response.data);
          setReceiverId(receiverId);

          // Subscribe to private chat
          const echo = new Echo({
            authEndpoint: "http://localhost:8000/broadcasting/auth",
            broadcaster: "pusher",
            key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
            wsHost: "realtime-pusher.ably.io",
            wsPort: 443,
            disableStats: true,
            encrypted: true,
            cluster: "eu",
            auth: {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            },
          });
          echo.private(`private-chat.${receiverId}.${senderId.mid}`)
            .subscribed(() => {
              setSconnect('連線成功');
            })
            .listen(".message.new", (data) => {
              setMessages((oldMessages) => [data, ...oldMessages]);
              setMessage('');
            });
        } catch (error) {
          console.error("Failed to fetch messages or member email:", error);
        }
      }
    };

    fetchDataAndSubscribe();
  }, [senderId.mid, receiverId]);

  return (
    <div className="chat-window">
      <div className="title-section">
      {senderId.receivername ? senderId.receivername + "(" + (senderId.receiveremail ? senderId.receiveremail : "") + ")" : ""}
        <button className="btn-close btn-close-white position-absolute top-10 end-0 " style={{paddingRight:'50px'}} onClick={handleCloseChat}></button>
      </div> 
      <div>
        <div style={{ display: 'flex', height: '400px' }}>
          <div className="chat-menu">
            {history.map((item,index)=>(
              <button key={index} className="chat-list" onClick={()=>handleClick(item.id)}><FaUser style={{paddingRight:"5px"}}/>{item.name}</button>
            ))}
          </div>
          <div> 
            <div style={{ marginBottom:'5px',borderBottom:'solid 1px', overflowY: "scroll",width:'450px',height:"298px",display:'flex',flexDirection:'column-reverse',paddingRight:'3px'}}>
            {Sconnect && <span>{Sconnect}</span>}
              {messages.map((message, index) => (
                <Messagebox key={index} message={message} userId={senderId.mid} receiverId={receiverId} />
              ))}
            </div>
            <div style={{marginTop: 'auto'}}>
              <form onSubmit={(e) => handleSendMessage(e)}>
                  <input className="message-input" type="text" placeholder="輸入你的訊息..." value={message} onChange={(e) => setMessage(e.target.value)} required />
                  <button className="send-button" onClick={(e) => handleSendMessage(e)}>送出</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import Echo from "laravel-echo"
import Pusher from "pusher-js"
import Messagebox from "./Messagebox"
import Cookies from "js-cookie"
import { Link, useParams } from "react-router-dom"
import "./chatroom.css";
export default function PublicMessagesPage(props) {
  
  

  const [Sconnect, setSconnect] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [senderId, setsenderId] = useState("")

  async function handleSendMessage(e) {
    e.preventDefault()

    if (!message) {
      alert("Please type your message")
      return
    }
    try {
      await Axios.post(
        `/new-message?receiverId=${props.receiverId}`,
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

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await Axios.get(`http://localhost/Allend/backend/public/api/user/email?receiverId=${props.receiverId}`, {
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
      fetchMember()
    }

    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
    const subscribeToPrivateChat = () => {
      if (senderId.mid && props.receiverId) {
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
        })
        echo
          .private(`private-chat.${props.receiverId}.${senderId.mid}`)
          .subscribed(() => {
            setSconnect('連線成功')
          })
          .listen(".message.new", (data) => {
            setMessages((oldMessages) => [ data,...oldMessages]);
            setMessage('');
          })
      }
    }
    subscribeToPrivateChat()
  }, [senderId.mid, props.receiverId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSconnect(null);
    }, 5000);  
    return () => clearTimeout(timer);
  }, []);

  return (


    <div className="chat-window">
          <div className="title-section">
            {senderId.receivername}({senderId.receiveremail})
          </div> 
          <div>
            <div style={{ display: 'flex', height: '400px' }}>
              <div className="chat-menu">
                <span >聊天選單</span>
              </div>
                <div> 
                  <div style={{ marginBottom:'5px',borderBottom:'solid 1px', overflowY: "scroll",width:'400px',height:"298px",display:'flex',flexDirection:'column-reverse',paddingRight:'3px'}}>
                  {Sconnect && <span>{Sconnect}</span>}
                    {messages.map((message, index) => (
                      <Messagebox key={index} message={message} userId={senderId.mid} />
                    ))}
                  </div>
                  <div style={{marginTop: 'auto'}}>
                    <form onSubmit={(e) => handleSendMessage(e)}>
                        <input className="message-input" type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} required />
                        <button className="send-button" onClick={(e) => handleSendMessage(e)}>Send</button>
                    </form>
                  </div>
                </div>
                
              </div>
          </div>
    </div>
  )
}

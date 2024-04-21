import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaFacebook, FaLine, FaUserAlt, FaBriefcase  } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoIosTime } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import axios from 'axios';
import { IsLoggedInContext } from "../App";
import CopyButton from './CopyButton';
import ChatButton from './ChatButtom';


export const toggleChatContext = createContext()

function Stick() {
    const {isLoggedIn, setIsLoggedIn, handleShow ,showChat,setShowChat,setSelectedItemMid} = useContext(IsLoggedInContext);

    const toggleChat = (mid) => {
      setShowChat(!showChat);
      setSelectedItemMid(mid);
    };
    const { mid } = useParams();

    const [talent, setTalent] = useState([]);
    useEffect(() => {
        const fetchtalent = async () => {
            try {
                const response = await axios.get(`http://localhost/Allend/backend/public/api/talent?mid=${mid}`);
                setTalent(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchtalent();
    }, [mid])


    return (
        <>
            <div style={{ position: '-webkit-sticky', top: 0 }}>
                <div style={{ textAlign: 'start', fontSize: 20, border: 'solid',borderRadius: "5px"}}>
                    <div style={{ textAlign: 'center', borderBottom: 'solid' }} >
                        <img src={talent.member && talent.member[0].avatar} style={{width: '100px', height: '100px',marginTop:".5rem"}}/>
                        <div>{talent.member && talent.member[0].name}</div>
                        {Array.from({ length: talent.avg_star }, (_, i) => (<CiStar key={i} />))}
                    </div>
                    <div  style={{ marginBottom: '15px',marginTop: '15px' }}>
                        <div style={{ marginBottom: '10px' }}><FaUserAlt style={{color: "#FFB5B5"}}/>
                            接案身分：{talent.member && talent.member[0].i_identity}
                        </div>
                        <div style={{ marginBottom: '10px' }}><IoIosTime style={{color: "#FFB5B5"}}/>
                            上線時間：{talent.member && talent.member[0].last_login}
                        </div>
                        <div style={{ marginBottom: '10px' }}><MdPlace style={{color: "#FFB5B5"}}/>
                            接案地點：{talent.member && talent.member[0].country_city}
                        </div>
                        <div><FaBriefcase style={{color: "#FFB5B5"}}/>
                            成交件數：{talent.case_member_count}
                        </div>
                    </div>
                    <div style={{ borderTop: 'solid', padding: '1rem 0' }}>
                        <a href={talent.member && talent.member[0].fb}>
                            <FaFacebook size={30} />
                        </a>
                        <a href={talent.member && talent.member[0].line}>
                            <FaLine size={30} color='green' />
                        </a>
                        <CopyButton />
                    </div>

                    <div style={{ padding: '12px', borderTop: 'solid' }}>
                        <div onClick={isLoggedIn ? ()=>toggleChat(talent.member?.[0]?.mid) : handleShow} className='text-center'>
                            <ChatButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stick;
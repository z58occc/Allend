import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaLine, FaUserAlt, FaBriefcase, FaHeart  } from "react-icons/fa";
import { CiStar, CiChat1 } from "react-icons/ci";
import { AiFillGitlab } from "react-icons/ai";
import { IoIosTime } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import CopyButton from './CopyButton';
import axios from 'axios';


function Stick() {

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
            <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <div style={{ textAlign: 'start', fontSize: 20, border: 'solid',borderRadius: "5px", width:"188px", height:"530px"}}>
                    <div style={{ textAlign: 'center', borderBottom: 'solid' }} >
                        <img src={talent.member && talent.member[0].avatar} style={{width: '100px', height: '100px',marginTop:"10px"}}/>
                        {/* <AiFillGitlab style={{ color: '#4EFEB3' }} /> */}
                        <p>{talent.member && talent.member[0].name}</p>
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
                    <div style={{ borderTop: 'solid', paddingTop: '20px', paddingBottom: '20px' }}>
                        <a href={talent.member && talent.member[0].fb}>
                            <FaFacebook size={30} />
                        </a>
                        <a href={talent.member && talent.member[0].line}>
                            <FaLine size={30} color='green' />
                        </a>
                        <CopyButton />
                    </div>

                    <div style={{ padding: '12px', borderTop: 'solid' }}>
                        <div className='text-center'>
                            <Link className="text-decoration-none" to={`/chat/${talent.member?.[0]?.mid}`}>
                                <CiChat1 size={20} />聊聊
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stick;
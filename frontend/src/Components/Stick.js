import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { FaFacebook } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CopyButton from './CopyButton';
import { AiFillGitlab } from "react-icons/ai";

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

        <div>
            <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <div style={{ textAlign: 'start', fontSize: 20, border: 'solid', }}>
                    <div style={{ textAlign: 'center', borderBottom: 'solid' }} >
                        <img src={talent.member && talent.member[0].avatar} style={{width: '100px', height: '100px'}}/>
                        {/* <AiFillGitlab style={{ color: '#4EFEB3' }} /> */}
                        <p>{talent.member && talent.member[0].name}</p>
                        {Array.from({ length: talent.avg_star }, (_, i) => (<CiStar key={i} />))}
                    </div>
                    <div  style={{ marginBottom: '15px',marginTop: '15px' }}>
                        <div style={{ marginBottom: '10px' }}>
                            接案身分：{talent.member && talent.member[0].i_identity}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            上線時間：{talent.member && talent.member[0].last_login}
                        </div>
                        <div style={{ marginBottom: '10px' }}> 
                            接案地點：{talent.member && talent.member[0].country_city}
                        </div>
                        <div>
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
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div ><FaHeart size={20} style={{ color: 'red' }}></FaHeart>收藏</div>
                            </div>
                            <div className='col-sm-6' >
                                <div><CiChat1 size={20} />聊聊</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stick
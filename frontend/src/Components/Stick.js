import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import twitter from './twitter.png'
import { FaFacebook } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CopyButton from './CopyButton';


function Stick() {

    const {mid} = useParams();

    const [talent, setTalent] = useState([]);
    useEffect(()=>{
        const fetchtalent = async()=>{
            try{
                const response = await axios.get(`http://localhost/Allend/backend/public/api/talent?mid=${1}`);
                setTalent(response.data);
            }catch(error){
                console.error(error);
            }
        }
        fetchtalent();
    },[mid])
    
    return (

        <div>
            <div style={{ textAlign: 'start', fontSize: 20, border: 'solid',  }}>
                <div style={{ textAlign: 'center', borderBottom: 'solid' }} >
                    <img src={twitter} style={{ width: 25 }} alt=""></img>
                    <p>{talent.member && talent.member[0].name}</p>
                    {Array.from({length:talent.avg_star},(_,i)=>(<CiStar key={i}/>))}
                </div>
                接案身分：{talent.member && talent.member[0].i_identity}
                <br></br>
                上線時間：{talent.member &&  talent.member[0].last_login}
                <br></br>
                接案地點：{talent.member && talent.member[0].country_city}
                <br></br>
                成交件數：{talent.case_member_count}
                <hr></hr>

                <a href={talent.member && talent.member[0].fb}>
                <FaFacebook size={30}  />
                </a>
                <a href={talent.member && talent.member[0].line}>
                <FaLine size={30} color='green' />
                </a>
                <CopyButton  />

                <hr></hr>
                
                <div className='row'>
                    <div style={{ borderRight: 'solid' }} className='col-sm-6'>
                        <FaHeart size={20}></FaHeart>
                        收藏
                    </div>
                    <div className='col-sm-6' >
                        <CiChat1 size={20} />
                        <span>聊聊</span>
                    </div>
                </div>
                <Button style={{marginTop:'20px'}} >邀請報價</Button>
            </div>
        </div>
    )
}

export default Stick
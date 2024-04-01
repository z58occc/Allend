import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import twitter from './twitter.png'
import { FaFacebook } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";
import { useParams } from 'react-router-dom';


function Stick() {

    const {mid} = useParams();

    const [talent, setTalent] = useState([]);
    useEffect(()=>{
        const fetchtalent = async()=>{
            try{
                const response = await fetch(`http://localhost/Allend/backend/public/api/talent?mid=${mid}`);
                setTalent(response.data);
            }catch(error){
                console.error(error);
            }
        }
        fetchtalent();
    },[mid])
    
    return (

        <div>
            <div style={{ textAlign: 'start', fontSize: 10, border: 'solid',  }}>
                <div style={{ textAlign: 'center', borderBottom: 'solid' }} >
                    <img src={twitter} style={{ width: 25 }}></img>
                    <p>會員名稱</p>
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                </div>
                接案身分:<br></br>
                上線時間:<br></br>
                接案地點:台北 台中 高雄<br></br>
                成交件數:
                <hr></hr>
                專長:LOGO設計
                <hr></hr>


                <FaFacebook size={30} />
                <FaLine size={30} />
                <CiShare2 size={30} />



                <hr></hr>
                <div className='row'>
                    <div style={{ borderRight: 'solid' }} className='col-sm-6'>
                        <FaHeart size={20}></FaHeart>
                        收藏
                    </div>
                    <div className='col-sm-6' >
                        <CiChat1 size={20} />
                        <span>直接連絡</span>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <Button >邀請報價</Button>
            </div>
        </div>
    )
}

export default Stick
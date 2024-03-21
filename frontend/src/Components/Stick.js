import React from 'react'
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import twitter from './twitter.png'
import facebook from './facebook.png'


function Stick() {
    return (
        <div>
            <div className='col-sm-3 ' style={{ textAlign: 'center' }}>
                <div >
                    <img src={twitter} style={{ width: 25 }}></img>
                    <p>會員名稱</p>
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <hr></hr>
                    接案身分:<br></br>
                    上線時間:<br></br>
                    接案地點:台北 台中 高雄<br></br>
                    成交件數:
                    <hr></hr>
                    專長:LOGO設計
                    <hr></hr>
                    <button>
                        <img src={facebook} style={{ width: 10 }}></img>
                    </button>
                    <button>
                        <img src={facebook} style={{ width: 10 }}></img>
                    </button>
                    <hr></hr>
                    <div className='row'>
                        <div style={{ borderRight: 'solid' }} className='col-sm-6'>
                            <FaHeart ></FaHeart>
                            收藏
                        </div>
                        <div className='col-sm-6' >
                            <button>直接連絡</button>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button>邀請報價</Button>
                </div>
            </div>
        </div>
    )
}

export default Stick
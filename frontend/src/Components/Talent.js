import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import { CiStar } from "react-icons/ci";
import Nav from 'react-bootstrap/Nav';
import { Link, useParams } from 'react-router-dom';
import Stick from './Stick';
import { FaFacebook } from "react-icons/fa";
import { Col, Row } from 'react-bootstrap';
import { FaLine } from "react-icons/fa";
import axios from 'axios';
import YouTubeEmbed from './youtube';




function Talent() {

    const {mid} = useParams();
    const [talent, setTalent] = useState([]);
    useEffect(()=>{
        const fetchtalent = async()=>{
            try{
                const respone = await axios.get(`http://localhost/Allend/backend/public/api/talent?mid=${mid}`);
                setTalent(respone.data);
            }catch(err){
                console.error(err);
            }
        };
        fetchtalent();
    },[mid])

    
    return (
        <>
            <div className='container'>
                <div>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    />
                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n  .fakeimg {\n    height: 100px;\n    background: #aaa;\n  }\n  "
                        }}
                    />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

                </div>
                <div className='row mt-5 p-5'>
                    <div className='col-sm-2 ' >
                        <div style={{ position: '-webkit-sticky', top: 0 }}>
                            <Stick ></Stick>
                        </div>
                    </div>
                    <div className='col-sm-9' style={{paddingLeft:'40px'}}>
                        <Nav defaultActiveKey="/home" as="ul">
                            <Nav.Item as="li">
                                <Nav.Link href='#about'>關於我</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href='#item'>作品</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href='#video'>影音</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href='#serve'>服務</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href='#price'>評價</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div id='about' style={{ width: 500, height: 250, border: 'solid' }}>
                            {talent.member && talent.member[0].about}
                        </div>

                        <div id='item' className='mt-5'>作品：</div>
                        <div className="row ">
                        {talent.project && talent.project.map((item,index) => (
                            <div className="col-sm-4  ">
                                <div className='card'>
                                    <div className="card-header">
                                        <img src={`data:image/jpeg;base64,${item.image}`} alt="" style={{ width: "100%", height: 200 }}></img>
                                    </div>
                                    <div className="card-body">
                                        <span>{item.p_name}</span>
                                        <div>

                                            <p style={{ fontSize: '12px', float: 'right' }}>發布時間：{item.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                        ))}

                        </div>

                        <div id='video' className='mt-5'>影音：</div>
                        
                        <div className="row">
                        {talent.video && talent.video.map((item,index) => (
                            <div className="col-sm-4">
                                <div className='card'>
                                    <div className="card-header" >
                                        <YouTubeEmbed url={item.src} />
                                    </div>
                                    <div className="card-body">
                                        {item.v_name}
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                        <p id='serve' className='mt-5'>服務：</p>
                        <div className='row'>
                            
                            {talent.service && talent.service.map((item,index)=>(

                            <Link to={`/serve/${mid}/${item.sid}`} className="col-sm-4 ">
                                <div class="card">
                                    <div class="card-header">
                                    <img src={`data:image/jpeg;base64,${item.image}`} alt="" style={{ width: "100%", height: 200 }}></img>
                                        </div>
                                    <div class="card-body">
                                        {item.s_name}
                                        <br></br>
                                        {item.s_amount}/{item.s_unit}
                                    </div>
                                    <div class="card-footer">
                                    </div>
                                </div>
                            </Link>
                            ))}    
                        </div>
                        <div className='mt-5 row'>
                            評價({talent.case_complete && talent.case_complete}):<br></br>
                            {talent.established_case && talent.established_case.map((item,index)=>(
                            <div style={{ border: "solid" }}>
                                <div id='price'>
                                    <span style={{ borderRadius:'10px', backgroundColor: 'skyblue',padding: '2px' }}>
                                        案件</span>
                                    <Link to='/casecontext' style={{ marginLeft: 30 }}>
                                        {item.c_name}</Link>
                                </div>
                                <div>
                                    <Row>
                                        <Col xs lg="1"><FaFacebook size={30}></FaFacebook></Col>
                                        <Col xs lg="10">
                                            <div style={{ border: 'solid' }} >
                                                案主評價：{Array.from({length:item.demmand_star},(_,i)=>(
                                                    <CiStar key={i}/>
                                                ))}
                                                <br></br>
                                                案主留言：{item.demmand_comment}
                                                <br></br>
                                                <div style={{ textAlign: 'right' }}>{item.demmand_time} </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-1' style={{ marginLeft: "50px" }}>
                                        <Col xs lg="1"><FaLine size={30}></FaLine></Col>
                                        <Col xs lg="10">
                                            <div style={{ border: 'solid' }} >
                                                接案人留言：{item.service_comment}
                                                <br></br>
                                                <div style={{ textAlign: 'right' }}>{item.service_time}</div>
                                            </div>
                                        </Col>
                                    </Row> 
                                </div>
                            </div>
                            ))}
                            <br></br>

                            {/* 成交件數 */}
                            <div className='mt-5 row'>
                            成交件數：({talent.case_member_count})
                            <div style={{ border: "solid" }}>
                            {talent.case_member && talent.case_member.map((item,index)=>(
                                <div className='mt-4 '>
                                    <span style={{ border: 'solid' }}>{item.c_name}</span>
                                    <Link style={{ margin: "30px" }} to='/casecontext'></Link>
                                    {item.completed_time}案主：{item.name}
                                </div>
                                ))}
                            </div>
                            </div>
                            {/* 成交件數 */}

                            <br></br>

                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )

}

export default Talent
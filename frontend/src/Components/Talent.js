import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { CiStar } from "react-icons/ci";
import axios from 'axios';
import member from '../RatingPage/member.png';
import Footer from '../homepage/Footer';
import YouTubeEmbed from './youtube';
import Stick from './Stick';



function Talent() {
    const { mid } = useParams();
    const [talent, setTalent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchtalent = async () => {
            try {
                const respone = await axios.get(`http://localhost/Allend/backend/public/api/talent?mid=${mid}`);
                setTalent(respone.data);
            } catch (err) {
                if(err.response.status === 404){
                    navigate('/')
                }
            }
        };
        fetchtalent();
    }, [mid])


    return (
        <>
            <div className='container'>
                <div>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

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
                    <div className='col-sm-9' style={{ paddingLeft: '40px' }}>
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
                        <hr></hr>
                        <div style={{ paddingBottom: "20px" }}>關於</div>
                        <div id='about' style={{ width: 500, height: 250, fontWeight: "700" }}>
                            {talent.member && talent.member[0].about}
                        </div>
                        <hr></hr>
                        <div id='item' className='mt-5'>作品</div>
                        <div className="row ">
                            {talent.project && talent.project.map((item, index) => (
                                <div className="col-sm-4 " key={item}>
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
                        <hr></hr>
                        <div id='video' className='mt-5'>影音</div>

                        <div className="row">
                            {talent.video && talent.video.map((item, index) => (
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
                        <hr></hr>
                        <p id='serve' className='mt-5'>服務</p>
                        <div className='row'>

                            {talent.service && talent.service.map((item, index) => (

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
                        <hr></hr>
                        <div className='mt-5 row'>
                            <div id='price' style={{ paddingBottom: '20px' }}>評價</div>
                            {talent.established_case && talent.established_case.map((item, index) => (
                                <div style={{}}>
                                    <div id='price'>
                                        <span style={{ borderRadius: '10px', padding: '2px', border: 'solid 1px' }}>
                                            案件</span>
                                        <span style={{ padding: '20px' }}>
                                            {item.c_name}</span>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col xs lg="1"><Image src={item.d_avatar === "" ? member : item.d_avatar} roundedCircle width="50" height="50" style={{ cursor: 'pointer' }} /></Col>
                                            <Col xs lg="10">
                                                <div style={{ backgroundColor: 'lightblue' }} >
                                                    案主評價：{Array.from({ length: item.demmand_star }, (_, i) => (
                                                        <CiStar key={i} />
                                                    ))}
                                                    <br></br>
                                                    案主留言：{item.demmand_comment}
                                                    <br></br>
                                                    <div style={{ textAlign: 'right' }}>{item.demmand_time} </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className='mt-1' style={{ marginLeft: "50px" }}>
                                            <Col xs lg="1"><Image src={item.s_avatar === "" ? member : item.s_avatar} roundedCircle width="50" height="50" style={{ cursor: 'pointer' }} /></Col>
                                            <Col xs lg="10">
                                                <div style={{ padding: "20px" }} >
                                                    接案人留言：{item.service_comment}
                                                    <br></br>
                                                    <div style={{ textAlign: 'right' }}>{item.service_time}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
                            <hr></hr>

                            {/* 成交件數 */}
                            <div className='mt-5 row'>
                                <div style={{ paddingBottom: "20px" }}>成交件數({talent.case_member_count})</div>
                                <div style={{ borderRadius: "5px", borderWidth: "1px", backgroundColor: "white", paddingBottom: "20px" }}>
                                    {talent.case_member && talent.case_member.map((item, index) => (
                                        <div className='mt-4 d-flex' >
                                            <Col className='col-2' style={{ borderRadius: "5px", borderWidth: "1px", padding: "0px" }}><span style={{ backgroundColor: "#E0E0E0" }}>{item.c_name}</span></Col>

                                            <Col className='col-3'>案主：{item.name}</Col><span style={{ fontSize: "small", paddingLeft: "10px" }}>{item.completed_time}</span>
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
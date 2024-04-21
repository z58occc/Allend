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
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

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

    const renderEstablishedCase = (item) => (
        <div style={{}}>
            <div id='price'>
                <span style={{ borderRadius: '10px', padding: '2px', border: 'solid 1px' }}>
                    案件</span>
                <span style={{ marginLeft: '1.3rem',backgroundColor: "#E0E0E0" }}>
                    {item.c_name}
                </span>
            </div>
            <div>
                <Row>
                    <Col xs lg="1">
                        <Image src={item.d_avatar === "" ? member : item.d_avatar} roundedCircle width="50" height="50" style={{ cursor: 'pointer' }} />
                    </Col>
                    <Col xs lg="10">
                        <div style={{ backgroundColor: 'lightblue', borderRadius:'.8rem', padding:'.3rem' }} >
                            發案人評價：{Array.from({ length: item.demmand_star }, (_, i) => (
                                <CiStar key={i} />
                            ))}
                            <br></br>
                            發案人留言：{item.demmand_comment}
                            <br></br>
                            <div style={{ textAlign: 'right' }}>{item.demmand_time} </div>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-1' style={{ marginLeft: "50px" }}>
                    <Col xs lg="1"><Image src={item.s_avatar === "" ? member : item.s_avatar} roundedCircle width="50" height="50" style={{ cursor: 'pointer' }} /></Col>
                    <Col xs lg="10">
                        <div style={{ backgroundColor: 'seashell', borderRadius:'.8rem', padding:'.4rem' }} >
                            接案人留言：{item.service_comment}
                            <br></br>
                            <div style={{ textAlign: 'right' }}>{item.service_time}</div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );


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
                    <div className='col-sm-3' style={{display:'flex', justifyContent: 'center'}}>
                            <Stick />
                    </div>
                    <div className='col-sm-9'>
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
                        <div style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>關於我</div>
                        <div id='about' style={{ width: 500, height: 250, fontWeight: "600" }}>
                            {talent.member && talent.member[0].about}
                        </div>
                        <hr></hr>
                        <div id='item' style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>作品</div>
                        <div className="row ">
                            {talent.project && talent.project.map((item, index) => (
                                <div className="col-sm-4 " key={item}>
                                    <div className='card'>
                                        <div className="card-header">
                                            <img src={`data:image/jpeg;base64,${item.image}`} alt="" style={{ width: "100%", height: 200 }}></img>
                                        </div>
                                        <div className="card-body">
                                            <span>{item.p_name}</span>
                                            <div className='text-end'>
                                                <span style={{ fontSize: '12px' }}>發布時間：{item.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr></hr>
                        <div id='video' style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>影音</div>
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
                        <div id='serve' style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>服務</div>
                        <div className='row'>
                            {talent.service && talent.service.map((item, index) => (
                                <Link to={`/serve/${mid}/${item.sid}`} className="col-sm-4 text-decoration-none">
                                    <div class="card">
                                        <div class="card-header">
                                            <img src={`data:image/jpeg;base64,${item.image}`} alt="" style={{ width: "100%", height: 200 }}></img>
                                        </div>
                                        <div class="card-body">
                                            {item.s_name}
                                            <br></br>
                                            {item.s_amount}&nbsp;/&nbsp;{item.s_unit}
                                        </div>
                                        <div class="card-footer">
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <hr></hr>
                        <div id='price' style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>評價</div>
                        <div className='row'>
                            {talent.established_case && talent.established_case.slice(0, 3).map((item, index) => (
                                renderEstablishedCase(item)
                            ))}
                            {talent.established_case && talent.established_case.length > 3 && (
                                <div onClick={handleExpand}>
                                    {expanded ? '收起' : '展開'}
                                </div>
                            )}
                            {expanded && talent.established_case && talent.established_case.slice(3).map((item, index) => (
                                renderEstablishedCase(item)
                            ))}
                        </div>
                        <hr></hr>
                        {/* 成交件數 */}
                        <div style={{ fontSize:'1.2rem', padding: "0.5rem 0 1rem 0" }}>成交件數({talent.case_member_count})</div>
                        <div className='row' style={{ borderRadius: "5px", backgroundColor: "white"}}>
                            {talent.case_member && talent.case_member.map((item, index) => (
                            <div style={{display: 'flex', margin: '.5rem 0'}} >
                                <Col className='col-3' style={{ borderRadius: "5px", borderWidth: "1px" }}>
                                    <span style={{ backgroundColor: "#E0E0E0" ,whiteSpace:'nowrap' }}>{item.c_name}</span>
                                </Col>
                                <Col className='col-6'>發案人：{item.d_name}</Col>
                                <span style={{fontSize: '20px'}}>{item.completed_time}</span>
                            </div>
                            ))}
                        </div>
                        {/* 成交件數 */}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Talent;
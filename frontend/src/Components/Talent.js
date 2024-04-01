import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import { CiStar } from "react-icons/ci";
import Nav from 'react-bootstrap/Nav';
import { GoTriangleDown } from "react-icons/go";
import violence from './violence.jpg'
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
    // const [project,setproject] = useState([]);
    useEffect(()=>{
        const fetchtalent = async()=>{
            try{
                const respone = await axios.get(`http://localhost/Allend/backend/public/api/talent?mid=${1}`);
                setTalent(respone.data);
                // setproject(respone.data.project);
                // console.log(respone.data.member[0].about);
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
                        <div style={{ position: '-webkit-sticky', position: 'sticky', top: 0 }}>
                            <Stick ></Stick>
                        </div>
                    </div>
                    <div className='col-sm-9 '>
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
                                <Nav.Link href='#serve' >服務</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href='#price' >評價</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <div id='about' style={{ width: 500, height: 250, border: 'solid' }}>
                            {talent.member && talent.member[0].about}
                        </div>
                        <div style={{ borderBottom: 'solid', textAlign: 'end' }}>
                            <button>最新<GoTriangleDown /></button>
                            <button>瀏覽數<GoTriangleDown /></button>
                        </div>
                        <div id='item' className='mt-5'>作品:</div>
                        <div className="row ">
                        {talent.project && talent.project.map((item,index) => (
                            <div className="col-sm-4  ">
                                <div className='card'>
                                    <div className="card-header">
                                        <img src={`data:image/jpeg;base64,${item.image}`} style={{ width: "100%", height: 200 }}></img>
                                    </div>
                                    <div className="card-body">
                                        <span>{item.p_name}</span>
                                        <div>

                                            <p style={{ fontSize: '12px', float: 'right' }}>發布時間:{item.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                        ))}


                        </div>


                        <div id='video' className='mt-5'>影音:</div>
                        {talent.video && talent.video.map((item,index) => (
                            
                        <div className="row ">
                            <div className="col-sm-4  ">
                                <div className='card'>
                                    <div className="card-header">
                                        <YouTubeEmbed url={item.src} />
                                    </div>
                                    <div className="card-body">
                                        {item.v_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <p id='serve' className='mt-5'>服務:</p>
                        <div className='row'>
                            
                            <div className="col-sm-4 ">
                                <div className="card" >
                                    <div className="card-header"><img src={violence} style={{ width: 100 }}></img></div>
                                    <div className="card-body">
                                        揍你一拳
                                        <br></br>
                                        $1000/拳
                                        <hr></hr>
                                        接案人名稱:林一拳
                                    </div>
                                    <div className="card-footer " style={{ justifyContent: 'end' }}>2024/03/18</div>
                                </div>
                            </div>
                            
                            {talent.service && talent.service.map((item,index)=>(

                            <Link to='/serve' className="col-sm-4 ">
                                <div class="card">
                                    <div class="card-header">
                                    <img src={`data:image/jpeg;base64,${item.image}`} style={{ width: "100%", height: 200 }}></img>
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

                            <Link to='/serve' className="col-sm-4 ">
                                <div class="card">
                                    <div class="card-header">Header</div>
                                    <div class="card-body">Content</div>
                                    <div class="card-footer">Footer</div>
                                </div>
                            </Link>
                            
                        </div>
                        <div className='mt-5 row'>
                            {/* 評價 */}
                            <div style={{ border: "solid" }}>
                                <div id='price'>
                                    評價(100):<br></br>
                                    <span style={{ border: 'solid' }}>案件</span>
                                    <Link to='/casecontext' style={{ marginLeft: 30 }}>案件名稱</Link>
                                    價錢
                                </div>
                                <div>
                                    <Row>
                                        <Col xs lg="1"><FaFacebook size={30}></FaFacebook></Col>
                                        <Col xs lg="10">
                                            <div style={{ border: 'solid' }} >
                                                案主評價:
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <br></br>
                                                案主留言:服務很好很棒
                                                <br></br>
                                                <div style={{ textAlign: 'right' }}>2024/XX/XX </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-1' style={{ marginLeft: "50px" }}>
                                        <Col xs lg="1"><FaLine size={30}></FaLine></Col>
                                        <Col xs lg="10">
                                            <div style={{ border: 'solid' }} >
                                                接案人留言:服務很好很棒
                                                <br></br>
                                                <div style={{ textAlign: 'right' }}>2024/XX/XX </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            {/* 評價 */}


                            <br></br>

                            {/* 成交件數 */}
                            <div className='mt-5' style={{ border: "solid" }}>
                                <div>
                                    成交件數(100):<br></br>


                                </div>

                                <div className='mt-4 '>
                                    <span style={{ border: 'solid' }}>案件</span>
                                    <Link style={{ margin: "30px" }} to='/casecontext'>案件名稱</Link>
                                    2024/XX/XX 案主:李XX
                                </div>
                                <div className='mt-4 '>
                                    <span style={{ border: 'solid' }}>案件</span>
                                    <Link style={{ margin: "30px" }} to='/casecontext'>案件名稱</Link>
                                    2024/XX/XX 案主:李XX
                                </div>
                                <div className='mt-4 '>
                                    <span style={{ border: 'solid' }}>案件</span>
                                    <Link style={{ margin: "30px" }} to='/casecontext'>案件名稱</Link>
                                    2024/XX/XX 案主:李XX
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
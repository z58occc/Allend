import React from 'react'
import Footer from '../homepage/Footer';
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import twitter from './twitter.png'
import facebook from './facebook.png'
import Nav from 'react-bootstrap/Nav';
import { GoTriangleDown } from "react-icons/go";
import violence from './violence.jpg'
import { Link } from 'react-router-dom';
import cow from './img/cow.jpg'
import beauty from './img/beauty.jpg'
import MRG from './img/MRG.jpg'


function Talent() {
    return (
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
                <div className='col-sm-3 ' style={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'start', fontSize: 10, border: 'solid', position: '-webkit-sticky', position: 'sticky', top: 0 }}>
                        <img src={twitter} style={{ width: 25 }}></img>
                        <p>我吃西紅柿</p>
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <hr></hr>
                        接案身分:個人<br></br>
                        上線時間:2023/10/23<br></br>
                        接案地點:台北<br></br>
                        成交件數:32件
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
                        關於我.........
                    </div>
                    <div style={{ borderBottom: 'solid', textAlign: 'end' }}>
                        <button>最新<GoTriangleDown /></button>
                        <button>瀏覽數<GoTriangleDown /></button>
                    </div>
                    <div id='item' className='mt-5'>作品:</div>
                    <div className="row ">
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">
                                    <img src={cow} style={{ width: "100%" }}></img>
                                </div>
                                <div className="card-body">
                                    <span>作品名稱</span>
                                    <div>
                                    <span style={{ float: 'right' }}>瀏覽數</span><br/>
                                    <p style={{fontSize: '12px',float:'right'}}>發布時間:2024/01/03</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">
                                    <img src={beauty} style={{ width: "100%" }}></img>
                                </div>
                                <div className="card-body">
                                    作品品項<br></br>
                                    發布時間
                                    <span style={{ float: "right" }}>瀏覽數</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">
                                <img src={MRG} style={{ width: "100%" }}></img>
                                    </div>
                                <div className="card-body">
                                    作品品項<br></br>
                                    發布時間
                                    <span style={{ float: "right" }}>瀏覽數</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    

                    <div id='video' className='mt-5'>影音:</div>
                    <div className="row ">
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">img</div>
                                <div className="card-body">
                                    影音名稱
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">img</div>
                                <div className="card-body">
                                    影音名稱
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4  ">
                            <div className='card'>
                                <div className="card-header">img</div>
                                <div className="card-body">
                                    影音名稱
                                </div>
                            </div>
                        </div>

                    </div>
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
                        <Link to='/serve' className="col-sm-4 ">
                            <div class="card">
                                <div class="card-header">Header</div>
                                <div class="card-body">Content</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </Link>
                        <Link to='/serve' className="col-sm-4 ">
                            <div class="card">
                                <div class="card-header">Header</div>
                                <div class="card-body">Content</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </Link>

                    </div>
                    <div className='mt-5 row'>
                        <div id='price'>
                            評價(100):<br></br>
                            <span style={{ border: 'solid' }}>案件</span>
                            <Link to='/casecontext'>案件名稱</Link>
                            價錢
                        </div>
                        <div className='col-sm-2'>
                            <img src={facebook} style={{ width: 50 }}></img>
                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 col-sm-10'>
                            案主評價:
                            <CiStar />
                            <CiStar />
                            <CiStar />
                            <CiStar />
                            <CiStar />
                            <br></br>
                            案主留言:服務很好很棒
                            <br></br>
                            <div style={{ textAlign: 'right' }}>2024/XX/XX 案主李XX</div>
                        </div>
                        <br></br>
                        <div>
                            成交件數(100):<br></br>


                        </div>
                        <div className='col-sm-2'>

                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 '>
                            <span style={{ border: 'solid' }}>案件</span>
                            <Link to='/casecontext'>案件名稱</Link>
                            2024/XX/XX 案主:李XX
                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 '>
                            <span style={{ border: 'solid' }}>案件</span>
                            <Link to='/casecontext'>案件名稱</Link>
                            2024/XX/XX 案主:李XX
                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 '>
                            <span style={{ border: 'solid' }}>案件</span>
                            <Link to='/casecontext'>案件名稱</Link>
                            2024/XX/XX 案主:李XX
                        </div>
                        <br></br>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Talent
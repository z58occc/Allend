import React from 'react'
import Footer from './Footer'
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import twitter from './twitter.png'
import facebook from './facebook.png'
import Nav from 'react-bootstrap/Nav';
import { GoTriangleDown } from "react-icons/go";
import violence from './violence.jpg'


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
                <div className='col-sm-9 '>
                    <Nav defaultActiveKey="/home" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link >關於我</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link >作品</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link >影音</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link >服務</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link >評價</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div style={{ width: 500, height: 250, border: 'solid' }}>
                        關於我.........
                        <br></br>
                        擅長技能.........
                    </div>
                    <div style={{ borderBottom: 'solid', textAlign: 'end' }}>
                        <button>最新<GoTriangleDown /></button>
                        <button>瀏覽數<GoTriangleDown /></button>
                    </div>
                    <div className='mt-5'>作品:</div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <div className='mt-5'>影音:</div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <p>服務:</p>
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
                        <div className="col-sm-4 ">
                            <div class="card">
                                <div class="card-header">Header</div>
                                <div class="card-body">Content</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>
                        <div className="col-sm-4 ">
                            <div class="card">
                                <div class="card-header">Header</div>
                                <div class="card-body">Content</div>
                                <div class="card-footer">Footer</div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 row'>
                        <div>
                            評價(100):<br></br>
                            <span style={{ border: 'solid' }}>案件</span>
                            <a>案件名稱</a>
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
                            <a>案件名稱</a>
                            2024/XX/XX 案主:李XX
                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 '>
                            <span style={{ border: 'solid' }}>案件</span>
                            <a>案件名稱</a>
                            2024/XX/XX 案主:李XX
                        </div>
                        <div style={{ border: 'solid' }} className='mt-4 '>
                            <span style={{ border: 'solid' }}>案件</span>
                            <a>案件名稱</a>
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
import React, { useState } from 'react'
import Footer from './Footer';
import twitter from './twitter.png'
import { CiStar } from "react-icons/ci";
import facebook from './facebook.png'
import { FaHeart } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import logo from './logo.svg'
import ServeContent from './ServeContent';
import ServeRating from './ServeRating';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import violence from './violence.jpg';
import Stick from './Stick';
const Lightbox = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(null);
    setIsOpen(false);
  }
};



function Serve() {


  return (
    <div className='container'>
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


        <div className='col-sm-9 ' style={{ float: 'right' }}>
          <div className='row'>
            <div className='col-sm-6 bg-primary' style={{ border: 'solid' }}>
              <Carousel>
                <Carousel.Item>
                  <img src={logo} text="First slide" />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img src={logo} text="Second slide" />
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img src={logo} text="Third slide" />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

            </div>
            <div className='col-sm-6'>
              服務名稱:LOGO設計<br></br>
              服務報價:$1000/件<br></br>
              評分:
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
              <CiStar />
              <br></br>
              服務地點:<br></br>
              <Button>及時詢問</Button>
            </div>
          </div>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5"
          >
            <Tab eventKey="home" title="服務內容" style={{ width: 500, height: 500 }}>
              我是服務內容的說明
            </Tab>
            <Tab eventKey="profile" title="服務評價" style={{ width: 500, height: 500 }}>
              <div style={{ border: 'solid' }} className='mt-5'>
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
              <div style={{ border: 'solid' }} className='mt-5'>
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
              <div style={{ border: 'solid' }} className='mt-5'>
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
            </Tab>
          </Tabs>
          <div className="row mt-5">
            <p>最新服務:</p>
            <div className="col-sm-4 ">
              <div className="card" >
                <div className="card-header"><img src={violence} style={{ width: 100 }}></img></div>
                <div className="card-body">
                  揍你一拳
                  <br></br>
                  $1000/拳
                </div>
                <div className="card-footer " style={{ justifyContent: 'end' }}><Button>報價詳情</Button></div>
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


        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Serve
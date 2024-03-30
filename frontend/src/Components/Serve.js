import React, { useState } from 'react'
import Footer from '../homepage/Footer';
import { CiStar } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import violence from './violence.jpg';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import product from '../Components/img/product.jfif'
import product2 from '../Components/img/product2.jfif'
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
        <div className='col-sm-2 ' >
          <div style={{position: '-webkit-sticky', position: 'sticky', top: 0}}>
          <Stick ></Stick>
          </div>
        </div>

        <div className='col-sm-9 ' style={{ float: 'right' }}>
          <div className='row'>

            {/* 輪播圖 */}
            <div className="d-flex  justify-content-center">
              <Row >
                <Col >
                  <Carousel id='carousel' interval={null} indicators={false} >
                    <Carousel.Item >
                      <Row className=" justify-content-md-center">
                        <Col xs lg="6"><img src={product} style={{ width: "100%" }} /></Col>
                        <Col xs lg="6" >
                          <div style={{ marginTop: 50, marginLeft: 50 }}>
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
                        </Col>
                      </Row>
                      <Row id='carouselimg' className=" justify-content-md-center" xs={2} lg={6}>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item >
                      <Row className=" justify-content-md-center">
                        <Col xs lg="6"><img src={product} style={{ width: "100%" }} /></Col>
                        <Col xs lg="6" >
                          <div style={{ marginTop: 50, marginLeft: 50 }}>
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
                        </Col>
                      </Row>
                      <Row id='carouselimg' className=" justify-content-md-center" xs={2} lg={6}>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                      </Row>
                    </Carousel.Item>
                    <Carousel.Item >
                      <Row className=" justify-content-md-center">
                        <Col xs lg="6"><img src={product} style={{ width: "100%" }} /></Col>
                        <Col xs lg="6" >
                          <div style={{ marginTop: 50, marginLeft: 50 }}>
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
                        </Col>
                      </Row>
                      <Row id='carouselimg' className=" justify-content-md-center" xs={2} lg={6}>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                        <Col xs lg="2"><img src={product2} /></Col>
                      </Row>
                    </Carousel.Item>

                  </Carousel>
                </Col>
              </Row>
              {/* 輪播圖 */}

            </div>


            {/* <div className='col-sm-6'>
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
            </div> */}
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
            <p>其他服務:</p>
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


        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Serve
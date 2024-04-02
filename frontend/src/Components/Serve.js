import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import { CiStar } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import violence from './violence.jpg';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import product from '../Components/img/Product.jpg'
import product2 from '../Components/img/product2.jpg'
import Stick from './Stick';
import axios from 'axios';
import Talent from './Talent';




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
    const {mid} = useParams();
    const {sid} = useParams();
    const [serve,setServe] = useState([]);

    useEffect(()=>{
      const fetchService = async()=>{
            const response = await axios.get(`http://localhost/Allend/backend/public/api/service_content?mid=${mid}&sid=${sid}`);
            setServe(response.data);
        try{
      }catch(error){
        console.error(error);
      }
    };
    fetchService();
  },[mid,sid]);


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
          <div style={{position: '-webkit-sticky', top: 0}}>
          <Stick ></Stick>
          </div>
        </div>

        <div className='col-sm-9 ' style={{ float: 'right' }}>
          <div className='row'>

            {/* 輪播圖 */}
            {serve.service && serve.service.length > 0 &&
            <div className="d-flex  justify-content-center">
              <Row >
                <Col >
                  <Carousel id='carousel' interval={null} indicators={false} >
                    <Carousel.Item >
                      <Row className=" justify-content-md-center">
                        <Col xs lg="6"><img src={`data:image/jpeg;base64,${serve.service[0].image}`} alt="" style={{ width: "100%", height: 200 }}></img></Col>
                        <Col xs lg="6" >
                          <div style={{ marginTop: 50, marginLeft: 50 }}>
                            服務名稱:{serve.service && serve.service[0].s_name}<br></br>
                            服務報價:{serve.service && serve.service[0].s_amount}/{serve.serve && serve.service[0].s_unit}<br></br>
                            評分:{Array.from({ length: serve.avg_star }, (_, i) => (<CiStar key={i} />))}<br></br>

                            <br></br>
                            服務地點:{serve.service && serve.service[0].country_city}<br></br>
                            <Button>及時詢問</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row id='carouselimg' className=" justify-content-md-center" xs={2} lg={6}>
                        <Col xs lg="2"></Col>
                        <Col xs lg="2"></Col>
                        <Col xs lg="2"></Col>
                      </Row>
                    </Carousel.Item>

                  </Carousel>
                </Col>
              </Row>
           
              {/* 輪播圖 */}

            </div> 
            }
          </div>



          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5"
          >
            <Tab eventKey="home" title="服務內容" style={{ width: 500, height: 500 }}>
              {serve.service && serve.service[0].s_description}
            </Tab>
            <Tab eventKey="profile" title="服務評價" style={{ width: 500, height: 500 }}>
              {serve.service_comments && serve.service_comments.map((item,index) => (
              <div style={{ border: 'solid' }} className='mt-5'>
                案主評價:{Array.from({length:item.dammand_star},(_,i)=>(<CiStar key={i}/>))}
                <br></br>
                案主留言:{item.demmand_comment}
                <br></br>
                <div style={{ textAlign: 'right' }}>{item.completed_time} 案主:{item.name}</div>
              </div>
              ))}
            </Tab>
          </Tabs>
          <div className="row mt-5">
            <p>其他服務:</p>
            {serve.other_serve && serve.other_serve.map((item,index) => (
              <Link to={`/serve/${mid}/${item.sid}`} className="col-sm-4 ">
                <div className="card" >
                  <div className="card-header"><img src={`data:image/jpeg;base64,${item.image}`} alt="" style={{ width: "100%", height: 200 }} ></img></div>
                  <div className="card-body">
                    {item.s_name}
                    <br></br>
                    {item.s_amount}/{item.s_unit}
                  </div>
                  <div className="card-footer " style={{ justifyContent: 'end' }}><Button>報價詳情</Button></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Serve
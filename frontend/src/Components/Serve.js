import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CiStar } from "react-icons/ci";
import axios from 'axios';
import Footer from '../homepage/Footer';
import Stick from './Stick';
import "./Serve.css";
import { IsLoggedInContext } from "../App";
import ChatButton from './ChatButtom';


function Serve() {
  const { mid } = useParams();
  const { sid } = useParams();
  const [serve, setServe] = useState([]);
  const navigate = useNavigate()

  const {isLoggedIn, setIsLoggedIn, handleShow ,showChat,setShowChat,setSelectedItemMid} = useContext(IsLoggedInContext);

  const toggleChat = (mid) => {
    setShowChat(!showChat);
    setSelectedItemMid(mid);
  };


  useEffect(() => {
    const fetchService = async () => {
    try{
        const response = await axios.get(
        `http://localhost/Allend/backend/public/api/service_content?mid=${mid}&sid=${sid}`);
        setServe(response.data);
      }catch (err){
          if(err.response.status === 404){
            navigate('/')
          }
      }
    }

    fetchService();
  }, [mid, sid]);


  return (
    <>
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
          <div className='col-sm-3' >
            <div className='' style={{ position: '-webkit-stick', top: 0 }}>
              <Stick />
            </div>
          </div>

          <div className='col-sm-9'>
            {serve.service && serve.service.length > 0 &&
            <div style={{ display: 'flex', alignItems: 'center', padding: '30px' }}>
              <div style={{ width: "440px", height: "300px" }}>
                <img src={`data:image/jpeg;base64,${serve.service[0].image}`} alt="" style={{ width: "100%", height: "100%" }}></img>
              </div>
              <div style={{ width: "500px", height: "300px", alignContent: 'start', textAlign: 'left', paddingLeft: '50px',fontSize: "25px" }}>
                <div style={{ height: "35px" }}>服務名稱：{serve.service && serve.service[0].s_name}</div>
                <div style={{ height: "35px" }}>服務報價：{serve.service && serve.service[0].s_amount}&nbsp;/&nbsp;{serve.service && serve.service[0].s_unit}</div>
                <div style={{ height: "35px" }}>評分：{Array.from({ length: serve.avg_star }, (_, i) => (<CiStar key={i} />))}</div>
                <div style={{ height: "35px" }}>服務地點：{serve.service && serve.service[0].country_city}<br></br></div>
                <div style={{ height: "35px" }}>                            
                <div onClick={isLoggedIn ? ()=>toggleChat(mid) : handleShow} className='text-center p-2'>
                                        <ChatButton /></div>
                </div>
              </div>
            </div>
            }

            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3 mt-5"
              style={{ borderBottom:'1px solid black' }}
              variant="red"
            >

              <Tab eventKey="home" title="服務內容" style={{ height: 250, backgroundColor: "#FCFCFC", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
                tabClassName="home-tab">
                <div style={{ whiteSpace: 'pre-wrap',fontSize: "30px" ,paddingTop: "15px",paddingLeft:"10px"}}>
                  {serve.service && serve.service[0].s_description}
                </div>
              </Tab>
              <Tab eventKey="profile" title="服務評價" style={{ height: 250, backgroundColor: "#FCFCFC", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
                tabClassName="profile-tab">
                {serve.service_comments && serve.service_comments.map((item, index) => (
                <div key={index} style={{ border: 'solid' }} className='mt-5'>
                  案主評價：{Array.from({ length: item.demmand_star }, (_, i) => (<CiStar key={i} />))}
                  <br></br>
                  案主留言：{item.demmand_comment}
                  <br></br>
                  <div style={{ textAlign: 'right' }}>{item.completed_time}案主：{item.name}</div>
                </div>
                ))}
              </Tab>
            </Tabs>

            <hr style={{ marginTop: "30px" }}></hr>

            <div className="row mt-4">
              <p>其他服務：</p>
              {serve.other_serve && serve.other_serve.map((item, index) => (
              <Link key={index} to={`/serve/${mid}/${item.sid}`} className="col-sm-4 ">
                <div className="card" >
                  <div className="card-header">
                    <img src={`data:image/jpeg;base64,${item.image}`} 
                    style={{ width: "100%", height: 200 }} />
                  </div>
                  <div className="card-body">
                    {item.s_name}
                    <br></br>
                    {item.s_amount}&nbsp;/&nbsp;{item.s_unit}
                  </div>
                  <div className="card-footer " style={{ justifyContent: 'end' }}>
                    <Button>報價詳情</Button>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Serve;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { MdOutlineMoneyOff } from "react-icons/md";
import { FaWpforms, FaHandshake, FaBriefcase } from "react-icons/fa";
import { AiOutlineArrowUp } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbBellRinging } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { BsPersonVcard } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import Footer from "./Footer";
import Category from "../Components/Category";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/App.css";
import "./Homepage.css";


function Homepage() {
  const [change, setChange] = useState(false);
  const [carouselpage, setCarouselpage] = useState(0);
  const handleSelect = (selectedIndex) => {
    setCarouselpage(selectedIndex);
  };
  // 最新服務 刊登 接API
  const [activeProduct, setActiveProduct] = useState();

  // 儲存最新服務、最新刊登、作品
  const [newService, setNewService] = useState([])
  const [newPublish, setNewPublish] = useState([])
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1/Allend/backend/public/api/index")
      .then((response) => response.json())
      .then((data) => {
        setNewService(data.service)
        setNewPublish(data.demmand)
        setProjects(data.project)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchData()
  }, []);



  {/* 置頂按鈕 */ }
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down beyond a certain point
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  {/* 置頂按鈕 */ }

  {/* 控制新手教學彈跳視窗 */ }
  const handleShow = () => setShowNewbie(true);


  const [showNewbie, setShowNewbie] = useState(false);
  const handleClose = () => setShowNewbie(false);



  const handleTalentClick = () => {
    setShowTalentContent(true);
    setShowOrganContent(false); // Make sure to reset the other content
  };

  const handleOrganClick = () => {
    setShowTalentContent(false); // Make sure to reset the other content
    setShowOrganContent(true);
  };

  const [showTalentContent, setShowTalentContent] = useState(false);
  const [showOrganContent, setShowOrganContent] = useState(true);



  return (
    <>
      {/* 置頂按鈕 */}
      {showScrollButton && (
        <button
          className="btn btn-primary rounded-circle shadow"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "1000" // Set a high z-index to make sure it appears on top
          }}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp style={{ fontSize: "24px" }} />
        </button>
      )}

      <div className=" noto-serif container  ">
        <div>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />

          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </div>

        <div><Category></Category></div>

        {/* 新手教學 */}
        <h4 className="mt-5">新手教學</h4>
        <section className="adbar-section mt-4">
          <div className="container-lg container-pad">
            <div className="row justify-content-center" style={{ backgroundColor: "#F0F0F0" }}>
              <div className="col-3" style={{ textAlign: 'center' }}>
                <h4 style={{ color: "#FF9797" }}>提出需求<FaHandshake style={{ fontSize: '50px' }} /></h4>
                <p>為你篩選適合人才</p>
              </div>
              <div className="col-3" style={{ textAlign: 'center' }}>
                <h4 style={{ color: "#FF9797" }}>刊登服務<FaWpforms style={{ fontSize: '50px' }} /></h4>
                <p>上架您的案件</p>
              </div>
              <div className="col-3" style={{ textAlign: 'center' }}>
                <h4 style={{ color: "#FF9797" }}>完全免費<MdOutlineMoneyOff style={{ fontSize: '50px' }} /></h4>
                <p>找人才輕鬆無壓力</p>
              </div>
              <div className="col-12 text-center">
                <span style={{ color: "#FF9797" }}>找案件，找人才，由我們搞定！</span>
                <button style={{ border: "none", backgroundColor: "#FF9797", borderRadius: "8px", letterSpacing: '2px' }} onClick={handleShow}>瞭解更多</button>

              </div>
            </div>
          </div>
        </section>


        {/* 最新服務 */}
        <h4 className="mt-5">最新服務</h4>
        <div className="d-flex justify-content-center">
          <div className="posts-container" style={{ display: "flex" }}>
            {newService.map((post, index) => {
              return (
                <Row key={index} style={{ margin: "30px" }}>
                  <Col style={{ flexGrow: 1 }}>
                    <Link
                      to={`./serve/${post.mid}/${post.sid}`}
                      className="card"
                      style={{ width: "100%", fontSize: "10px" }}
                    >
                      <div className="card-header ">
                        <img
                          src={`data:image/jpeg;base64,${post.image}`}
                          alt={`${index + 1}`}
                          style={{
                            height: 200,
                            width: "200px",
                            display: "block",
                          }}
                        ></img>
                      </div>
                      <div className="card-body">
                        <div style={{ fontSize: "17px" }}>{`【${post.s_name}】`}</div>
                        <div style={{ fontSize: "14px", color: "#FF5151" }}>${post.s_amount} / 件</div>
                        <hr></hr>
                        <div style={{ fontSize: "15px" }}>{post.name}</div>
                      </div>
                      <div style={{ fontSize: "12px" }} className="card-footer ">{post.created_at}</div>
                    </Link>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
        {/* 最新服務 */}


        {/* 最新刊登 */}
        <h4 className="mt-3">最新刊登</h4>
        <div className="row mt-3" >
          <div className=" mb-4 container" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex" }}>
              {newPublish.map((post, index) => {
                return (
                  <Row key={index} style={{ margin: "30px 32px 30px 32px" }}>
                    <Col>
                      <Link to={`./casecontext/${post.did}`} style={{ width: "30%", textDecoration: "none" }} >
                        <div className="toast show ">
                          <div className="toast-header">
                            <strong className="me-auto">
                              <div>{post.d_name}</div>
                              <div>預算：{post.d_amount}</div>
                            </strong>
                          </div>
                          <div className="toast-body">
                            <div>刊登日期：{post.created_at}</div>
                            <div>地點：{post.d_active_location}</div>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        </div>
        {/* 最新刊登 */}


        {/* 輪播圖 */}
        <h4 style={{ textAlign: "center" }}>精選作品</h4>
        <div className="d-flex justify-content-center mt-4" >
          <Carousel
            activeIndex={carouselpage}
            onSelect={handleSelect}
            style={{
              overflow: " hidden",
              background: "linear-gradient( #A3D1D1,#D1E9E9 ,#95CACA,#B3D9D9)",
              width: "750px",
              height: "275px",
              borderRadius: "10px"
            }}
            id="carousel"
            interval={5000}
            indicators={true}
            controls={true}
            prevIcon={
              <span style={{ color: "black", fontSize: "4rem" }}>‹</span>
            }
            nextIcon={
              <span style={{ color: "black", fontSize: "4rem" }}>›</span>
            }
          >
            {projects.map((post, index) => {
              return (
                <Carousel.Item key={index}>
                  <Row className="justify-content-md-center">
                    <Col xs lg="6" style={{ padding: "0px" }}>
                      <img src={change == true ? `${activeProduct}` : `data:image/jpeg;base64,${post.image}`} 
                      style={{ maxWidth: "100%", marginTop: "10px", marginBottom: "10px" }} />
                    </Col>
                    <Col xs lg="2" className="d-flex justify-content-center align-items-center" style={{ padding: "0px" }}>
                      <Link to={`./talent/${post.mid}`} style={{ fontSize: "20px", position: "relative", left: "30px" }}>
                        <span >{post.name}</span>
                      </Link>
                    </Col>
                  </Row>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </div>
        {/* 輪播圖 */}
      </div>

      {/* 新手教學視窗 */}
      <Modal show={showNewbie} onHide={handleClose} centered style={{ borderRadius: '20px' }}>
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <div className="row justify-content-center w-100">
            <div className="col text-center">
              <Modal.Title>平台如何運作</Modal.Title>
              <div className="d-flex">
                <div className="border rounded-pill mx-auto p-2" style={{ borderColor: "black" }}>
                  <Button className="rounded-pill btn type-modal-btn btn-medium " data-target="organ-modal-div" onClick={handleOrganClick}>發案者</Button>
                  <Button className="rounded-pill btn type-modal-btn btn-medium" data-target="talent-modal-div" onClick={handleTalentClick}>接案者</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {showOrganContent && (
            <div className="organ-modal-div ">
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2 pe-2"><TfiAnnouncement style={{ fontSize: "35px", color: "#FF9797" }} />
                  </div>
                  <div className="col-10">

                    <h5 className="fs-4 text-primary">發布工作 獲取報價</h5>
                    <p className="fs-6">
                      依指示填寫需求表單，能免費發布工作，讓專業人才向你提供報價！
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2 "><TbBellRinging style={{ fontSize: "35px", color: "#FF9797" }} />

                  </div>
                  <div className="col-10">
                    <h5 className="fs-4 text-primary">收到通知 主動報價</h5>
                    <p className="fs-6">
                      工作經審核通過後，會發布於案件工作版，平台內相關專業人才收到信件通知，並根據你的工作描述提出相應報價。
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2"><IoIosPeople style={{ fontSize: "35px", color: "#FF9797" }} />

                  </div>
                  <div className="col-10">
                    <h5 className="fs-4 text-primary">挑選人才，輕鬆完成工作！</h5>
                    <p className="fs-6">
                      會持續以信件通知最新工作進度，也能直接連絡提供報價的專業人才。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTalentContent && (
            <div className="talent-modal-div" >
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2 pe-2"><BsPersonVcard style={{ fontSize: "35px", color: "#FF9797" }} />
                  </div>
                  <div className="col-10">
                    <h5 className="fs-4 text-primary">建立個人案件</h5>
                    <p className="fs-6">
                      提供建立個人專業服務與工作背景、詳細完整的個人專頁來提升接案的成功率！
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2"><FaBriefcase style={{ fontSize: "35px", color: "#FF9797" }} />
                  </div>
                  <div className="col-10">
                    <h5 className="fs-4 text-primary">快速送出你的提案</h5>
                    <p className="fs-6">
                      每日更新工作案件提供最新接案機會！案主會根據你的提案報價與個人專頁決定是否採用。所有關於工作進度都會通過信件通知!
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 container-fluid container-xl">
                <div className="row">
                  <div className="col-2"><RiDraftLine style={{ fontSize: "35px", color: "#FF9797" }} />
                  </div>
                  <div className="col-10">
                    <h5 className="fs-4 text-primary">無上限申請提案！</h5>
                    <p className="fs-6">
                      免費提案報價，輕鬆接案無負擔。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Footer></Footer>
    </>
  );
}

export default Homepage;

import "../../src/App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Category from "../Components/Category";
import luanguage from "../Components/img/language.png";
import softdesign from "../Components/img/softdesign.png";
import writing from "../Components/img/writing.png";
import Product from "../Components/img/Product.jpg";
import product2 from "../Components/img/product2.jpg";
import product3 from "../Components/img/product3.jpg";
import { Row, Col } from "react-bootstrap";

function Homepage() {
  // 最新服務 刊登 接API
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1/Allend/backend/public/api/index")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.service);
        console.log(data.demmand);
        console.log(data.project);
        // const result;
        for (let i = 0; i < 9; i++) {
          data.service[i].image = data.project[i]["image"];
          data.service[i].d_name = data.demmand[i]["d_name"];
          data.service[i].d_amount = data.demmand[i]["d_amount"];
          data.service[i].d_active_location =
            data.demmand[i]["d_active_location"];
          data.service[i].d_created_at = data.demmand[i]["d_created_at"];
        }

        console.log(data.service);
        setPosts(data.service);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [activeProduct, setActiveProduct] = useState(Product); // State to track active product

  const handleMouseEnter = (image) => {
    setIsHovered(true);
    setActiveProduct(image);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveProduct(Product);
  };

  return (
    <>
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

        <Category></Category>
        <br></br>

        {/* 最新服務 */}
        <div className=" mt-5">最新服務</div>
        <div>
          <div className="posts-container" style={{ display: "flex" }}>
            {posts.slice(0, 3).map((post, index) => {
              return (
                <Row style={{ margin: "48px" }}>
                  {/* <div className="post-card" key={index}>
                  <h2 className="post-title">
                    {post.d_name}
                  </h2>
                  <p className="post-body">
                    {post.created_at}
                  </p>
                </div> */}
                  <Col key={index} style={{ flexGrow: 1 }}>
                    <Link
                      to="./serve"
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
                        {post.s_name}
                        <br></br>${post.s_amount}/件
                        <hr></hr>
                        {post.name}
                      </div>
                      <div className="card-footer ">{post.created_at}</div>
                    </Link>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
        {/* 最新服務 */}

        <br></br>

        {/* 最新刊登 */}
        <div className="row mt-5">
          <p>最新刊登:</p>
          <div className="col-sm-4 mb-4" style={{ display: "flex" }}>
            {posts.slice(0, 3).map((post, index) => {
              return (
                <Row style={{ margin: "12px" }}>
                  <Col key={index}>
                    <Link to="./casecontext" style={{ width: "30%" }}>
                      <div class="toast show ">
                        <div class="toast-header">
                          <strong class="me-auto">
                            {post.d_name}
                            <br></br>
                            預算:{post.d_amount}
                          </strong>
                          {/* <span style={{ float: 'right' }}>短期</span> */}
                        </div>
                        <div class="toast-body">
                          <p>
                            刊登日期:{post.created_at}
                            <br></br>
                            地點:{post.d_active_location}
                            {/* 1人報價中 */}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
        {/* 最新刊登 */}

        {/* 輪播圖 */}
        <div className="d-flex  justify-content-center mt-5">
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Carousel
                id="carousel"
                interval={null}
                indicators={false}
                controls={true}
                prevIcon={
                  <span style={{ color: "black", fontSize: "4rem" }}>‹</span>
                }
                nextIcon={
                  <span style={{ color: "black", fontSize: "4rem" }}>›</span>
                }
              >
                <Carousel.Item>
                  <Row className=" justify-content-md-center align-items-end">
                    <Col xs lg="7">
                      <img src={activeProduct} style={{ width: "100%" }} />
                    </Col>
                    <Col xs lg="5">
                      <Link to="./talent">
                        <h3 style={{ marginTop: 100 }}>會員名稱1</h3>
                      </Link>
                      <Row
                        id="carouselimg"
                        className=" justify-content-md-center"
                      >
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product3}
                            onMouseEnter={() => handleMouseEnter(product3)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product2}
                            onMouseEnter={() => handleMouseEnter(product2)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={Product}
                            onMouseEnter={() => handleMouseEnter(Product)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Carousel.Item>
                <Carousel.Item>
                  <Row className=" justify-content-md-center align-items-end">
                    <Col xs lg="7">
                      <img src={activeProduct} style={{ width: "100%" }} />
                    </Col>
                    <Col xs lg="5">
                      <Link to="./talent">
                        <h3 style={{ marginTop: 100 }}>會員名稱1</h3>
                      </Link>
                      <Row
                        id="carouselimg"
                        className=" justify-content-md-center"
                      >
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product3}
                            onMouseEnter={() => handleMouseEnter(product3)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product2}
                            onMouseEnter={() => handleMouseEnter(product2)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={Product}
                            onMouseEnter={() => handleMouseEnter(Product)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Carousel.Item>
                <Carousel.Item>
                  <Row className=" justify-content-md-center align-items-end">
                    <Col xs lg="7">
                      <img src={activeProduct} style={{ width: "100%" }} />
                    </Col>
                    <Col xs lg="5">
                      <Link to="./talent">
                        <h3 style={{ marginTop: 100 }}>會員名稱1</h3>
                      </Link>
                      <Row
                        id="carouselimg"
                        className=" justify-content-md-center"
                      >
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product3}
                            onMouseEnter={() => handleMouseEnter(product3)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={product2}
                            onMouseEnter={() => handleMouseEnter(product2)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                        <Col xs lg="4">
                          {" "}
                          <img
                            src={Product}
                            onMouseEnter={() => handleMouseEnter(Product)}
                            onMouseLeave={handleMouseLeave}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </div>
        {/* 輪播圖 */}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Homepage;

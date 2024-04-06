import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Footer from "../homepage/Footer";
import Dropdown from "react-bootstrap/Dropdown";
import { GoTriangleDown } from "react-icons/go";

import NextPage from "../homepage/NextPage";
import Orderbuttom from "../homepage/Orderbuttom";
import "../../src/App.css";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import a1 from "../Components/img/a1.png";
import a2 from "../Components/img/a2.png";
import a4 from "../Components/img/a4.png";
import a5 from "../Components/img/a5.png";
import a6 from "../Components/img/a6.png";
import Cookies from "js-cookie";
import Pagination from "./Pagination";
import "./Pagination.css"



function Findcase() {





  // 上/下一頁


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);




  // 上/下一頁





  // Modal下面 送資料回去
  const QuoteAmount = useRef();
  const QuoteMessage = useRef();
  const sendQuote = async (did, q_amount, q_message) => {
    try {
      fetch("http://localhost/Allend/backend/public/api/quote", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          did: did,
          q_amount: q_amount,
          q_message: q_message
        })
      })

    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = async (d) => {
    setShow(false);
    const q_amount = QuoteAmount.current.value;
    const q_message = QuoteMessage.current.value;
    const did = d;
    try {
      const data = await sendQuote(did, q_amount, q_message);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Modal下面 送資料回去




  // Modal上面
  const [key, setkey] = useState(0);
  const [show, setShow] = useState(false);



  const handleShow = (index) => {
    setShow(true);
    setkey(index);
    console.log(index);
  };
  // Modal上面

  const [posts, setPosts] = useState([]);

  const [changeorder, setChangeorder] = useState(false);
  const [mycitys, setMycitys] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = async (type) => {
    if (window.location.href == "http://localhost:3000/findcase") {
      let url = "http://localhost/Allend/backend/public/api/findcase?type=";
      switch (type) {
        case "網站設計":
          setCurrentPage(1);
          url += "1";
          break;
        case "軟體程式":
          setCurrentPage(1);
          url += "2";
          break;
        case "平面設計":
          setCurrentPage(1);
          url += "3";
          break;
        case "文字語言":
          setCurrentPage(1);
          url += "4";
          break;
        case "專業諮詢":
          setCurrentPage(1);
          url += "5";
          break;
        default:

      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {

          console.log(data);
          setPosts(data);
          setMycitys([]);
          switch (type) {
            case "台北市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "台北市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              console.log(mycitys);
              break;
            case "新北市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "新北市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                  console.log(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "桃園市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "桃園市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "基隆市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "基隆市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "新竹市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "新竹市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "新竹縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "新竹縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "彰化縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "彰化縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "南投縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "南投縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "雲林縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "雲林縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "高雄市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "高雄市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "台南市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "台南市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "嘉義市":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "嘉義市") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "嘉義縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "嘉義縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "屏東縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "屏東縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "宜蘭縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "宜蘭縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "花蓮縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "花蓮縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "臺東縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "臺東縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "澎湖縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "澎湖縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "金門縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "金門縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "連江縣":
              for (let i = 0; i < data.length; i++) {
                if (data[i].country_city == "連江縣") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "5k":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount <= 5000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              break;
            case "1w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 5000 && data[i].d_amount <= 10000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              break;

            case "5w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 10000 && data[i].d_amount <= 50000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              break;

            case "10w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 50000 && data[i].d_amount <= 100000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              break;
            case "30w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 100000 && data[i].d_amount <= 300000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              break;
            case "短":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_duration == "短") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "長":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_duration == "長") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                } else {
                  setPosts(mycitys);
                }
              }
              break;
            case "updated_at":
              for (let i = 0; i < data.length; i++) {
                mycitys.push(data[i]);
                const x = mycitys.sort(function (a, b) { return parseInt(a.updated_at) - parseInt(b.updated_at) });
                setPosts(x);
              }
              break;
            case "d_amount":
              if (changeorder == false) {
                for (let i = 0; i < data.length; i++) {
                  mycitys.push(data[i]);
                  const x = mycitys.sort(function (a, b) { return a.d_amount - b.d_amount });
                  setPosts(x);
                  console.log(1);
                }
                setChangeorder(true);
              } else {
                for (let i = 0; i < data.length; i++) {
                  mycitys.push(data[i]);
                  const x = mycitys.sort(function (a, b) { return b.d_amount - a.d_amount });
                  setPosts(x);
                }
                setChangeorder(false);
              }
              break;
            case "quote_total":
              if (changeorder == false) {
                for (let i = 0; i < data.length; i++) {
                  mycitys.push(data[i]);
                  const x = mycitys.sort(function (a, b) { return a.quote_total - b.quote_total });
                  setPosts(x);
                  console.log(1);
                }
                setChangeorder(true);
              } else {
                for (let i = 0; i < data.length; i++) {
                  mycitys.push(data[i]);
                  const x = mycitys.sort(function (a, b) { return b.quote_total - a.quote_total });
                  setPosts(x);
                }
                setChangeorder(false);
              }
              break;


            default:
              break;
          }

          console.log(mycitys);
          console.log(posts);
          console.log(data);


        });
    } else {
      const f_url = window.location.href;
      let b_url = "http://localhost/Allend/backend/public/api/findcase?type=";

      console.log(f_url);
      switch (f_url) {
        case "http://localhost:3000/findcase/?type=1":
          b_url += "1";
          break;
        case "http://localhost:3000/findcase/?type=2":
          b_url += "2";
          break;
        case "http://localhost:3000/findcase/?type=3":
          b_url += "3";
          break;
        case "http://localhost:3000/findcase/?type=4":
          b_url += "4";
          break;
        case "http://localhost:3000/findcase/?type=5":
          b_url += "5";
          break;
      }
      fetch(b_url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        });
    }
  };



  // 分頁
  const lastPostIndex = currentPage * postsPerPage;


  const firstPostIndex = lastPostIndex - postsPerPage;


  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  // 分頁









  return (
    <>
      <div className="container">
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

        {/* 分類按鈕 */}
        <div style={{ marginLeft: "60px", marginRight: "0" }}>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-sm-2 text-center">
                <Link
                  to="/findcase"
                  onClick={() => {
                    fetchData("網站設計");
                  }}
                >
                  <div>網站設計</div>
                  <img src={a1} style={{ width: "60px" }}></img>
                </Link>
                <hr className="d-sm-none" />
              </div>
              <div className="col-sm-2 text-center">
                <Link to="/findcase" onClick={() => fetchData("軟體程式")}>
                  <div>軟體程式</div>
                  <img src={a2} style={{ width: "60px" }}></img>
                </Link>
                <hr className="d-sm-none" />
              </div>
              <div className="col-sm-2 text-center">
                <Link to="/findcase" onClick={() => fetchData("平面設計")}>
                  <div>平面設計</div>
                  <img src={a5} style={{ width: "60px" }}></img>
                </Link>
                <hr className="d-sm-none" />
              </div>
              <div className="col-sm-2 text-center">
                <Link to="/findcase" onClick={() => fetchData("文字語言")}>
                  <div>文字語言</div>
                  <img src={a4} style={{ width: "60px" }}></img>
                </Link>
                <hr className="d-sm-none" />
              </div>
              <div className="col-sm-2 text-center">
                <Link to="/findcase" onClick={() => fetchData("專業諮詢")}>
                  <div>專業諮詢</div>
                  <img src={a6} style={{ width: "60px" }}></img>
                </Link>
                <hr className="d-sm-none" />
              </div>
            </div>
          </div>
        </div>
        {/* 分類按鈕 */}

        <br></br>

        {/* 下拉選單 */}
        <div style={{ display: "flex" }}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">地區</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => fetchData("台北市")}>台北市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("新北市")}>新北市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("桃園市")}>桃園市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("基隆市")}>基隆市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("新竹市")}>新竹市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("新竹縣")}>新竹縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("彰化縣")}>彰化縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("南投縣")}>南投縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("雲林縣")}>雲林縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("高雄市")}>高雄市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("台南市")}>台南市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("嘉義市")}>嘉義市</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("嘉義縣")}>嘉義縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("屏東縣")}>屏東縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("宜蘭縣")}>宜蘭縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("花蓮縣")}>花蓮縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("臺東縣")}>臺東縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("澎湖縣")}>澎湖縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("金門縣")}>金門縣</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("連江縣")}>連江縣</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mx-5">
            <Dropdown.Toggle id="dropdown-basic">案件金額</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => fetchData("5k")}>5000以下</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("1w")}>5001~1萬</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("5w")}>1萬~5萬</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("10w")}>5萬~10萬</Dropdown.Item>
              <Dropdown.Item onClick={() => fetchData("30w")}>10萬~30萬</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <hr></hr>
        {/* 左上4顆按鈕 */}
        <div style={{ borderBottom: "solid" }}>
          <button onClick={() => fetchData()}>全部案件</button>
          <button onClick={() => fetchData("短")}>短期案件</button>
          <button onClick={() => fetchData("長")}>長期案件</button>
        </div>
        {/* 右下4顆按鈕 */}
        <div style={{ borderBottom: "solid", textAlign: "end" }}>
          <button onClick={() => fetchData("updated_at")}>最近更新<GoTriangleDown /></button>
          <button onClick={() => fetchData()}>最新刊登<GoTriangleDown /></button>
          <button onClick={() => fetchData("d_amount")}>預算金額<GoTriangleDown /></button>
          <button onClick={() => fetchData("quote_total")}>提案人數<GoTriangleDown /></button>
        </div>




        {/* .slice(firstPostIndex, lastPostIndex) */}


        {/* 案件欄位 */}
        <div >
          {posts.map((post, index) => {
            return (
              <div >
                <div className="row" key={index}>
                  <Link
                    to={`/casecontext/?${post.did}`}
                    className="col-sm-2"
                    style={{
                      border: "solid black",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {post.d_name}
                    <br></br>
                    案件類別:{post.type}
                    <br></br>
                    預算:${post.d_amount}/{post.d_unit}
                    <br></br>
                    地點:{post.country_city}
                    <br></br>
                    {post.d_duration}期<br></br>
                    {post.updated_at}<br></br>
                    {post.quote_total}人報價中
                    <br></br>
                  </Link>
                  <div
                    className="position-relative col-sm-10"
                    style={{ border: "solid" }}
                  >
                    {post.d_description}
                    <div className="position-absolute bottom-0 end-0">
                      <Button
                        onClick={() => {
                          // setcurrentData(post[index]);
                          handleShow(index);
                        }}
                      >
                        我要報價
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 案件欄位 */}

        {/* 我要報價頁面 */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title
              style={{ fontSize: 15 }}
            >
              案件名稱:<span>{posts[key]?.d_name}</span>
              <hr></hr>
              案件編號:<span >{posts[key]?.did}</span>
              <hr></hr>
              案件類別:<span>{posts[key]?.type}</span>
              <hr></hr>
              案件地點:<span>{posts[key]?.country_city}</span>
              <hr></hr>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>報價金額</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  style={{ width: "100px" }}
                  type=""
                  autoFocus
                  value={posts[key]?.d_amount}
                  ref={QuoteAmount}
                ></Form.Control>
                <span className="mt-2">{"/" + posts[key]?.d_unit}</span>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>接案人留言</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="請輸入訊息"
                  ref={QuoteMessage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => { handleClose(posts[key]?.did) }}>
              送出
            </Button>
          </Modal.Footer>
        </Modal>
        {/* 我要報價頁面 */}

        <br></br>




        {/* 上/下一頁 */}
        <div className="d-flex  justify-content-center">
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        </div>
        {/* 上/下一頁 */}



      </div >
      <Footer></Footer>
    </>
  );
}

export default Findcase;

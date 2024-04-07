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
  const [postsPerPage, setPostsPerPage] = useState(5);




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

  const [changecolor1, setChangecolor1] = useState(false);
  const [changecolor2, setChangecolor2] = useState(false);
  const [changecolor3, setChangecolor3] = useState(false);
  const [changecolor4, setChangecolor4] = useState(false);
  const [changecolor5, setChangecolor5] = useState(false);
  const [changecolor6, setChangecolor6] = useState(false);
  const [changecolor7, setChangecolor7] = useState(false);
  const [changecolortype, setChangecolortype] = useState(false);
  const [changecolorcity, setChangecolorcity] = useState(false);
  const [changecolorbudge, setChangecolorbudge] = useState(false);


  const changeBottomcolorOff = async () => {
    setChangecolor1(false);
    setChangecolor2(false);
    setChangecolor3(false);
    setChangecolor4(false);
    setChangecolor5(false);
    setChangecolor6(false);
    setChangecolor7(false);
    setChangecolortype(false);
    setChangecolorcity(false);
    setChangecolorbudge(false);

  }
  const changecitycolor = async () => {
    setChangecolorcity(true);
  }
  const changebudgecolor = async () => {
    setChangecolorbudge(true);
  }

  useEffect(() => {
    fetchData()
  }, []);
  const sortData = async (s) => {
    setCurrentPage(1);
    switch (s) {

      case "updated_at":
        changeBottomcolorOff();

        setChangecolor4(true);
        for (let i = 0; i < posts.length; i++) {
          const x = posts.sort(function (a, b) { return parseInt(a.updated_at) - parseInt(b.updated_at) });
          setPosts(x);
        }
        break;

      case "created_at":
        console.log(1);
        changeBottomcolorOff();
        setChangecolor5(true);
        for (let i = 0; i < posts.length; i++) {

          const x = posts.sort(function (a, b) { return a.created_at < b.created_at ? 1 : -1 });
          console.log(x);
          setPosts(x);
        }
        console.log(1);
        break;

      case "d_amount":
        changeBottomcolorOff();

        setChangecolor6(true);
        if (changeorder == false) {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return a.d_amount - b.d_amount });
            setPosts(x);
          }
          setChangeorder(true);
        } else {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return b.d_amount - a.d_amount });
            setPosts(x);
          }
          setChangeorder(false);
        }
        break;

      case "quote_total":
        changeBottomcolorOff();

        setChangecolor7(true);
        if (changeorder == false) {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return a.quote_total - b.quote_total });
            setPosts(x);
          }
          setChangeorder(true);
        } else {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return b.quote_total - a.quote_total });
            setPosts(x);
          }
          setChangeorder(false);
        }
        break;

      default:
        break;
    }


  }

  const fetchData = async (type) => {
    if (window.location.href == "http://localhost:3000/findcase") {
      let url = "http://localhost/Allend/backend/public/api/findcase?type=";
      setCurrentPage(1);
      switch (type) {
        case "網站設計":
          changeBottomcolorOff();

          setChangecolortype(true);
          setCurrentPage(1);
          url += "1";
          break;
        case "軟體程式":
          changeBottomcolorOff();

          setChangecolortype(true);
          setCurrentPage(1);
          url += "2";
          break;
        case "平面設計":
          changeBottomcolorOff();

          setChangecolortype(true);
          setCurrentPage(1);
          url += "3";
          break;
        case "文字語言":
          changeBottomcolorOff();

          setChangecolortype(true);
          setCurrentPage(1);
          url += "4";
          break;
        case "專業諮詢":
          changeBottomcolorOff();

          setChangecolortype(true);
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
          // if (changecolortype == true) {
          //   changeBottomcolorOff();

          // }
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

              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


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
              changeBottomcolorOff();
              changecitycolor();


              break;
            case "5k":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount <= 5000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              changeBottomcolorOff();
              changebudgecolor();


              break;
            case "1w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 5000 && data[i].d_amount <= 10000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              changeBottomcolorOff();
              changebudgecolor();


              break;

            case "5w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 10000 && data[i].d_amount <= 50000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              changeBottomcolorOff();
              changebudgecolor();


              break;

            case "10w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 50000 && data[i].d_amount <= 100000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              changeBottomcolorOff();
              changebudgecolor();


              break;
            case "30w":
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_amount >= 100000 && data[i].d_amount <= 300000) {
                  mycitys.push(data[i]);
                  setPosts(mycitys);
                }
              }
              changeBottomcolorOff();
              changebudgecolor();

              break;
            case "all":
              changeBottomcolorOff();

              setChangecolor1(true);
              for (let i = 0; i < data.length; i++) {
                mycitys.push(data[i]);
                setPosts(mycitys);
              }
              break;
            case "短":
              changeBottomcolorOff();

              setChangecolor2(true);
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
              changeBottomcolorOff();

              setChangecolor3(true);
              for (let i = 0; i < data.length; i++) {
                if (data[i].d_duration == "長") {
                  mycitys.push(data[i]);
                  setPosts(mycitys);

                } else {
                  setPosts(mycitys);

                }
              }
              break;

            default:
              break;
          }
          console.log(mycitys);
          console.log(posts);
          console.log(data);
          console.log(posts);


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
  console.log(posts);



  // 分頁
  const lastPostIndex = currentPage * postsPerPage;


  const firstPostIndex = lastPostIndex - postsPerPage;


  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  // 分頁









  return (
    <>
      <div className="container ">
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
                <Link to="/findcase" onClick={() => fetchData("網站設計")}>
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
        <div style={{ display: "flex" }} >
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
          <button className={changecolor1 == true ? "active" : ""} onClick={() => fetchData("all")}>全部案件</button>
          <button className={changecolor2 == true ? "active" : ""} onClick={() => fetchData("短")}>短期案件</button>
          <button className={changecolor3 == true ? "active" : ""} onClick={() => fetchData("長")}>長期案件</button>
        </div>


        {/* 右下4顆按鈕 */}
        <div style={{ textAlign: "end" }}>
          <button className={changecolor4 == true ? "active" : ""} onClick={() => sortData("updated_at")}>最近更新<GoTriangleDown /></button>
          <button className={changecolor5 == true ? "active" : ""} onClick={() => sortData("created_at")}>最新刊登<GoTriangleDown /></button>
          <button className={changecolor6 == true ? "active" : ""} onClick={() => sortData("d_amount")}>預算金額<GoTriangleDown /></button>
          <button className={changecolor7 == true ? "active" : ""} onClick={() => sortData("quote_total")}>提案人數<GoTriangleDown /></button>
        </div>





        {/* .slice(firstPostIndex, lastPostIndex) */}


        {/* 案件欄位 */}
        <div >
          {currentPosts.map((post, index) => {
            return (
              <div >
                <div className="row" key={index}>
                  <Row style={{ border: "solid black" }}>
                    <Col xs={2} style={{ borderRight: "solid black", fontSize: "15px" }}>
                      <Link to={`/casecontext/?${post.did}`} style={{ textDecoration: "none", color: "black", }}>
                        <div>{post.d_name}</div>
                        <div id={changecolortype == true ? "active" : ""}>案件類別:{post.type}</div>
                        <div id={changecolorbudge == true ? "active" : ""}>預算:${post.d_amount}/{post.d_unit}</div>
                        <div id={changecolorcity == true ? "active" : ""}>地點:{post.country_city}</div>
                        <div>{post.d_duration}期</div>
                        {/* <div>{post.updated_at}</div>
                    <div>{post.quote_total}人報價中</div>
                    <div>刊登時間:</div>
                    <div>{post.created_at}</div> */}
                      </Link>
                    </Col>
                    <Col xs={6} >
                      <div>{post.d_description}</div>
                    </Col>
                    <Col >

                      {/* className="position-absolute bottom-0 end-0" */}
                    </Col>
                    <Col xs={1}>
                      <div style={{ textAlign: "start", fontSize: "10px", marginTop: "20px" }}>
                        <div>{post.updated_at}</div>
                        <div>{post.quote_total}人報價中</div>
                        <div>刊登時間:{post.created_at}</div>
                      </div>  
                      <div style={{ textAlign: "start" }}>
                        <Button style={{width:"80px",height:"30px ", fontSize:"10px"}} onClick={() => { handleShow(index); }}>我要報價</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
        </div>
        {/* 案件欄位 */}

        {/* 我要報價頁面 */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title style={{ fontSize: 15 }}>
              <div>案件名稱:{posts[key]?.d_name}</div>
              <hr></hr>
              <div>案件編號:{posts[key]?.did}</div>
              <hr></hr>
              <div>案件類別:{posts[key]?.type}</div>
              <hr></hr>
              <div>案件地點:{posts[key]?.country_city}</div>
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
                <div className="mt-2"> {"/" + posts[key]?.d_unit}</div>
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





        {/* 上/下一頁 */}
        <div className="d-flex  justify-content-center mt-3">
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

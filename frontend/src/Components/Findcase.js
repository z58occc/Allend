import React, { useContext, useState, useEffect, useRef, Fragment } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { GoTriangleDown } from "react-icons/go";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoIosSad } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../homepage/Footer";
import Pagination from "./Pagination";
import Category from "./Category";
import "../../src/App.css";
import "./Pagination.css"
import "./Findcase.css";
import { GoTriangleUp } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import { HiXCircle } from "react-icons/hi2";
import { GrClearOption } from "react-icons/gr";
import { IsLoggedInContext } from "../App";






function Findcase() {

  const { isLoggedIn, setIsLoggedIn, handleShow } = useContext(IsLoggedInContext);
  // 上/下一頁
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // 上/下一頁


  // Modal下面 送資料回去
  const QuoteAmount = useRef();
  const QuoteMessage = useRef();


  const [failshow, setFailshow] = useState(false);
  const [successshow, setSuccessshow] = useState(false);
  const [success, setSuccess] = useState();
  const sendQuote = async (did, q_amount, q_message) => {

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
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data.message);
        setSuccess(data.message);
        setSuccessshow(true);
      })
      .catch(function (error) {
        console.log(error);
        console.log(1);
        setFailshow(true);
      })
  };
  const close = async () => {
    setShow(false);
    setMessagewarm(false);
    setAmountwarm(false);
    setFailshow(false);
    setSuccessshow(false);
  }


  // 送出報價按鈕
  const handleClose = async (d) => {
    const q_amount = QuoteAmount.current.value;
    const q_message = QuoteMessage.current.value;
    setShow(false);
    if (q_amount.length == 0 && q_message.length < 10) {
      setShow(true);
      setAmountwarm(true);
      setMessagewarm(true);
    } else if (q_amount.length == 0) {
      setAmountwarm(true);
      setShow(true);
    } else if (q_message.length < 10) {
      setShow(true);
      setMessagewarm(true);
    } else {
      const did = d;
      try {
        const data = await sendQuote(did, q_amount, q_message);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setMessagewarm(false);
      setAmountwarm(false);
    }

  };
  // 送出報價按鈕





  // Modal下面 送資料回去




  // Modal上面
  const [key, setkey] = useState(0);
  const [show, setShow] = useState(false);

  const handlequoteShow = (index) => {
    setShow(true);
    setkey(index);
    console.log(index);
  };
  // Modal上面


  const [posts, setPosts] = useState([]);
  const [changeorder, setChangeorder] = useState(false);
  const [messagewarm, setMessagewarm] = useState(false);
  const [amountwarm, setAmountwarm] = useState(false);


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
  const [changecolorduration, setChangecolorduration] = useState(false);
  const [changecolorupdated_at, setChangecolorupdated_at] = useState(false);
  const [changecolorquote_total, setChangecolorquote_total] = useState(false);
  const [changecolorcreated_at, setChangecolorcreated_at] = useState(false);


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
    setChangecolorduration(false);
    setChangecolorupdated_at(false);
    setChangecolorquote_total(false);
    setChangecolorcreated_at(false);
  }
  const changecitycolor = async () => {
    setChangecolorcity(true);
  }
  const changebudgecolor = async () => {
    setChangecolorbudge(true);
  }
  const changedurationcolor = async () => {
    setChangecolorduration(true);
  }


  const [budgetstate, setBudgetstate] = useState(
    {
      五千: false,
      一萬: false,
      五萬: false,
      十萬: false,
      三十萬: false,
    }
  );

  const [checkedState, setCheckedState] = useState(
    {
      台北市: false,
      新北市: false,
      桃園市: false,
      基隆市: false,
      新竹市: false,
      新竹縣: false,
      彰化縣: false,
      南投縣: false,
      雲林縣: false,
      高雄市: false,
      台南市: false,
      嘉義市: false,
      嘉義縣: false,
      屏東縣: false,
      宜蘭縣: false,
      花蓮縣: false,
      臺東縣: false,
      澎湖縣: false,
      金門縣: false,
      連江縣: false,
    });

  const [typeid, setTypeid] = useState();

  const [cityid, setCityid] = useState([]);
  const handlechangecity = (event) => {
    changeBottomcolorOff();
    console.log(event);
    const { name, checked } = event.target;
    console.log(event.target.checked);
    console.log(name, checked);
    setCheckedState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

  };




  // 清空篩選條件
  const handleChangeall = () => {
    changeBottomcolorOff();

    // const newState = { ...allstate };
    // Object.keys(newState).forEach((key) => newState[key] = false);
    // setAllstate(newState);


    const newcityState = { ...checkedState };
    Object.keys(newcityState).forEach((key) => newcityState[key] = false);
    setCheckedState(newcityState);


    const newbudgetState = { ...budgetstate };
    Object.keys(newbudgetState).forEach((key) => newbudgetState[key] = false);
    setBudgetstate(newbudgetState);
    fetchData();
    setTypeid(null);
    setDurationQuery("");


  }
  // 清空篩選條件










  const [budgetid, setBudgetid] = useState([]);

  const handlechangebudget = (event) => {
    changeBottomcolorOff();
    const { name, checked } = event.target;
    console.log(event.target)
    setBudgetstate((prevState) => ({
      ...prevState,
      [name]: checked,
    }));


  }
  const [durationQuery, setDurationQuery] = useState();
  const handlechangeduration = (duration) => {
    console.log(duration);
    changeBottomcolorOff();
    setChangecolorduration(true);
    switch (duration) {
      case "短":
        setDurationQuery("短");
        break;
      case "長":
        setDurationQuery("長");
        break;

      default:
        break;
    }

  }
  const [orderQuery, setOrderquery] = useState();
  const handlechangeOrder = (number) => {
    switch (number) {
      case 1:
        changeBottomcolorOff();
        setChangecolor5(true);
        setChangecolorcreated_at(true);
        setOrderquery(1);
        break;
      case 2:
        changeBottomcolorOff();
        setChangecolor4(true);
        setChangecolorupdated_at(true);
        setOrderquery(2);
        break;

      default:
        break;
    }
  }






  const [changeorderQuote, setChangeorderQuote] = useState(false);
  const sortData = async (s) => {
    setCurrentPage(1);
    switch (s) {


      case "d_amount":
        changeBottomcolorOff();
        setChangecolorbudge(true);
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
        setChangecolorquote_total(true);
        setChangecolor7(true);
        if (changeorderQuote == false) {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return a.quote_total - b.quote_total });
            setPosts(x);
            setChangeorderQuote(true);
          }
        } else {
          for (let i = 0; i < posts.length; i++) {
            const x = posts.sort(function (a, b) { return b.quote_total - a.quote_total });
            setPosts(x);
          }
          setChangeorderQuote(false);

        }
        break;

      default:
        break;
    }

  }


  const { type, casesearch } = useParams();

  useEffect(() => {
    const fetchDataNew = async () => {

      try {
       

        const clearbudgetstate = Object.keys(budgetstate)
          .filter((key) => budgetstate[key])
          .map((key) => {
            switch (key) {
              case "五千":
                return "5千以下";
              case "一萬":
                return "5千到1萬";
              case "五萬":
                return "1萬到5萬";
              case "十萬":
                return "5萬到10萬";
              case "三十萬":
                return "10萬到30萬";
              default:
                break;

            }
          })
          .join("，");
        setBudgetid(clearbudgetstate);




        switch (type) {
          case "1":
            setTypeid("網站設計");
            break;
          case "2":
            setTypeid("軟體程式");
            break;
          case "3":
            setTypeid("平面設計");
            break;
          case "4":
            setTypeid("文字語言");
            break;
          case "5":
            setTypeid("專業諮詢");
            break;

          default:
            break;
        }
        const budgetQuery = Object.keys(budgetstate)
          .filter((key) => budgetstate[key])
          .map((key) => {
            switch (key) {
              case "五千":
                return 1;
              case "一萬":
                return 2;
              case "五萬":
                return 3;
              case "十萬":
                return 4;
              case "三十萬":
                return 5;

              default:
                break;
            }
          })
          .join(",");
        
        const countryQuery = Object.keys(checkedState)
          .filter((key) => checkedState[key])
          .map((key) => {
            switch (key) {
              case "台北市":
                return "台北市"
              case "新北市":
                return "新北市"
              case "桃園市":
                return "桃園市"
              case "基隆市":
                return "基隆市"
              case "新竹市":
                return "新竹市"
              case "新竹縣":
                return "新竹縣"
              case "彰化縣":
                return "彰化縣"
              case "南投縣":
                return "南投縣"
              case "雲林縣":
                return "雲林縣"
              case "高雄市":
                return "高雄市"
              case "台南市":
                return "台南市"
              case "嘉義市":
                return "嘉義市"
              case "嘉義縣":
                return "嘉義縣"
              case "屏東縣":
                return "屏東縣"
              case "宜蘭縣":
                return "宜蘭縣"
              case "花蓮縣":
                return "花蓮縣"
              case "臺東縣":
                return "臺東縣"
              case "澎湖縣":
                return "澎湖縣"
              case "金門縣":
                return "金門縣"
              case "連江縣":
                return "連江縣"

              default:
                return "";
            }
          })
          .join(",");

        if (casesearch == undefined) {
          const response = await axios.get(
            `http://localhost/Allend/backend/public/api/findcase?type=${type}&location=${countryQuery}&amount=${budgetQuery}&d_duration=${durationQuery}&order=${orderQuery}`
          );
          setPosts(response.data);
        } else {
          const response = await axios.get(
            `http://localhost/Allend/backend/public/api/findcase?casesearch=${casesearch}`
          );
          setPosts(response.data);

        }



        setCityid(countryQuery.replaceAll(","," "));



      } catch (err) {
        console.error(err);
      }

    };
    fetchDataNew();
  }, [ casesearch, budgetid, orderQuery, durationQuery, type, checkedState, budgetstate])

  // 





  // 全部案件
  const [factor, setFactor] = useState();
  const fetchData = async () => {
    changeBottomcolorOff();
    let url = "http://localhost/Allend/backend/public/api/findcase?";
    setCurrentPage(1);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        setPosts(data);
        console.log(data);
      });
    console.log(type);
    setFactor(false);

  };
  // 全部案件



  // 分頁
  const lastPostIndex = currentPage * postsPerPage;


  const firstPostIndex = lastPostIndex - postsPerPage;


  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  // 分頁





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






  return (
    <>
      {/* 置頂按鈕 */}
      {showScrollButton && (
        <button
          className="btn btn-primary rounded-circle shadow"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
            zIndex: "1000" // Set a high z-index to make sure it appears on top
          }}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp style={{ fontSize: "24px" }} />
        </button>
      )}

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

        {/* 分類按鈕最上面那5顆 */}


        <Category></Category>


        {/* 分類按鈕最上面那5顆 */}

        <br></br>

        {/* 下拉選單 */}
        <div style={{ display: "flex" }} >
          <Dropdown >
            <Dropdown.Toggle id="dropdown-basic">地區</Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', minWidth: "130px", padding: "10px" }}>
              <div>
                <input
                  type="checkbox"
                  name="台北市"
                  id="台北市"
                  onChange={handlechangecity}
                  checked={checkedState["台北市"] === true}
                >
                </input>
                &nbsp;&nbsp;台北市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["新北市"] === true}
                  name="新北市"
                  id="新北市"
                >
                </input>
                &nbsp;&nbsp;新北市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["桃園市"] === true}
                  name="桃園市"
                  id="桃園市"
                >
                </input>
                &nbsp;&nbsp;桃園市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["基隆市"] === true}
                  name="基隆市"
                  id="基隆市"
                >
                </input>
                &nbsp;&nbsp;基隆市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["新竹市"] === true}
                  name="新竹市"
                  id="新竹市"
                >
                </input>
                &nbsp;&nbsp;新竹市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["新竹縣"] === true}
                  name="新竹縣"
                  id="新竹縣"
                >
                </input>
                &nbsp;&nbsp;新竹縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["彰化縣"] === true}
                  name="彰化縣"
                  id="彰化縣"
                >
                </input>
                &nbsp;&nbsp;彰化縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["南投縣"] === true}
                  name="南投縣"
                  id="南投縣"
                >
                </input>
                &nbsp;&nbsp;南投縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["雲林縣"] === true}
                  name="雲林縣"
                  id="雲林縣"
                >
                </input>
                &nbsp;&nbsp;雲林縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["高雄市"] === true}
                  name="高雄市"
                  id="高雄市"
                >
                </input>
                &nbsp;&nbsp;高雄市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["台南市"] === true}
                  name="台南市"
                  id="台南市"
                >
                </input>
                &nbsp;&nbsp;台南市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["嘉義市"] === true}
                  name="嘉義市"
                  id="嘉義市"
                >
                </input>
                &nbsp;&nbsp;嘉義市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["嘉義縣"] === true}
                  name="嘉義縣"
                  id="嘉義縣"
                >
                </input>
                &nbsp;&nbsp;嘉義縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["屏東縣"] === true}
                  name="屏東縣"
                  id="屏東縣"
                >
                </input>
                &nbsp;&nbsp;屏東縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["宜蘭縣"] === true}
                  name="宜蘭縣"
                  id="宜蘭縣"
                >
                </input>
                &nbsp;&nbsp;宜蘭縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["花蓮縣"] === true}
                  name="花蓮縣"
                  id="花蓮縣"
                >
                </input>
                &nbsp;&nbsp;花蓮縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["臺東縣"] === true}
                  name="臺東縣"
                  id="臺東縣"
                >
                </input>
                &nbsp;&nbsp;臺東縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["澎湖縣"] === true}
                  name="澎湖縣"
                  id="澎湖縣"
                >
                </input>
                &nbsp;&nbsp;澎湖縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["金門縣"] === true}
                  name="金門縣"
                  id="金門縣"
                >
                </input>
                &nbsp;&nbsp;金門縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  checked={checkedState["連江縣"] === true}
                  name="連江縣"
                  id="連江縣"
                >
                </input>
                &nbsp;&nbsp;連江縣
              </div>
            </Dropdown.Menu>
          </Dropdown>



          <Dropdown className="mx-5">
            <Dropdown.Toggle id="dropdown-basic">案件金額</Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "150px", padding: "10px" }}>

              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  checked={budgetstate["五千"] === true}
                  name="五千"
                  id="五千以下"
                >
                </input>
                &nbsp;&nbsp;5千以下
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  checked={budgetstate["一萬"] === true}
                  name="一萬"
                  id="五千到一萬"
                >
                </input>
                &nbsp;&nbsp;5千~1萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  checked={budgetstate["五萬"] === true}
                  name="五萬"
                  id="一萬到五萬"
                >
                </input>
                &nbsp;&nbsp;1萬到5萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  checked={budgetstate["十萬"] === true}
                  name="十萬"
                  id="五萬到十萬"
                >
                </input>
                &nbsp;&nbsp;5萬到10萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  checked={budgetstate["三十萬"] === true}
                  name="三十萬"
                  id="十到三十萬  "
                >
                </input>
                &nbsp;&nbsp;10萬到30萬
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>



        {/* 左上4顆按鈕 */}
        <div style={{  }}>

          <Link to={"/findcase/"} style={{ textDecoration: "none", color: "black" }} onClick={handleChangeall}>
            <button className={changecolor1 == true ? "active" : ""}  >
              全部案件
            </button>
          </Link>
          <button className={changecolor2 == true ? "active" : ""} onClick={() => handlechangeduration("短")}>短期案件</button>
          <button className={changecolor3 == true ? "active" : ""} onClick={() => handlechangeduration("長")}>長期案件</button>
        </div>


        {/* 右下4顆按鈕 */}
        <div style={{ textAlign: "end" }}>
          <button className={changecolor5 == true ? "active" : ""} onClick={() => handlechangeOrder(1)}>最新刊登<GoTriangleDown /></button>
          <button className={changecolor4 == true ? "active" : ""} onClick={() => handlechangeOrder(2)}>最近更新<GoTriangleDown /></button>
          <button className={changecolor6 == true ? "active" : ""} onClick={() => sortData("d_amount")}>預算金額
            <GoTriangleDown style={{ display: (changeorder == false ? "" : "none") }} />
            <GoTriangleUp style={{ display: (changeorder == true ? "" : "none") }} />
          </button>
          <button className={changecolor7 == true ? "active" : ""} onClick={() => sortData("quote_total")}>提案人數
            <GoTriangleDown style={{ display: (changeorderQuote == false ? "" : "none") }} />
            <GoTriangleUp style={{ display: (changeorderQuote == true ? "" : "none") }} />
          </button>
        </div>






        {/* 案件欄位 */}






        {/* type != 0 */}


        {/* 目前篩選條件(複選) */}
        <div id="factor" style={{ display: (type == 0 ? "none" : "") }}>
          {cityid.length > 0 || budgetid.length > 0 || type != null
            ? <>
              <Link onClick={handleChangeall} style={{ textDecoration: "none" }} to="/findcase/" >
                <button className="mb-3">
                  清空篩選條件<GrClearOption color="pink" id="clean" size={30} />
                </button>
              </Link>
              <br />
              <div style={{ display: (typeid == null ? "none" : "") }}>類別：<strong >「{typeid}」</strong></div>
              {cityid.length > 0 && <Fragment key={`${cityid}`}>地區：<strong style={{}}>「{cityid}」</strong></Fragment>}<br />
              {budgetid.length > 0 && <Fragment key={`${budgetid}`}>金額：<strong style={{}}>「{budgetid}」</strong></Fragment>}
            </>
            : null}
        </div>
        {/* 目前篩選條件(複選) */}





        {/* 沒有符合條件的資料 */}
        <div
          className="mt-5"
          style={{ display: (posts.length != 0 ? "none" : ""), fontSize: "40px", textAlign: "center" }}>
          <IoIosSad size={80} color="#002546" />Oops!! 看來目前沒有符合篩選條件的資料喔!
        </div>
        {/* 沒有符合條件的資料 */}







        <div >
          {currentPosts.map((post, index) => {
            return (
              <div style={{marginBottom:'1.5rem'}}>
                <div className="row" key={index}>
                  <Row style={{border:'solid 1px',borderRadius:'10px', padding: 0 }}>
                    <Col id="link" xs={2} style={{ borderRight: "solid black 1px", fontSize: "15px" ,margin: "1rem"}}>
                      <Link to={`/casecontext/${post.did}`} style={{ textDecoration: "none", color: "black", textAlign: "start" }}>
                        <div style={{ fontSize:'26px' }}>{post.d_name}</div>
                        <div id={changecolortype == true ? "active" : ""}>案件類別：{post.type}</div>
                        <div id={changecolorbudge == true ? "active" : ""}>預算：${post.d_amount}&nbsp;/&nbsp;{post.d_unit}</div>
                        <div id={changecolorcity == true ? "active" : ""}>地點：{post.country_city}</div>
                        <div id={changecolorduration == true ? "active" : ""}>{post.d_duration}期</div>
                      </Link>
                    </Col>
                    <Col>
                      <div className="description">{post.d_description}</div>
                    </Col>
                    <Col xs={1} style={{ display:'flex', fontSize:'16px',  justifyContent: 'center', alignItems:"center",borderLeft:"solid 1px", margin:'1rem'}}>
                      <div style={{padding:'.5rem' , textAlign:'center'}}>
                        <div id={changecolorupdated_at == true ? "active" : ""}>{post.updated_at}</div>
                        <div id={changecolorquote_total == true ? "active" : ""}>{post.quote_total}人報價中</div>
                        <div >刊登時間：</div>
                        <div id={changecolorcreated_at == true ? "active" : ""}>{post.created_at}</div>
                        <Button style={{ fontSize: "10px", }} onClick={isLoggedIn ? () => { handlequoteShow(index) } : handleShow}>我要報價</Button>
                      </div>

                    </Col>
                  </Row>
                </div>
              </div>)
          })}
        </div>
        {/* 案件欄位 */}


        {/* 我要報價Modal */}
        <Modal show={show} onHide={close} >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "19px" }} >
              報價表單
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
              <div>案件名稱：{posts[key]?.d_name}</div>
              <hr></hr>
              <div>案件編號：{posts[key]?.did}</div>
              <hr></hr>
              <div>案件類別：{posts[key]?.type}</div>
              <hr></hr>
              <div>案件地點：{posts[key]?.country_city}</div>
              <hr></hr>
              <Form.Label>報價金額</Form.Label>
              <Form.Group
                className="mb-3 d-flex"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  style={{ width: "100px" }}
                  type=""
                  autoFocus
                  defaultValue={posts[key]?.d_amount}
                  ref={QuoteAmount}
                ></Form.Control>
                <div className="mt-2"> &nbsp;/&nbsp;{posts[key]?.d_unit}<span style={{ display: (amountwarm != true ? "none" : ""), color: "red", marginLeft: "15px" }}>請輸入金額</span></div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>接案人留言</Form.Label>
                <div style={{ display: (messagewarm != true ? "none" : ""), color: "red" }}>請輸入至少10個字以上</div>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder=" 請輸入至少10個字以上"
                  ref={QuoteMessage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => handleClose(posts[key]?.did)}>
              送出
            </Button>
          </Modal.Footer>
        </Modal>








        {/* 我要報價Modal */}






        {/*報價失敗Modal  */}
        <Modal show={failshow} onHide={close} style={{ marginTop: "250px", fontSize: "30px", textAlign: "center" }}>

          <Modal.Body>
            <HiXCircle color="red" size={150} />
            <div>報價失敗，請確認帳號是否有登入及驗證</div>
          </Modal.Body>

        </Modal>
        {/*報價失敗Modal  */}




        {/*報價成功Modal  */}
        <Modal show={successshow} onHide={close} style={{ marginTop: "250px", fontSize: "50px", textAlign: "center" }}>

          <Modal.Body>
            <CiCircleCheck color="green" size={150} />
            <div>{success}</div>
          </Modal.Body>

        </Modal>
        {/*報價成功Modal  */}











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

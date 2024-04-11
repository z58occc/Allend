import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../homepage/Footer";
import Dropdown from "react-bootstrap/Dropdown";
import { GoCheckbox, GoTriangleDown } from "react-icons/go";
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
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoIosSad } from "react-icons/io";
import "./Findcase.css";
import { dropdown } from "./drop";



function Findcase() {

  // 進來頁面 直接先跑一次fetch
  useEffect(() => {
    fetchData()
  }, []);
  // 進來頁面 直接先跑一次fetch



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
  const close = async () => {
    setShow(false);
    setMessagewarm(false);
    setAmountwarm(false);
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
  const [showdropdown, setShowdropdown] = useState(false);



  const handleShow = (index) => {
    setShow(true);
    setkey(index);
    console.log(index);
  };
  // Modal上面


  const [posts, setPosts] = useState([]);
  const [mycitys, setMycitys] = useState([]);
  const [changeorder, setChangeorder] = useState(false);
  const [messagewarm, setMessagewarm] = useState(false);
  const [amountwarm, setAmountwarm] = useState(false);
  const [all, setAll] = useState(true);
  const [temp, setTemp] = useState([]);


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





  const [isChecked, setIsChecked] = useState(false);


  const handlechangecity = async (event) => {
    // setAll(false);
    // fetchData();
    // setIsChecked(!isChecked);
    console.log(event);
    console.log(event.target);
    console.log(event.target.checked);
    console.log(event.target.name);
    fetchData(event.target.name, event.target.checked);
  }

  console.log()

  const handlechangebudget = async (event) => {
    // setAll(false);
    fetchDataByBudget(event.target.name, event.target.checked);
  }

  const [checkedState, setCheckedState] = useState(
    new Array(dropdown.length).fill(false)
  );
  const handleOnChange = (position) => {
    setAll(false);

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log(updatedCheckedState);
    console.log(position);
    console.log(updatedCheckedState[position]);
    fetchData(position, updatedCheckedState[position], updatedCheckedState);
  };








  const sortData = async (s) => {
    setCurrentPage(1);
    switch (s) {

      case "updated_at":
        changeBottomcolorOff();
        setChangecolorupdated_at(true);
        setChangecolor4(true);
        for (let i = 0; i < posts.length; i++) {
          const x = posts.sort(function (a, b) { return parseInt(a.updated_at) - parseInt(b.updated_at) });
          setPosts(x);
        }
        break;

      case "created_at":
        changeBottomcolorOff();
        setChangecolorcreated_at(true);
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

  const fetchData = async (type, bool, updatedCheckedState) => {
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

          setPosts(data);
          console.log(data);



          // 在點擊下一個按鈕後 清空案件
          // setMycitys([]);

          // 在點擊下一個按鈕後 清空案件



          // if (changecolortype == true) {
          //   changeBottomcolorOff();

          // }



          // if (bool == true) {
          //   if (mycitys.length == 16) {
          //     mycitys.length = 0;
          //   }
          //   console.log(mycitys)
          //   let city = posts.filter(item => item.country_city == type)
          //   console.log(city);
          //   const citys = [...mycitys, ...city]
          //   setMycitys(citys);



          // } else {
          //   if (mycitys.length != 16) {
          //     console.log(posts);
          //     let restore = posts.filter(item => item.country_city != type)
          //     const pre = [...mycitys, ...restore]
          //     console.log(mycitys);
          //     setMycitys(pre);
          //   }
          // }



          if (bool == true) {
            console.log(updatedCheckedState);
            const truenumber = updatedCheckedState.filter(item => item == true);
            console.log(truenumber);
            // for (let i = 0; i < updatedCheckedState.length; i++) {
            //   var add = data.filter(item =>item.country_city ==dropdown[i].name)
            //   console.log(add)
            // };

            switch (type) {
              case 0:
                // if (mycitys.length == 16) {
                //   mycitys.length = 0;
                // }
                // let TPE = data.filter(item => item.country_city == "台北市");
                // console.log(TPE);

                // let TPEx = [...mycitys, ...TPE];
                // setMycitys(TPEx);





                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "台北市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setTemp(addx);
                console.log(addx);
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 1:

                console.log("新北市");
                if (mycitys.length == 16 && truenumber.length <= 1) {

                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "新北市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 2:

                console.log("桃園市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "桃園市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 3:

                console.log("基隆市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "基隆市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 4:

                console.log("新竹市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "新竹市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 5:

                console.log("新竹縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "新竹縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 6:

                console.log("彰化縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "彰化縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 7:

                console.log("南投縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "南投縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 8:

                console.log("雲林縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "雲林縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 9:

                console.log("高雄市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "高雄市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 10:

                console.log("台南市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "台南市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 11:

                console.log("嘉義市");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "嘉義市");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 12:

                console.log("嘉義縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "嘉義縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 13:

                console.log("屏東縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "屏東縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 14:

                console.log("宜蘭縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "宜蘭縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 15:

                console.log("花蓮縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "花蓮縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 16:

                console.log("臺東縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "臺東縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 17:

                console.log("澎湖縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "澎湖縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 18:

                console.log("金門縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "金門縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 19:

                console.log("連江縣");
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "連江縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 20:
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                if (updatedCheckedState.slice(0, 20).includes(true)) {
                  var add = mycitys.filter(item => item.d_amount <= 5000);
                  console.log(add);

                  setMycitys(add);

                  changeBottomcolorOff();
                  changecitycolor();



                  console.log(mycitys);
                  break;



                } else {
                  var add = data.filter(item => item.d_amount <= 5000);
                  console.log(add);

                  var addx = [...mycitys, ...add];
                  setMycitys(addx);

                  changeBottomcolorOff();
                  changecitycolor();



                  console.log(mycitys);
                  break;

                }
              case 21:
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "連江縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 22:
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "連江縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 23:
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "連江縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;
              case 24:
                if (mycitys.length == 16 && truenumber.length <= 1) {
                  mycitys.length = 0;
                }
                var add = data.filter(item => item.country_city == "連江縣");
                console.log(add);

                var addx = [...mycitys, ...add];
                setMycitys(addx);

                changeBottomcolorOff();
                changecitycolor();



                console.log(mycitys);
                break;


              default:
                break;
            }
          } else {
            switch (type) {
              case 0:
                if (updatedCheckedState.slice(20, 25).includes(true)) {
                  var y = temp.filter(item => item != "台北市")
                  var z = [...mycitys, ...y]
                  console.log(z);
                  setMycitys(z);


                } else {
                  if (updatedCheckedState.includes(true)) {
                    console.log(1);
                    console.log(mycitys);
                    const y = mycitys.filter(item => item.country_city != "台北市")
                    console.log(y);
                    setMycitys(y);

                    break;
                  } else {
                    console.log(mycitys);
                    var restore0 = data.filter(item => item.country_city != "台北市");
                    var x = [...mycitys, ...restore0]
                    setMycitys(x);
                  }
                  changeBottomcolorOff();
                  changecitycolor();


                  console.log(mycitys);
                  break;
                }

              case 1:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "新北市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "新北市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 2:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "桃園市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "桃園市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 3:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "基隆市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "基隆市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 4:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "新竹市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "新竹市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 5:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "新竹縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "新竹縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 6:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "彰化縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "彰化縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 7:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "南投縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "南投縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 8:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "雲林縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "雲林縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 9:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "高雄市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "高雄市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 10:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "台南市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "台南市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 11:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "嘉義市")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "嘉義市");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 12:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "嘉義縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "嘉義縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 13:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "屏東縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "屏東縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 14:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "宜蘭縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "宜蘭縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();


                break;
              case 15:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "花蓮縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "花蓮縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 16:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "臺東縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "臺東縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 17:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "澎湖縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "澎湖縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 18:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "金門縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "金門縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();

                break;
              case 19:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.country_city != "連江縣")
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.country_city != "連江縣");
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 20:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  var y = temp.filter(item => item.d_amount >= 5000)
                  var z = [...mycitys, ...y]
                  console.log(z);
                  setMycitys(z);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.d_amount >= 5000);
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 21:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.d_amount <= 5000 || item.d_amount >= 10000)
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.d_amount <= 5000 || item.d_amount >= 10000);
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 22:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.d_amount <= 10000 || item.d_amount >= 50000)
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.d_amount <= 10000 || item.d_amount >= 50000);
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 23:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.d_amount <= 50000 || item.d_amount >= 100000)
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.d_amount <= 50000 || item.d_amount >= 100000);
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;
              case 24:
                if (updatedCheckedState.includes(true)) {
                  console.log(1);
                  console.log(mycitys);
                  const y = mycitys.filter(item => item.d_amount <= 100000 || item.d_amount >= 300000)
                  console.log(y);
                  setMycitys(y);

                  break;
                } else {
                  console.log(mycitys);
                  var restore0 = data.filter(item => item.d_amount <= 100000 || item.d_amount >= 300000);
                  var x = [...mycitys, ...restore0]
                  setMycitys(x);
                }
                changeBottomcolorOff();
                changecitycolor();
                break;

              default:
                break;
            }

          }



          // switch (type) {

          //               // break;
          // case "台北市":
          //   // for (let i = 0; i < data.length; i++) {
          //   //   // const x = data.filter((data) => data[i].country_city == "台北市");
          //   //   // console.log(x);
          //   //   // setPosts(x);
          //   //   if (data[i].country_city == "台北市") {
          //   //     // console.log(data[i]);
          //   //     mycitys.push(data[i]);
          //   //     const y = mycitys.filter((x) => x.did < 13);
          //   //     // console.log(y);
          //   //     // console.log(mycitys);
          //   //     // [...mycitys,(data[i])];
          //   //     // const x = []
          //   //     // console.log(x);
          //   //     setPosts(y);
          //   //     console.log(mycitys);

          //   //   }
          //   // }

          //   console.log("台北市");
          //   let TPE = data.filter(item => item.country_city == "台北市");
          //   console.log(TPE);

          //   let TPEx = [...mycitys, ...TPE];
          //   setMycitys(TPEx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   console.log(mycitys);
          //   break;
          // case "新北市":
          //   let TPH = data.filter(item => item.country_city == "新北市");
          //   let TPHx = [...mycitys, ...TPH];
          //   setMycitys(TPHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "桃園市":
          //   let TYC = data.filter(item => item.country_city == "桃園市");
          //   let TYCx = [...mycitys, ...TYC];
          //   setMycitys(TYCx);

          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "基隆市":
          //   let KLU = data.filter(item => item.country_city == "基隆市");
          //   let KLUx = [...mycitys, ...KLU];
          //   setMycitys(KLUx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "新竹市":
          //   let HSC = data.filter(item => item.country_city == "新竹市");
          //   let HSCx = [...mycitys, ...HSC];
          //   setMycitys(HSCx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "新竹縣":
          //   let HSH = data.filter(item => item.country_city == "新竹縣");
          //   let HSHx = [...mycitys, ...HSH];
          //   setMycitys(HSHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "彰化縣":
          //   let CWH = data.filter(item => item.country_city == "彰化縣");
          //   let CWHx = [...mycitys, ...CWH];
          //   setMycitys(CWHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "南投縣":
          //   let NTO = data.filter(item => item.country_city == "南投縣");
          //   let NTOx = [...mycitys, ...NTO];
          //   setMycitys(NTOx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "雲林縣":
          //   let YLH = data.filter(item => item.country_city == "雲林縣");
          //   let YLHx = [...mycitys, ...YLH];
          //   setMycitys(YLHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "高雄市":
          //   let KHH = data.filter(item => item.country_city == "高雄市");
          //   let KHHx = [...mycitys, ...KHH];
          //   setMycitys(KHHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "台南市":
          //   let TNN = data.filter(item => item.country_city == "台南市");
          //   let TNNx = [...mycitys, ...TNN];
          //   setMycitys(TNNx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "嘉義市":
          //   let CYI = data.filter(item => item.country_city == "嘉義市");
          //   let CYIx = [...mycitys, ...CYI];
          //   setMycitys(CYIx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "嘉義縣":
          //   let CHY = data.filter(item => item.country_city == "嘉義縣");
          //   let CHYx = [...mycitys, ...CHY];
          //   setMycitys(CHYx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "屏東縣":
          //   let IUH = data.filter(item => item.country_city == "屏東縣");
          //   let IUHx = [...mycitys, ...IUH];
          //   setMycitys(IUHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "宜蘭縣":
          //   let ILN = data.filter(item => item.country_city == "宜蘭縣");
          //   let ILNx = [...mycitys, ...ILN];
          //   setMycitys(ILNx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "花蓮縣":
          //   let HWA = data.filter(item => item.country_city == "花蓮縣");
          //   let HWAx = [...mycitys, ...HWA];
          //   setMycitys(HWAx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "臺東縣":
          //   let TTT = data.filter(item => item.country_city == "臺東縣");
          //   let TTTx = [...mycitys, ...TTT];
          //   setMycitys(TTTx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "澎湖縣":
          //   let PEH = data.filter(item => item.country_city == "澎湖縣");
          //   let PEHx = [...mycitys, ...PEH];
          //   setMycitys(PEHx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "金門縣":
          //   let KMN = data.filter(item => item.country_city == "金門縣");
          //   let KMNx = [...mycitys, ...KMN];
          //   setMycitys(KMNx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //   break;
          // case "連江縣":
          //   let LNN = data.filter(item => item.country_city == "連江縣");
          //   let LNNx = [...mycitys, ...LNN];
          //   setMycitys(LNNx);
          //   changeBottomcolorOff();
          //   changecitycolor();


          //                 break;
          //               case "5k":
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_amount <= 5000) {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }
          //                 }
          //                 changeBottomcolorOff();
          //                 changebudgecolor();


          //                 break;
          //               case "1w":
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_amount >= 5000 && data[i].d_amount <= 10000) {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }
          //                 }
          //                 changeBottomcolorOff();
          //                 changebudgecolor();


          //                 break;

          //               case "5w":
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_amount >= 10000 && data[i].d_amount <= 50000) {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }
          //                 }
          //                 changeBottomcolorOff();
          //                 changebudgecolor();


          //                 break;

          //               case "10w":
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_amount >= 50000 && data[i].d_amount <= 100000) {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }
          //                 }
          //                 changeBottomcolorOff();
          //                 changebudgecolor();


          //                 break;
          //               case "30w":
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_amount >= 100000 && data[i].d_amount <= 300000) {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }
          //                 }
          //                 changeBottomcolorOff();
          //                 changebudgecolor();

          //                 break;
          //               case "all":
          //                 changeBottomcolorOff();

          //                 setChangecolor1(true);
          //                 for (let i = 0; i < data.length; i++) {
          //                   mycitys.push(data[i]);
          //                   setPosts(mycitys);
          //                 }
          //                 break;
          //               case "短":
          //                 changeBottomcolorOff();

          //                 setChangecolor2(true);
          //                 changedurationcolor();
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_duration == "短") {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);
          //                   } else {
          //                     setPosts(mycitys);
          //                   }

          //                 }
          //                 break;
          //               case "長":
          //                 changeBottomcolorOff();
          //                 changedurationcolor();
          //                 setChangecolor3(true);
          //                 for (let i = 0; i < data.length; i++) {
          //                   if (data[i].d_duration == "長") {
          //                     mycitys.push(data[i]);
          //                     setPosts(mycitys);

          //                   } else {
          //                     setPosts(mycitys);

          //                   }
          //                 }
          //                 break;

          //               default:
          //                 break;
          //             }


          // console.log(mycitys);
          // console.log(posts);
          // console.log(data);

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







  const fetchDataByBudget = async (budgetrange, bool) => {
    switch (budgetrange) {
      case "5k":
        if (bool == true) {

          let budget = posts.filter(item => item.d_amount <= 5000)
          console.log(budget);
          // const budgets = [...mycitys, ...budget]
          setPosts(budget);
        } else {
          console.log(mycitys);
          let empty = posts.filter(item => item.country_city > 5000)
          console.log(mycitys);
          setPosts(empty);
        }
        break;
      case "1w":
        if (bool == true) {

          let budget = posts.filter(item => item.d_amount >= 5000 && item.d_amount <= 10000)
          console.log(budget);
          const budgets = [...mycitys, ...budget]
          setMycitys(budgets);
        } else {
          console.log(mycitys);
          let empty = mycitys.filter(item => item.d_amount < 5000 || item.d_amount > 10000)
          console.log(mycitys);
          setMycitys(empty);
        }
        break;
      case "5w":
        if (bool == true) {

          let budget = posts.filter(item => item.d_amount >= 10000 && item.d_amount <= 50000)
          console.log(budget);
          const budgets = [...mycitys, ...budget]
          setMycitys(budgets);
        } else {
          console.log(mycitys);
          let empty = mycitys.filter(item => item.d_amount < 10000 || item.d_amount > 50000)
          console.log(mycitys);
          setMycitys(empty);
        }
        break;
      case "10w":
        if (bool == true) {

          let budget = posts.filter(item => item.d_amount >= 50000 && item.d_amount <= 100000)
          console.log(budget);
          const budgets = [...mycitys, ...budget]
          setMycitys(budgets);
        } else {
          console.log(mycitys);
          let empty = mycitys.filter(item => item.d_amount < 50000 || item.d_amount > 100000)
          console.log(mycitys);
          setMycitys(empty);
        }
        break;
      case "30w":
        if (bool == true) {

          let budget = posts.filter(item => item.d_amount >= 100000 && item.d_amount <= 300000)
          console.log(budget);
          const budgets = [...mycitys, ...budget]
          setMycitys(budgets);
        } else {
          console.log(mycitys);
          let empty = mycitys.filter(item => item.d_amount < 100000 || item.d_amount > 300000)
          console.log(mycitys);
          setMycitys(empty);
        }
        break;

      default:
        break;
    }

  }




  const fetchDataByCity = async (cityname, bool) => {
    if (bool == true) {

      let city = posts.filter(item => item.country_city == cityname)
      console.log(city);
      const citys = [...mycitys, ...city]
      console.log(citys);

      setPosts(citys);

    } else {
      console.log(mycitys);
      let empty = posts.filter(item => item.country_city != cityname)
      console.log(empty);
      setPosts(empty);
    }
  }
  // if (bool == true) {

  //   let city = posts.filter(item => item.country_city == cityname)
  //   console.log(city);
  //   const citys = [...mycitys, ...city]
  //   setMycitys(citys);

  // } else {
  //   console.log(mycitys);
  //   let empty = mycitys.filter(item => item.country_city != cityname)
  //   console.log(mycitys);
  //   setMycitys(empty);
  // }
  // }



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
            bottom: "20px",
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
          <Dropdown >
            <Dropdown.Toggle id="dropdown-basic">地區</Dropdown.Toggle>
            {/* <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <div>
                <input
                  type="checkbox"
                  name="台北市"
                  onChange={handlechangecity}
                >
                </input>
                台北市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="新北市"
                >
                </input>
                新北市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="桃園市"
                >
                </input>
                桃園市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="基隆市"
                >
                </input>
                基隆市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="新竹市"
                >
                </input>
                新竹市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="新竹縣"
                >
                </input>
                新竹縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="彰化縣"
                >
                </input>
                彰化縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="南投縣"
                >
                </input>
                南投縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="雲林縣"
                >
                </input>
                雲林縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="高雄市"
                >
                </input>
                高雄市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="台南市"
                >
                </input>
                台南市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="嘉義市"
                >
                </input>
                嘉義市
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="嘉義縣"
                >
                </input>
                嘉義縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="屏東縣"
                >
                </input>
                屏東縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="宜蘭縣"
                >
                </input>
                宜蘭縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="花蓮縣"
                >
                </input>
                花蓮縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="臺東縣"
                >
                </input>
                臺東縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="澎湖縣"
                >
                </input>
                澎湖縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="金門縣"
                >
                </input>
                金門縣
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangecity}
                  name="連江縣"
                >
                </input>
                連江縣
              </div>
            </Dropdown.Menu> */}
            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {dropdown.slice(0, 20).map(({ name }, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      checked={checkedState[index]}
                      name={name}
                      value={name}
                      onChange={() => handleOnChange(index)}
                    >
                    </input>
                    {name}
                  </div>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>



          <Dropdown className="mx-5">
            <Dropdown.Toggle id="dropdown-basic">案件金額</Dropdown.Toggle>

            <Dropdown.Menu>
              {dropdown.slice(20, 26).map(({ name }, index) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      checked={checkedState[index + 20]}
                      name={name}
                      value={name}
                      onChange={() => handleOnChange(index + 20)}
                    >
                    </input>
                    {name}
                  </div>
                )
              })}
              {/* <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  name="5k"
                >
                </input>
                5千以下
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  name="1w"
                >
                </input>
                5千~1萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  name="5w"
                >
                </input>
                1萬到5萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  name="10w"
                >
                </input>
                5萬到10萬
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handlechangebudget}
                  name="30w"
                >
                </input>
                10萬到30萬
              </div> */}
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





        {/* all == true ? posts : */}

        {/* 案件欄位 */}

        <div className="mt-5" style={{ display: (posts.length != 0 ? "none" : ""), fontSize: "40px", textAlign: "center" }}><IoIosSad size={80} color="#002546" />Oops!! 看來目前沒有符合篩選條件的資料喔!</div>
        <div >
          {(all == true ? currentPosts : mycitys).map((post, index) => {

            return (
              <div>
                <div className="row" key={index}>
                  <Row style={{ border: "solid black", padding: 0 }}>
                    <Col id="link" xs={2} style={{ borderRight: "solid black", fontSize: "15px" }}>
                      <Link to={`/casecontext/?${post.did}`} style={{ textDecoration: "none", color: "black", textAlign: "start" }}>
                        <div>{post.d_name}</div>
                        <div id={changecolortype == true ? "active" : ""}>案件類別：{post.type}</div>
                        <div id={changecolorbudge == true ? "active" : ""}>預算：${post.d_amount}&nbsp;/&nbsp;{post.d_unit}</div>
                        <div id={changecolorcity == true ? "active" : ""}>地點：{post.country_city}</div>
                        <div id={changecolorduration == true ? "active" : ""}>{post.d_duration}期</div>
                      </Link>
                    </Col>
                    <Col xs={6} >
                      <div >{post.d_description}</div>
                    </Col>
                    <Col >

                      {/* className="position-absolute bottom-0 end-0" */}
                    </Col>
                    <Col xs={1} style={{ backgroundColor: "white" }}>
                      <div style={{ textAlign: "start", fontSize: "10px", marginTop: "20px" }}>
                        <div id={changecolorupdated_at == true ? "active" : ""}>{post.updated_at}</div>
                        <div id={changecolorquote_total == true ? "active" : ""}>{post.quote_total}人報價中</div>
                        <div >刊登時間：</div>
                        <div id={changecolorcreated_at == true ? "active" : ""}>{post.created_at}</div>
                      </div>
                      <div >
                        <Button style={{ width: "70px", height: "30px ", fontSize: "10px", }} onClick={() => { handleShow(index); }}>我要報價</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>)
            // className="d-flex" style={{ justifyContent:"center  " }}



          })}
        </div>
        {/* 案件欄位 */}

        {/* 我要報價頁面 */}
        <Modal show={show} onHide={close}>
          <Modal.Header closeButton >
            <Modal.Title style={{ fontSize: 15 }}>
              報價表單：
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
                {/* <input style={{ width: "100px" }}  ref={QuoteAmount}></input> */}
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

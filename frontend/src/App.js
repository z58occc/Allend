import React, { useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import ourLogo from "./homepage/ourLogo.jpg";
import Homepage from "./homepage/homepage";
import Findcase from "./Components/Findcase";
import Findman from "./Components/Findman";
import Member from "../src/RatingPage/RatingPage";
import ProjectForm from "./Components/page/Member/ProjectForm";
import Serve from "./Components/Serve";
import Talent from "./Components/Talent";
import Switch from "../src/Components/page/Member/Switch";
import Fix from "./Components/page/Member/fix";
import Softdesign from "./Components/softdesign"
import Word from "./Components/word";
import Pro from "./Components/pro";
import Program from "./Components/program";
import CaseContext from "./Components/CaseContext";
import MainScreen from "./accept/MainScreen";
import MainScreen2 from "./release/MainScreen2";
import axios from "axios";
import Cookies from "js-cookie";
import InputGroup from 'react-bootstrap/InputGroup';
import PayButton from "./Components/paybutton";



function App() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const toRegister = (event) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgotPassword(false);
    setShowRegister(true);
  };

  // 註冊後直接登入
  const RegisterEmail = useRef();
  const RegisterPassword = useRef();
  const RegisterConfPassword = useRef();

  // const handleRegister = () => {
  //   const email = RegisterEmail.current.value
  //   const password = RegisterPassword.current.value
  //   const confirmpasswrod = RegisterConfPassword.current.value
  //   const RegisterLogin = (data) => {
  //     axios({
  //       method:'post',
  //       url:"http://localhost/PHP/Allend/backend/public/api/login",
  //       data: {
  //         email: data.email,
  //         password:data.password
  //       }
  //     })
  //     .then((res) => {return res.data;})
  //     .then((data) => {
  //       console.log(data);
  //       Cookies.set('token', data.token);}
  //       )
  //   }

  //   axios({
  //     method: "post",
  //     url: "http://localhost/PHP/Allend/backend/public/api/register",
  //     data: {
  //       email: RegisterEmail.current.value,
  //       password: RegisterPassword.current.value,
  //       password_confirmation: RegisterConfPassword.current.value,
  //     },
  //   })

  //   .then((res) => {return res.data;})
  //   .then((data) => {
  //     console.log(data);
  //     RegisterLogin(data)
  //     })
  // }
  const registerUser = async (email, password, confirmPassword) => {
    try {
      const res = await axios.post(
        "http://localhost/Allend/backend/public/api/register",
        {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }
      );
      if (res.data.message !== '輸入資料格式有誤或是電子郵件已被註冊!') {
        await loginUser(email, password);
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };



  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost/Allend/backend/public/api/login",
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false); // Update login status
  };



  const handleRegister = async () => {
    const email = RegisterEmail.current.value;
    const password = RegisterPassword.current.value;
    const confirmPassword = RegisterConfPassword.current.value;
    try {
      const data = await registerUser(email, password, confirmPassword);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const LoginName = useRef();
  const LoginPassword = useRef();
  const handleLogin = () => {
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/login",
      data: {
        email: LoginName.current.value,
        password: LoginPassword.current.value,
      },
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        Cookies.set("token", data.token);
      })
      .catch(($err) => {
        console.log($err);
      });
  };

  const toForgotPassword = (event) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgotPassword(true);
  };
  const ForgetName = useRef();
  const sendForgetPWD = () => {
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/forgetpwd",
      data: {
        email: ForgetName.current.value,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch(($err) => {
        console.log($err);
      });
  };

  //控制連結顏色切換
  const [selectedLink, setSelectedLink] = useState(null);
  const location = useLocation();

  // 根据当前路径更新选中链接状态
  React.useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location]);

  // 处理链接点击事件
  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };



  return (
    <>
      <div
        className="p-1"
        style={{
          display: "flex", alignItems: "center", height: 80, background: "linear-gradient(135deg, #EFBC9B, #ffdab9,#ffcab9)",
        }}
      >
        <Link to="/">
          <img style={{ width: 80, height: 80 }} src={ourLogo} alt="" />
        </Link>
        <span className="slogan-text" style={{ marginLeft: 5 }}>包您滿意</span>
        <div
          className="search-container"
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >



          {/* 搜索框 */}
          <input type="text" placeholder="Search.." style={{ width: '500px', height: '55px', borderRadius: '10px' }} />
          <Button type="submit"  style={{ height: '55px', width: '55px', borderRadius: '10px' }}>
            <i className="fa fa-search"></i>
          </Button>
          {/* 搜索框 */}




          {isLoggedIn ? ( // Check if user is logged in
            <Button style={{ height: '55px', width: '55px', borderRadius: '10px', fontSize: '20px' }} onClick={handleLogout}>登出</Button>
          ) : (
            <Button style={{ height: '55px', width: '110px', borderRadius: '10px', fontSize: '20px' }} onClick={handleShow}>登入/註冊</Button>
          )}
        </div>
      </div>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid" >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/findcase"
                className={`nav-link ${selectedLink === "/findcase" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/findcase" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/findcase")}
              >
                我要接案
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/findman"
                className={`nav-link ${selectedLink === "/findman" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/findman" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/findman")}
              >
                我要找人
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/ProjectForm"
                className={`nav-link ${selectedLink === "/ProjectForm" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/ProjectForm" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/ProjectForm")}
              >
                發案
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/member"
                className={`nav-link ${selectedLink === "/member" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/member" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/member")}
              >
                Email
              </Link>
            </li>
          </ul>
        </div>
      </nav >

      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/findcase" element={<Findcase></Findcase>}></Route>
        <Route path="/findcase/:s_type" element={<Findcase></Findcase>}></Route>
        <Route path="/findman/:s_type" element={<Findman></Findman>}></Route>
        <Route path="/findman" element={<Findman></Findman>}></Route>
        <Route path="/ProjectForm" element={<ProjectForm></ProjectForm>}></Route>
        <Route path="/serve" element={<Serve></Serve>}></Route>
        <Route path="/serve/:mid/:sid" element={<Serve></Serve>}></Route>
        <Route path="/talent" element={<Talent></Talent>}></Route>
        <Route path="/talent/:mid" element={<Talent></Talent>}></Route>
        <Route path="/switch" element={<Switch></Switch>}></Route>
        <Route path="/member" element={<Member></Member>}></Route>
        <Route path="/fix" element={<Fix></Fix>}></Route>
        <Route path="/softdesign" element={<Softdesign></Softdesign>}></Route>
        <Route path="/word" element={<Word></Word>}></Route>
        <Route path="/pro" element={<Pro></Pro>}></Route>
        <Route path="/program" element={<Program></Program>}></Route>
        <Route path="/casecontext" element={<CaseContext></CaseContext>}></Route>
        <Route path="/casecontext/:did" element={<CaseContext></CaseContext>}></Route>
        <Route path="/service" element={<MainScreen></MainScreen>}></Route>
        <Route path="/commit" element={<MainScreen2></MainScreen2>}></Route>
        <Route path="/pay" element={<PayButton></PayButton>}></Route>
      </Routes>

      {/* 登入 */}
      <Modal show={showLogin} onHide={handleClose} centered style={{ borderRadius: '10px' }}>
        <Modal.Header closeButton>
          <div className="row justify-content-center w-100">
            <div className="col text-center">
              <Modal.Title>會員登入</Modal.Title>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="container row">
              <div className="col-6">
                <div className="row ">
                  <div className="col-sm-12 ">
                    <Form.Label>帳號</Form.Label>
                    <InputGroup>
                      <InputGroup.Text controlId="formBasicEmail">< FaUser /></InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        ref={LoginName}
                      />
                    </InputGroup>
                  </div>

                  <div className="col-sm-12">

                    <Form.Label>密碼</Form.Label>

                    <InputGroup>
                      <InputGroup.Text controlId="formBasicPassword"><RiLockPasswordFill /></InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={LoginPassword}
                      />
                    </InputGroup>
                    <Form.Text>
                      <a href="/forgot-password" onClick={toForgotPassword}>
                        忘記密碼?
                      </a>
                    </Form.Text>

                  </div>
                </div>
              </div>

              <div className="col-sm-6 d-flex justify-content-center">
                <Button  onClick={handleLogin} id="login" style={{ borderRadius: '10px' }}>
                  <img style={{ width: 130 }} src={ourLogo} alt="" />
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Form.Text>
            <a href="/Register" onClick={toRegister}>
              立即註冊
            </a>
          </Form.Text>
        </Modal.Footer>
      </Modal>
      {/* 登入 */}

      {/* 忘記密碼 */}
      <Modal
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="col text-center">忘記密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formForgotPasswordEmail"><MdOutlineMailOutline /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={ForgetName}
              />
            </InputGroup>
            <br />
            <Button variant="primary" onClick={sendForgetPWD}>
              送出
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* 忘記密碼 */}

      {/* 註冊 */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="col text-center"><FaUserPlus />會員註冊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>帳號</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicEmail"><MdOutlineMailOutline /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={RegisterEmail}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regular expression for email format
              />
              <Form.Control.Feedback type="invalid">
                請輸入有效的電子郵件
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label>密碼</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicPassword"><FaUserLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={RegisterPassword}
              />
            </InputGroup>
        
              <Form.Label>確認密碼</Form.Label>
              <InputGroup>
              <InputGroup.Text  controlId="formBasicConfirmedPassword"><FaLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirmed Password"
                ref={RegisterConfPassword}
              />
            </InputGroup>
            <br />
            <Button variant="info" onClick={handleRegister}>
              提交
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* 註冊 */}
    </>
  );
}



export default App;

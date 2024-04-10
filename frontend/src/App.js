import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUser, FaUserLock, FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
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
import { FcGoogle } from "react-icons/fc";
import MainScreen3 from "./servicePage/MainScreen2";
import Test from "./Components/test";



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

  const [errorRegister, seterrorRegister] = useState('');

  const [showVerificationModal, setShowVerificationModal] = useState(false);
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
      await loginUser(email, password);
      setShowVerificationModal(true);
      return true;
    } catch (err) {
      return false;
    }
  };
  // 註冊後登入
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
      setShowLogin(false);
      navigate('/switch');
    } catch (err) {
      console.log(err);
    }
  };
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const tokenCheckInterval = useRef(null);

  useEffect(() => {
    // 檢查是否有保存的token
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      // 初始化token過期時間
      const tokenExpirationTime = getTokenExpirationTime(token);
      setTokenExpiration(tokenExpirationTime);
      // 開始定時檢查token是否過期
      startTokenExpirationCheck(tokenExpirationTime);
    }
  }, []);

  useEffect(() => {
    // 清除定時器
    return () => {
      clearInterval(tokenCheckInterval.current);
    };
  }, []);

  // 解析token並獲取過期時間
  const getTokenExpirationTime = (token) => {
    const decodedToken = parseJwt(token);
    if (!decodedToken) return null;
    return decodedToken.exp * 1000; // 轉換為毫秒
  };


  // 解析JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const startTokenExpirationCheck = (expirationTime) => {
    tokenCheckInterval.current = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        // token過期，執行登出操作
        handleLogout();
      }
    }, 3600000); // 每小時檢查一次
  };

  const [showLogoutMessage, setShowLogoutMessage] = useState(false); //登出模塊

  // 登出處理
  const handleLogout = () => {
    clearInterval(tokenCheckInterval.current);
    Cookies.remove("token");
    setIsLoggedIn(false); // Update login status
    setMemberEmail('');
    setShowLogoutMessage(true);

  };

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // 處理註冊
  const handleRegister = async () => {
    const email = RegisterEmail.current.value;
    const password = RegisterPassword.current.value;
    const confirmPassword = RegisterConfPassword.current.value;
    try {
      const data = await registerUser(email, password, confirmPassword);
      if (data) {
        setIsVerificationSent(true);
        setShowRegister(false);
      } else {
        seterrorRegister('輸入資料格式有誤或是電子郵件已被註冊!')
      }
      // console.log(data);
      // setIsVerificationSent(true);
      // setShowRegister(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 重寄驗證信
  const handleResendVerification = () => {
    axios.post("http://localhost/Allend/backend/public/api/emailverification-notification",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsVerificationSent(true);
        setCountdown(60);
        setIsButtonDisabled(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown === 1) {
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // google登入
  const handleGoogleLogin = () => {
    try {
      axios({
        method: 'get',
        url: "http://localhost/Allend/backend/public/auth/google/redirect"
      }).then((res) => console.log(res.data))
    } catch (err) {
      console.log(err)
    }
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const navigate = useNavigate();
  const LoginName = useRef();
  const LoginPassword = useRef();
  const [rememberEmail, setRememberEmail] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost/Allend/backend/public/api/login",
        {
          email: LoginName.current.value,
          password: LoginPassword.current.value,
        });
      const token = res.data.token;
      Cookies.set('token', token);
      setIsLoggedIn(true);
      setShowLogin(false);
      const tokenExpirationTime = getTokenExpirationTime(token);
      setTokenExpiration(tokenExpirationTime);
      startTokenExpirationCheck(tokenExpirationTime);
      console.log(tokenExpirationTime)
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('An error occurred while logging in:', error.message);
        setErrorMessage('登入失敗');
      }
    }
  };


  // 取得會員email
  const fetchMemberEmail = async () => {
    try {
      const response = await axios.get("http://localhost/Allend/backend/public/api/user/email", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setMemberEmail(response.data.email);
    } catch (error) {
      console.error('Failed to fetch member email:', error);
    }
  };



  const projectFormLink = isLoggedIn ? "/ProjectForm" : window.location.href; // 發按按鈕登入判別
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

  // 控制連結顏色切換
  const [selectedLink, setSelectedLink] = useState(null);
  const location = useLocation();




  useEffect(() => {
    setSelectedLink(location.pathname);
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      fetchMemberEmail();
    }
  }, [location, isLoggedIn]);


  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };




  return (

    <>
      <div
        className="p-1"
        style={{
          display: "flex", alignItems: "center", height: 80, background: "linear-gradient(135deg,#EFBC9B, #ffdab9,#ffcab9)",
        }}
      >
        <Link to="/">
          <img style={{ width: 80, height: 80 }} src={ourLogo} alt="" />
        </Link>
        <span className="slogan-text" style={{ marginLeft: 5, letterSpacing: "2px" }}>包您滿意</span>
        <div
          className="search-container"
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >


          {/* 搜索框 */}
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '700px' }}>
            <input type="text" placeholder="Search.." style={{ width: '500px', height: '70px', borderRadius: '10px 0 0 10px', border: '1px solid #ccc', paddingLeft: '10px' }} />
            <button type="submit" style={{ height: '70px', width: '55px', borderRadius: '0 10px 10px 0', border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>
              <i className="fa fa-search" style={{ color: "#46A3FF" }}></i>
            </button>
          </div>
          {/* 搜索框 */}


          {isLoggedIn ? ( // Check if user is logged in
            <Button style={{ height: '70px', width: '140px', borderRadius: '10px', fontSize: '26px' }} onClick={handleLogout}>登出</Button>
          ) : (
            <Button style={{ height: '70px', width: '140px', borderRadius: '10px', fontSize: '26px' }} onClick={handleShow}>登入/註冊</Button>
          )}
          {isLoggedIn && (
            <div className="nav-item">
              <Link
                to="/member"
                className={`nav-link ${selectedLink === "/member" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/member" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/member")}
              >
                <span style={{ fontSize: '28px' }}>您好，{memberEmail}</span>
              </Link>
            </div>
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
                to={projectFormLink}
                className={`nav-link ${selectedLink === "/ProjectForm" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/ProjectForm" ? "#D6DAC8" : "#ffcab9", color: "black", width: "120px", textAlign: "center" }}
                onClick={isLoggedIn ? () => handleLinkClick("/ProjectForm") : handleShow}
              >
                發案
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
        <Route path="/manage" element={<MainScreen3></MainScreen3>}></Route>
        <Route path="/test" element={<Test></Test>}></Route>
      </Routes>





      {/* 登入 */}
      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <div className="row justify-content-center w-100">
            <div className="col text-center" >
              <Modal.Title>會員登入</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center justify-content-center" style={{ borderBottom: '1px solid black' }}>
          <div className="container row">
            <div className="col-12">
              <div className="row ">
                <div className="col-sm-12 ">
                  <Form.Label>帳號{errorMessage && <span style={{ color: 'red', paddingLeft: '20px' }}>{errorMessage}</span>}</Form.Label>
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
                  <InputGroup >
                    <InputGroup.Text controlId="formBasicPassword"><RiLockPasswordFill /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={LoginPassword}
                    />
                  </InputGroup>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="rememberEmail"
                      label="Remember Email"
                      className="mt-2"
                      style={{ color: "#FCFCFC" }}
                      checked={rememberEmail}
                      onChange={(e) => setRememberEmail(e.target.checked)}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="col-sm-12 d-flex flex-column align-items-center">
                <div className="mb-12 " style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Button variant="primary" onClick={handleLogin} id="login" style={{ borderRadius: '20px', height: "40px", fontSize: "20px", width: "420px" }}>
                    登入
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <Form.Text style={{ flexGrow: 1 }}>
                    <a href="/forgot-password" onClick={toForgotPassword}>
                      忘記密碼?
                    </a>
                  </Form.Text>
                  <Form.Text style={{ flexGrow: 1, textAlign: 'right' }}>
                    <a href="/Register" onClick={toRegister}>
                      立即註冊
                    </a>
                  </Form.Text>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: "50%" }}>
                    <hr style={{ width: "100%", margin: "10px 0", borderTop: "3px solid black" }} />
                  </div>
                  <div style={{ margin: "0 10px" }}>or</div>
                  <div style={{ width: "50%" }}>
                    <hr style={{ width: "100%", margin: "10px 0", borderTop: "3px solid black" }} />
                  </div>
                </div>
                <div>
                  <Button style={{ marginTop: "15px" }} onClick={handleGoogleLogin} variant="white">
                    <FcGoogle style={{ fontSize: "20px" }} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* 登入 */}

      {/* 忘記密碼 */}
      <Modal
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <Modal.Title className="col text-center" >忘記密碼</Modal.Title>
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
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <Modal.Title className="col text-center" ><FaUserPlus />會員註冊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>帳號 {errorRegister && <span style={{ color: 'red', paddingLeft: '20px' }}>{errorRegister}</span>}</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicEmail"><MdOutlineMailOutline /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={RegisterEmail}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"// Regular expression for email format
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
              <InputGroup.Text controlId="formBasicConfirmedPassword"><FaLock /></InputGroup.Text>
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
      <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} centered>
        <Modal.Body>
          <div>
            <h2>郵件已發送</h2>
            <p>請查看email，如果沒有收到，請點擊按鈕重新發送驗證郵件</p>
            {countdown > 0 ? (
              <button disabled>重新發送 ({countdown})</button>
            ) : (
              <button onClick={handleResendVerification}>重新發送驗證郵件</button>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showLogoutMessage} onHide={() => setShowLogoutMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>已登出</Modal.Title>
        </Modal.Header>
        <Modal.Body>為確保您的帳戶安全，已將您的帳號自動登出</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutMessage(false)}>關閉</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default App;

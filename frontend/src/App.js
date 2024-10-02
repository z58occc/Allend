import React, { createContext, useEffect, useRef, useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import Cookies from "js-cookie";
import { FaUser, FaUserLock, FaLock, FaRegCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineMailOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import ourLogo from "./homepage/ourLogo.jpg";
import { PiSignOutFill } from "react-icons/pi";
import Homepage from "./homepage/Homepage";
import Findcase from "./Components/Findcase";
import Findman from "./Components/Findman";
import MemberCenter from "../src/Dashboard/MemberCenter";
import ProjectForm from "./Components/page/Member/ProjectForm";
import Serve from "./Components/Serve";
import Talent from "./Components/Talent";
import Switch from "../src/Components/page/Member/Switch";
import Fix from "./Components/page/Member/fix";
import CaseContext from "./Components/CaseContext";
import MainScreen from "./accept/MainScreen";
import MainScreen2 from "./release/MainScreen2";
import MainScreen3 from "./servicePage/MainScreen3";
import CollectionsMain from "./Collections/CollectionsMain";
import PublicMessagesPage from './Components/PublicMessagesPage';
import CallbackHandler from "./MemberTool/CallbackHandler";
import Closechat from "./Components/Closechat";
import ForgotPassword from "./MemberTool/ForgotPassword";
import VerifyEmail from "./MemberTool/VerifyEmail";
import { Header } from "./layouts/Header";
import "./App.css";


export const IsLoggedInContext = createContext()


function App() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGoogle, setIsGoogle] = useState(0);
  const [emailVerified, setEmailVerified] = useState(0);
  const [infoCompleted, setInfoCompleted] = useState(0)
  
  // 聊天視窗狀態
  const [showChat, setShowChat] = useState(false);
  const [selectedItemMid, setSelectedItemMid] = useState(null);

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const toRegister = (event) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgotPassword(false);
    setShowRegister(true);
  };

  // 註冊後直接登入
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
      setShowVerificationModal(true);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const RegisterEmail = useRef();
  const RegisterPassword = useRef();
  const RegisterConfPassword = useRef();
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

  // 解析JWT token function
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
    }, 60000); // 每小時檢查一次
  };

  const [showLogoutMessage, setShowLogoutMessage] = useState(false); //登出模塊

  const clickOut = () => {
    axios({
      method: 'post',
      url: "http://localhost/Allend/backend/public/api/logout",
      headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    })
  }
  // 自動登出處理
  const handleLogout = () => {
    clearInterval(tokenCheckInterval.current);
    clickOut();
    Cookies.remove("token");
    setIsLoggedIn(false);
    setMemberEmail('');
    setShowLogoutMessage(true);
    navigate('/');
  };
  // 手動登出處理
  const handleclickout = () => {
    clickOut();
    Cookies.remove("token");
    setIsLoggedIn(false);
    setMemberEmail('');
    navigate('/');
  }

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // 重寄驗證信
  const handleResendVerification = () => {
    axios({
      method: 'post',
      url: "http://localhost/Allend/backend/public/api/emailverification-notification",
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    })
      .then((res) => {
        // console.log(res.data);
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
      }).then((res) => window.open(res.data))
    } catch (err) {
      console.log(err)
    }
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const navigate = useNavigate();
  const LoginName = useRef();
  const LoginPassword = useRef();


  // 一般登入
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
      // console.log(tokenExpirationTime)
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('An error occurred while logging in:', error.message);
        setErrorMessage('登入失敗');
      }
    }
  };

  // 取得會員email、provider、verified
  const fetchMemberEmail = async () => {
    try {
      const response = await axios.get("http://localhost/Allend/backend/public/api/user/email", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setMemberEmail(response.data);
      setIsGoogle(response.data.provider)
      setEmailVerified(response.data.verified)
      setInfoCompleted(response.data.infocompleted)
    } catch (error) {
      console.error('Failed to fetch member email:', error);
    }
  };

  // 忘記密碼
  const toForgotPassword = (event) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const [forgetmessage, setForgetmessage] = useState('');
  const ForgetName = useRef();
  const sendForgetPWD = () => {
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/forgot-password",
      data: {
        email: ForgetName.current.value,
      },
    })
      .then((res) => {
        setForgetmessage('已發送重設密碼信件，請至信箱查看');
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

  // 登入註冊 enter 效果
  const loginButtonRef = useRef(null);
  const registerButtonRef = useRef(null);

  useEffect(() => {
    // 定义键盘事件处理函数
    const handleKeyDown = (event) => {
      // 检查是否按下了 Enter 键
      if (event.key === 'Enter' || event.keyCode === 13) {
        // 阻止默認行為（例如表單提交）
        event.preventDefault();
        // 如果登录按钮存在，则触发其点击事件
        if (loginButtonRef.current) {
          loginButtonRef.current.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // 定义键盘事件处理函数
    const handleKeyDown = (event) => {
      // 检查是否按下了 Enter 键
      if (event.key === 'Enter' || event.keyCode === 13) {
        // 阻止默認行為（例如表單提交）
        event.preventDefault();
        // 如果注册按钮存在，则触发其点击事件
        if (registerButtonRef.current) {
          registerButtonRef.current.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //增加註冊入返回登入
  const handleBackToLogin = () => {
    setShowRegister(false); // 關閉註冊模態視窗
    setShowLogin(true); // 打開登入模態視窗
  };

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleShow, showChat, selectedItemMid, setSelectedItemMid, setShowChat, isGoogle, emailVerified, setIsVerificationSent, setCountdown, countdown , infoCompleted, setInfoCompleted}}>

      <Header 
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
        email={memberEmail}
        clickOut={handleclickout}
      />

      {isLoggedIn ? (showChat ? (<PublicMessagesPage receiverId={selectedItemMid} />) : <Closechat />) : (handleShow)}
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/findcase/:type?/:casesearch?" element={<Findcase></Findcase>}></Route>
        <Route path="/findman/:s_type?/:servicesearch?" element={<Findman></Findman>}></Route>
        <Route path="/ProjectForm" element={<ProjectForm></ProjectForm>}></Route>
        <Route exact path="/serve/:mid?/:sid?" element={<Serve></Serve>}></Route>
        <Route path="/talent/:mid?" element={<Talent></Talent>}></Route>
        <Route path="/switch" element={<Switch></Switch>}></Route>
        <Route path="/member" element={<MemberCenter></MemberCenter>}></Route>
        <Route path="/fix" element={<Fix></Fix>}></Route>
        <Route path="/casecontext" element={<CaseContext></CaseContext>}></Route>
        <Route path="/casecontext/:id" element={<CaseContext></CaseContext>}></Route>
        <Route path="/service" element={<MainScreen></MainScreen>}></Route>
        <Route path="/commit" element={<MainScreen2></MainScreen2>}></Route>
        <Route path="/manage" element={<MainScreen3></MainScreen3>}></Route>
        <Route path="/collect" element={<CollectionsMain></CollectionsMain>}></Route>
        <Route path="/auth/google/callback" element={<CallbackHandler></CallbackHandler>} />
        {/* <Route path="/chat" element={<PublicMessagesPage></PublicMessagesPage>}></Route> */}
        {/* <Route path="/chat/:receiverId" element={<PublicMessagesPage></PublicMessagesPage>}></Route> */}
        {/* <Route path="*" element={<Findcase></Findcase>}></Route> */}
        <Route path="/passwordreset/:token" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/verifyemail/:id/:hash" element={<VerifyEmail></VerifyEmail>} />
      </Routes>





      {/* 登入 */}
      <Modal show={showLogin} onHide={handleClose} centered className="custom-modal" >
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
                  <Form.Label style={{fontSize: "20px"}}>帳號{errorMessage && <span style={{ color: 'red', paddingLeft: '20px' }}>{errorMessage}</span>}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text controlId="formBasicEmail">< FaUser /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      ref={LoginName}

                    />
                  </InputGroup>
                </div>

                <div className="col-sm-12" style={{marginTop: "15px"}}>
                  <Form.Label style={{fontSize: "20px"}}>密碼</Form.Label >
                  <InputGroup >
                    <InputGroup.Text controlId="formBasicPassword"><RiLockPasswordFill /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref={LoginPassword}

                    />
                  </InputGroup>
                </div>
              </div>

              <div className="col-sm-12 d-flex flex-column align-items-center" >
                <div className="mb-12 " style={{ textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: "18px" }}>
                  <Button variant="primary" onClick={handleLogin} ref={loginButtonRef} style={{ borderRadius: '20px', height: "40px", fontSize: "20px", width: "420px" }}>
                    登入
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "15px" }}>
                  <Form.Text style={{ flexGrow: 1, fontSize: "18px" }}>
                    <a href="/forgot-password" onClick={toForgotPassword}>
                      忘記密碼?
                    </a>
                  </Form.Text>
                  <Form.Text style={{ flexGrow: 1, textAlign: 'right', fontSize: "18px" }}>
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
        className="custom-modal"
      >
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <Modal.Title className="col text-center" >忘記密碼 ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label style={{fontSize: "20px"}}>Email<span style={{ padding: '20px', color: "red" }}>{forgetmessage}</span></Form.Label>
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
      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered className="custom-modal">
        <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
          <Modal.Title className="col text-center" ><FaUserPlus />會員註冊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label style={{fontSize: "20px",marginTop: "10px"}}>帳號 {errorRegister && <span style={{ color: 'red', paddingLeft: '20px' }}>{errorRegister}</span>}</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicEmail"><MdOutlineMailOutline /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={RegisterEmail}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"// Regular expression for email forma

              />
              <Form.Control.Feedback type="invalid">
                請輸入有效的電子郵件
              </Form.Control.Feedback>
            </InputGroup>

            <Form.Label style={{fontSize: "20px",marginTop: "10px"}}>密碼</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicPassword"><FaUserLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="請輸入超過8位數"
                required
                ref={RegisterPassword}

              />
            </InputGroup>

            <Form.Label style={{fontSize: "20px",marginTop: "10px"}}>確認密碼</Form.Label>
            <InputGroup>
              <InputGroup.Text controlId="formBasicConfirmedPassword"><FaLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirmed Password"
                ref={RegisterConfPassword}

              />
            </InputGroup>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="info" onClick={handleRegister} ref={registerButtonRef}>
                提交
              </Button>
              <Button onClick={handleBackToLogin}>
                返回登入 <PiSignOutFill size={18} />
              </Button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>

      {/* 註冊成功畫面 */}
      <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} centered className="custom-modal">
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* 圓圈 */}
              <FaRegCircle style={{ fontSize: '80px', color: '#79FF79' }} />
              {/* 勾 */}
              <div style={{
                position: 'absolute', // 讓勾能夠被放置在圓圈內
                top: '50%', // 縱向居中
                left: '50%', // 橫向居中
                transform: 'translate(-50%, -50%)', // 將勾放置在圓圈中心
              }}>
                <TiTickOutline style={{ color: '#79FF79', fontSize: '60px' }} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>註冊成功</h2>
          </div>
          <div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <h5>郵件已發送</h5></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>請查看email，如果沒有收到，請點擊按鈕重新發送驗證郵件</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              {countdown > 0 ? (
                <Button variant="success" disabled={isButtonDisabled}>重新發送({countdown})</Button>
              ) : (
                <Button variant="success" onClick={handleResendVerification}>重新發送驗證郵件</Button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showLogoutMessage} onHide={() => setShowLogoutMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>已登出</Modal.Title>
        </Modal.Header>
        <Modal.Body>為確保您的帳戶安全，已將您的帳戶自動登出</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutMessage(false)}>關閉</Button>
        </Modal.Footer>
      </Modal>
    </IsLoggedInContext.Provider>
  );
}



export default App;

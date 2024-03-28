import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./homepage/homepage";
import Findcase from "./Components/Findcase";
import Findman from "./Components/Findman";
import Member from "../src/RatingPage/RatingPage";
import ProjectForm from "./Components/page/Member/ProjectForm";
import { Link, Routes, Route } from "react-router-dom";
import ourLogo from "./homepage/ourLogo.jpg";
import Serve from "./Components/Serve";
import Talent from "./Components/Talent";
import Switch from "../src/Components/page/Member/Switch";
import Fix from "./Components/page/Member/fix";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import Softdesign from "./Components/softdesign"
import Word from "./Components/word";
import Pro from "./Components/pro";
import program from "./Components/program"
import Program from "./Components/program";
import casecontext from "./Components/CaseContext"
import CaseContext from "./Components/CaseContext";
import MainScreen from "./accept/MainScreen";
import MainScreen2 from "./release/MainScreen";


function App() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [color, setColor] = useState("silver");
  const [color2, setColor2] = useState("silver");
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
        "http://localhost/PHP/Allend/backend/public/api/register",
        {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }
      );
      if(res.data.message !== '輸入資料格式有誤或是電子郵件已被註冊!'){
      await loginUser(email, password);}
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };



  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost/PHP/Allend/backend/public/api/login",
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
      url: "http://localhost/PHP/Allend/backend/public/api/login",
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
      url: "http://localhost/PHP/Allend/backend/public/api/forgetpwd",
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
  const handleClick = () => {
    setColor(color === "red" ? "blue" : "red");
  };
  const handleClick2 = () => {
    setColor2(color2 === "red" ? "blue" : "red");
  };








  return (
    <>
      <div
        className="p-1 bg-info"
        style={{ display: "flex", alignItems: "center", height: 50 }}
      >
        <Link to="/">
          <img style={{ width: 50 }} src={ourLogo} alt="" />
        </Link>
        <span style={{ marginLeft: 10 }}>包您滿意</span>
        <div
          className="search-container"
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <input type="text" placeholder="Search.." />
          <Button type="submit">
            <i className="fa fa-search"></i>
          </Button>
          {isLoggedIn ? ( // Check if user is logged in
            <Button onClick={handleLogout}>登出</Button>
          ) : (
            <Button onClick={handleShow}>登入/註冊</Button>
          )}
        </div>
      </div>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Nav.Link
                href="/findcase"
                style={{ backgroundColor: color }}
                onClick={handleClick}
                className="nav-link active"
              >
                我要接案
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link
                href="/findman"
                style={{ backgroundColor: color2 }}
                onClick={handleClick2}
                className="nav-link"
              >
                我要找人
              </Nav.Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Nav.Link
                href="/ProjectForm"
                style={{ backgroundColor: color2 }}
                onClick={handleClick2}
                className="nav-link"
              >
                發案
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link
                href="/member"
                style={{ backgroundColor: color }}
                onClick={handleClick}
                className="nav-link active"
              >
                Email
              </Nav.Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/findcase" element={<Findcase></Findcase>}></Route>
        <Route path="/findman" element={<Findman></Findman>}></Route>
        <Route path="/ProjectForm" element={<ProjectForm></ProjectForm>}></Route>
        <Route path="/serve" element={<Serve></Serve>}></Route>
        <Route path="/talent" element={<Talent></Talent>}></Route>
        <Route path="/switch" element={<Switch></Switch>}></Route>
        <Route path="/member" element={<Member></Member>}></Route>
        <Route path="/fix" element={<Fix></Fix>}></Route>
        <Route path="/softdesign" element={<Softdesign></Softdesign>}></Route>
        <Route path="/word" element={<Word></Word>}></Route>
        <Route path="/pro" element={<Pro></Pro>}></Route>
        <Route path="/program" element={<Program></Program>}></Route>
        <Route path="/casecontext" element={<CaseContext></CaseContext>}></Route>
        <Route path="/service" element={<MainScreen></MainScreen>}></Route>
        <Route path="/commit" element={<MainScreen2></MainScreen2>}></Route>
      </Routes>

      {/* 登入 */}
      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <div className="row justify-content-center w-100">
            <div className="col text-center">
              <Modal.Title>會員中心</Modal.Title>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="container row">
              <div className="col-6">
                <div className="row ">
                  <div className="col-sm-12 ">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>帳號</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        ref={LoginName}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-sm-12">
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>密碼</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={LoginPassword}
                      />
                      <Form.Text>
                        <a href="/forgot-password" onClick={toForgotPassword}>
                          忘記密碼?
                        </a>
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 d-flex justify-content-center">
                <Button onClick={handleLogin} id="login" style={{}}>
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
          <Modal.Title>忘記密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formForgotPasswordEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={ForgetName}
              />
            </Form.Group>
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
          <Modal.Title>註冊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>帳號</Form.Label>
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

            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={RegisterPassword}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmedPassword">
              <Form.Label>確認密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmed Password"
                ref={RegisterConfPassword}
              />
            </Form.Group>
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

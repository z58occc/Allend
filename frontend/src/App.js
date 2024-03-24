
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './homepage/homepage';
import Findcase from './Components/Findcase';
import Findman from './Components/Findman';
import Member from '../src/RatingPage/RatingPage';
import ProjectForm from './Components/page/Member/ProjectForm';
import { Link, Routes, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ourLogo from './homepage/ourLogo.jpg';
import Serve from './Components/Serve';
import Talent from './Components/Talent'
import Email from './Components/page/Member/email';
import Fix from './Components/page/Member/fix';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';









function App() {
  const [color, setColor] = useState('silver');
  const [color2, setColor2] = useState('silver');
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  const handleClose = () => setShowLogin(false);
  const handleShow = () =>
    setShowLogin(true);


  const handleForgotPassword = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgotPassword(false);
    setShowRegister(true);

  }

  const handleClick = () => {
    setColor(color === 'red' ? 'blue' : 'red');
  };
  const handleClick2 = () => {
    setColor2(color2 === 'red' ? 'blue' : 'red');
  };



  return (

    <div>
      <div className="p-1 bg-info" style={{ display: 'flex', alignItems: 'center', height: 50 }}>
        <Link to="/">
          <img style={{ width: 50 }} src={ourLogo} alt='' />
        </Link>
        <span style={{ marginLeft: 10 }}>包您滿意</span>
        <div className="search-container" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Search.." />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
          <Button onClick={handleShow}>登入/註冊</Button>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm" >
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item" >
              <Nav.Link href='/findcase' style={{ backgroundColor: color }} onClick={handleClick} className="nav-link active" >
                我要接案
              </Nav.Link>
            </li>
            <li className="nav-item" >
              <Nav.Link href='/findman' style={{ backgroundColor: color2 }} onClick={handleClick2} className="nav-link" >
                我要找人
              </Nav.Link>
            </li>
          </ul>
          <ul className="navbar-nav">

            <li className="nav-item">
              <Nav.Link href='/ProjectForm' style={{ backgroundColor: color2 }} onClick={handleClick2} className="nav-link">發案</Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link href='/member' style={{ backgroundColor: color }} onClick={handleClick} className="nav-link active"  >Email</Nav.Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/findcase' element={<Findcase></Findcase>}></Route>
        <Route path='/findman' element={<Findman></Findman>}></Route>
        <Route path='/ProjectForm' element={<ProjectForm></ProjectForm>}></Route>
        <Route path='/serve' element={<Serve></Serve>}></Route>
        <Route path='/talent' element={<Talent></Talent>}></Route>
        <Route path='/email' element={<Email></Email>}></Route>
        <Route path='/member' element={<Member></Member>}></Route>
        <Route path='/fix' element={<Fix></Fix>}></Route>
      </Routes>

      <Modal show={showLogin} onHide={handleClose} centered>

        <Modal.Header closeButton>
          <div className="row justify-content-center w-100">
            <div className="col text-center">
              <Modal.Title>會員中心</Modal.Title>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          {/* Your login form goes here */}
          <Form>
            <div className="row">
              <div className="col-sm-6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>帳號</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </div>

              <div className="col-sm-6  d-flex align-items-center justify-content-center" >
                <Button type="submit" className="d-block mx-auto">
                  <img style={{ width: 130 }} src={ourLogo} alt='' />
                </Button>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text>
                      <a href="/forgot-password" onClick={handleForgotPassword}>忘記密碼?</a>
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>

            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer >
          <Form.Text>
            <a href="/Register" onClick={handleRegister}>立即註冊</a>
          </Form.Text>
        </Modal.Footer>
      </Modal>

      <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>忘記密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your Forgot Password form here */}
          <Form>
            <Form.Group controlId="formForgotPasswordEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              送出
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>註冊</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Form fields */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>帳號</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>密碼</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <br />
            {/* Additional form fields... */}
            <Button variant="info" type="submit">
              提交
            </Button>
          </Form>
        </Modal.Body>

      </Modal>



    </div>
  )
}

export default App;
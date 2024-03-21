import logo from './logo.svg';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './homepage/homepage';
import Findcase from './Components/Findcase';
import Findman from './Components/Findman';
import Member from './Components/page/Member/email';

import ProjectForm from './Components/page/Member/ProjectForm';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import { Login } from './Components/Login/Login';

import { RegisterForm } from './Components/RegisterForm/RegisterForm';
import { FreelancerForm } from './Components/page/Member/Receiver information';
import { Forgot } from './Components/Forgot/Forgot';

import { Container } from 'react-bootstrap';
import { Link, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import ourLogo from './homepage/ourLogo.jpg';




function App() {
  const [color, setColor] = useState('red');
  const [color2, setColor2] = useState('red');

  const handleClick = () => {
    setColor(color === 'red' ? 'blue' : 'red');
  };
  const handleClick2 = () => {
    setColor2(color2 === 'red' ? 'blue' : 'red');
  };
  return (

    <div >
    <div className="p-1 bg-primary" style={{ height: 50 }}  >
      <Link to="/">
        <img style={{ width: 50 }} src={ourLogo} />
      </Link>
      <span>包您滿意</span>
      <div className="search-container" >
        <input type="text" placeholder="Search.." />
        <button type="submit">
          <i className="fa fa-search" />
        </button>
        <button>登入/註冊</button>
      </div>
    </div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
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

        <li>
          <Nav.Link href='/ProjectForm' style={{ backgroundColor: color2, float: 'right' }} onClick={handleClick2} className="nav-link">發案</Nav.Link>


          <Nav.Link href='/email' style={{ backgroundColor: color, float: 'right' }} onClick={handleClick} className="nav-link active"  >email</Nav.Link>
        </li>

      </div>

    </nav>

      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/findcase' element={<Findcase></Findcase>}></Route>
        <Route path='/findman' element={<Findman></Findman>}></Route>
        <Route path='/email' element={<Member></Member>}></Route>
      
        <Route path='/ProjectForm' element={<ProjectForm></ProjectForm>}></Route>
      </Routes>
    </div>
  )
}

export default App;
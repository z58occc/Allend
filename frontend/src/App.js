
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



function App() {
  const [color, setColor] = useState('darkcyan');
  const [color2, setColor2] = useState('darkcyan');

  const handleClick = () => {
    setColor(color === 'red' ? 'blue' : 'red');
  };
  const handleClick2 = () => {
    setColor2(color2 === 'red' ? 'blue' : 'red');
  };
  return (

    <div >
    <div className="p-1 bg-info" style={{ height: 50 }}  >
      <Link to="/">
        <img style={{ width: 50 }} src={ourLogo} alt=''/>
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

        <ul>
          <Nav.Link href='/ProjectForm' style={{ backgroundColor: color2, float: 'right' }} onClick={handleClick2} className="nav-link">發案</Nav.Link>


          <Nav.Link href='/member' style={{ backgroundColor: color, float: 'right' }} onClick={handleClick} className="nav-link active"  >Email</Nav.Link>
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
    </div>
  )
}

export default App;
import logo from '../logo.svg';
import '../../src/App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';

import { FaHtml5 } from "react-icons/fa";
import violence from '../homepage/violence.jpg';
import { Route, Routes, Link } from 'react-router-dom';
import Findcase from '../Components/Findcase';


function Homepage() {

  return (
    < div className=" noto-serif container  "  >
      <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  .fakeimg {\n    height: 100px;\n    background: #aaa;\n  }\n  "
          }}
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

      </div>


      <div className="container mt-5">
        <div className="row">

          <div className="col-sm-2 ">
            <Link to='/findman' >
              <div className="fakeimg">Fake Image</div>
            </Link>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-2 ">
            <Link to='/findman' >
              <div className="fakeimg">Fake Image</div>
            </Link>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-2 ">
            <Link to='/findman' >
              <div className="fakeimg">Fake Image</div>
            </Link>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-2 ">
            <Link to='/findman' >
              <div className="fakeimg">Fake Image</div>
            </Link>
            <hr className="d-sm-none" />
          </div>
          <div className="col-sm-2 ">
            <Link to='/findman' >
              <div className="fakeimg">Fake Image</div>
            </Link>
            <hr className="d-sm-none" />
          </div>




        </div>
      </div>
      <br></br>


      <div className='fakeimg mt-5'>新手教學?</div>
      {/* 最新服務 */}
      <div className="row mt-5">
        <p>最新服務:</p>
        <div className="col-sm-4 ">
          <div className="card" >
            <div className="card-header"><img src={violence} style={{ width: 200 }}></img></div>
            <div className="card-body">
              揍你一拳
              <br></br>
              $1000/拳
              <hr></hr>
              接案人名稱:林一拳
            </div>
            <div className="card-footer " style={{ justifyContent: 'end' }}>2024/03/18</div>
          </div>
        </div>
        <Link to='./serve' className="col-sm-4 ">
          <div class="card">
            <div class="card-header">Header</div>
            <div class="card-body">Content</div>
            <div class="card-footer">Footer</div>
          </div>
        </Link>
        <Link to='./serve' className="col-sm-4 ">
          <div class="card">
            <div class="card-header">Header</div>
            <div class="card-body">Content</div>
            <div class="card-footer">Footer</div>
          </div>
        </Link>

        {/* 先用col-sm-4包起來 裡面再用card不然會有奇怪的border線 */}



      </div>

      <br></br>
      {/* 最新刊登 */}
      <div className='row mt-5'>
        <p>最新刊登:</p>
        <Link to="./casecontext" className='col-sm-4'>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">Toast Header</strong>
            </div>
            <div class="toast-body">
              <p>Some text inside the toast body</p>
            </div>
          </div>
        </Link>
        <Link to="./casecontext" className='col-sm-4'>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">Toast Header</strong>
            </div>
            <div class="toast-body">
              <p>Some text inside the toast body</p>
            </div>
          </div>
        </Link>
        <Link to="./casecontext" className='col-sm-4'>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">Toast Header</strong>
            </div>
            <div class="toast-body">
              <p>Some text inside the toast body</p>
            </div>
          </div>
        </Link>



      </div>
      <Carousel className='mt-5 bg-primary'>
        <Carousel.Item>
          <img src={logo} text="First slide" />
          <Carousel.Caption>
            <Link to='./talent'>
              <h3>會員名稱</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={logo} text="Second slide" />
          <Carousel.Caption>
            <Link to='./talent'>
              <h3>會員名稱</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={logo} text="Third slide" />
          <Carousel.Caption>
            <Link to='./talent'>
              <h3>會員名稱</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      <Footer></Footer>

    </ div>
  )
}

export default Homepage;

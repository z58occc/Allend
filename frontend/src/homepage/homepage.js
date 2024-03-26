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
import Category from '../Components/Category';
import luanguage from '../Components/img/language.png'
import softdesign from '../Components/img/softdesign.png'
import writing from '../Components/img/writing.png'
import cow from '../Components/img/cow.jpg'
import beauty from '../Components/img/beauty.jpg'
import product from '../Components/img/product.jfif'


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

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

      </div>


      <Category></Category>
      <br></br>


      <div className=' mt-5'>新手教學</div>
      {/* 最新服務 */}
      <div className="row mt-5">
        <p>最新服務:</p>
        <div className="col-sm-4 " >
          <Link to='./serve' className="card" style={{width:"75%",fontSize:"10px"}} >
            <div className="card-header">
              <img src={writing} style={{ width: "100%" }}></img>
            </div>
            <div className="card-body">
              文案寫作
              <br></br>
              $1000/件
              <hr></hr>
              接案人名稱:林*拳
            </div>
            <div className="card-footer " style={{ justifyContent: 'end' }}>2024/03/18</div>
          </Link>
        </div>
        <Link to='./serve' className="col-sm-4 ">
          <div class="card" style={{width:"75%",fontSize:"10px"}}>
            <div class="card-header">
              <img src={luanguage} style={{ width: "100%" }}></img>
            </div>
            <div class="card-body">
              文字翻譯
              <br></br>
              $500/件
              <hr></hr>
              接案人名稱:朱*恆
            </div>
            <div class="card-footer">2024/03/26</div>
          </div>
        </Link>
        <Link to='./serve' className="col-sm-4 ">
          <div class="card" style={{width:"75%",fontSize:"10px"}}>
            <div class="card-header">
              <img src={softdesign} style={{ width: "100%" }}></img>
            </div>
            <div class="card-body">
              軟體設計
              <br></br>
              $1000/件
              <hr></hr>
              接案人名稱:李*林
            </div>
            <div class="card-footer">
              2024/03/26
            </div>
          </div>
        </Link>

        {/* 先用col-sm-4包起來 裡面再用card不然會有奇怪的border線 */}



      </div>

      <br></br>
      {/* 最新刊登 */}
      <div className='row mt-5'>
        <p>最新刊登:</p>
        <Link to="./casecontext" className='col-sm-4'style={{width:"30%"}}>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">
                網站架設人員
                <br></br>
                預算:$30000/月
              </strong>
              <span style={{ float: 'right' }}>短期</span>
            </div>
            <div class="toast-body">
              <p>
                刊登日期:2024/03/26
                <br></br>
                地點:高雄
                <hr></hr>
                1人報價中
              </p>
            </div>
          </div>
        </Link>
        <Link to="./casecontext" className='col-sm-4' style={{width:"30%"}}>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">
                影片字幕聽打
                <br></br>
                預算:$1000/件
              </strong>
              <span style={{ float: 'right' }}>長期</span>
            </div>
            <div class="toast-body">
              <p>
                刊登日期:2024/03/26
                <br></br>
                地點:台北
                <hr></hr>
                1人報價中
              </p>
            </div>
          </div>
        </Link>
        <Link to="./casecontext" className='col-sm-4' style={{width:"30%"}}>
          <div class="toast show ">
            <div class="toast-header">
              <strong class="me-auto">
                英文翻譯人員
                <br></br>
                預算:$30000/月
              </strong>
              <span style={{ float: 'right' }}>長期</span>
            </div>
            <div class="toast-body">
              <p>
                刊登日期:2024/03/26
                <br></br>
                地點:
                <hr></hr>
                1人報價中
              </p>
            </div>
          </div>
        </Link>




      </div>
      <Carousel className='mt-5 'style={{ width: "50%" }}>
        <Carousel.Item >
          <img src={product}  text="First slide" />
          <Carousel.Caption>
            <Link to='./talent'>
              <h3>會員名稱</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={cow}  text="Second slide" />
          <Carousel.Caption>
            <Link to='./talent'>
              <h3>會員名稱</h3>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={beauty}  text="Third slide" />
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

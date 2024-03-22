import React from 'react'

import Footer from '../homepage/Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoTriangleDown } from "react-icons/go";
import Category from './Category';
import NextPage from '../homepage/NextPage';
import Orderbuttom from '../homepage/Orderbuttom';
import '../../src/App.css';
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';


function Findcase() {
    return (

        <div className='container'>
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
            {/* 案件類別 */}
            <Category></Category>
            <br></br>

            {/* 下拉選單 */}
            <div style={{ display: 'flex' }}>
                <Dropdown >
                    <Dropdown.Toggle id="dropdown-basic">
                        地區
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className='mx-5'>
                    <Dropdown.Toggle id="dropdown-basic">
                        案件金額
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <hr></hr>
            {/* 左上4顆按鈕 */}
            <div style={{ borderBottom: 'solid' }}>
                <button>全部案件</button>
                <button>短期案件</button>
                <button>長期案件</button>
                <button>已結案</button>
            </div>
            {/* 右下4顆按鈕 */}
            <div style={{ borderBottom: 'solid', textAlign: 'end' }}>
                <button>最近更新<GoTriangleDown /></button>
                <button>最新刊登<GoTriangleDown /></button>
                <button>預算金額<GoTriangleDown /></button>
                <button>提案人數<GoTriangleDown /></button>
            </div>

            {/* 案件 */}
            <div className='row'>
                <Link to='/casecontext' className='col-sm-2' style={{ border: 'solid' }}>
                    案件名稱<br></br>
                    案件類別<br></br>
                    預算<br></br>
                    地點:<br></br>
                    案件期程:<br></br>
                    5分鐘前更新<br></br>
                </Link>
                <div className='position-relative col-sm-10' style={{ border: 'solid' }}>
                    案件說明
                    <div className='position-absolute bottom-0 end-0'>
                        <Orderbuttom ></Orderbuttom>
                    </div>
                </div>

            </div>
            <div className='row'>
                <Link to='/casecontext' className='col-sm-2' style={{ border: 'solid' }}>
                    案件名稱<br></br>
                    案件類別<br></br>
                    預算<br></br>
                    地點:<br></br>
                    案件期程:<br></br>
                    5分鐘前更新<br></br>
                </Link>
                <div className='position-relative col-sm-10' style={{ border: 'solid' }}>
                    案件說明
                    <div className='position-absolute bottom-0 end-0'>
                        <Orderbuttom ></Orderbuttom>
                    </div>
                </div>

            </div>
            <div className='row'>
                <Link to='/casecontext' className='col-sm-2' style={{ border: 'solid' }}>
                    案件名稱<br></br>
                    案件類別<br></br>
                    預算<br></br>
                    地點:<br></br>
                    案件期程:<br></br>
                    5分鐘前更新<br></br>
                </Link>
                <div className='position-relative col-sm-10' style={{ border: 'solid' }}>
                    案件說明
                    <div className='position-absolute bottom-0 end-0'>
                        <Orderbuttom ></Orderbuttom>
                    </div>
                </div>

            </div>
           
            

            <br></br>

            {/* 頁碼 */}
            <NextPage></NextPage>

            <Footer></Footer>
        </div>
    )
}

export default Findcase
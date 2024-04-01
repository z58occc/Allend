import React, { useState, useEffect } from 'react';

import Footer from '../homepage/Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoTriangleDown } from "react-icons/go";
import Category from './Category';
import NextPage from '../homepage/NextPage';
import Orderbuttom from '../homepage/Orderbuttom';
import '../../src/App.css';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import a1 from "../Components/img/a1.png"
import a2 from "../Components/img/a2.png"
import a4 from "../Components/img/a4.png"
import a5 from "../Components/img/a5.png"
import a6 from "../Components/img/a6.png"



function Findcase() {

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);

    // const fetchData = async (t) => {
    //     let url = 'http://localhost/Allend/backend/public/api/findcase?type=';
    //     if (t === "網站設計") {
    //         url += "網站設計"
    //     } else if (t === "軟體程式") {
    //         url += "軟體程式"
    //     }
    //     const response = (await fetch(url)).json();
    //     setPosts(response);
    //     console.log(posts);

    // }
    // useEffect(() => {
    //     fetch('http://localhost/Allend/backend/public/api/findcase/{d_type}')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             // console.log(data.service);

    //             // const result;
    //             // for (let i = 0; i < 9; i++) {
    //             //   data.service[i].image = data.project[i]["image"]

    //             // }



    //             // console.log(data.service)
    //             setPosts(data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

    function useFetch1() {
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            fetch('http://localhost/Allend/backend/public/api/findcase/1')
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPosts(data)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, [])
    }

    return (
        <>
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


                {/* 分類按鈕 */}
                <div style={{ marginLeft: '60px', marginRight: '0' }}>

                    <div className="container mt-5">
                        <div className="row justify-content-center">

                            <div className="col-2">
                                <Link to='/findcase' onClick={useFetch1} >
                                    <div >網站設計</div>
                                    <img src={a1} style={{ width: '60px' }}></img>
                                </Link>
                                <hr className="d-sm-none" />
                            </div>
                            <div className="col-2">
                                <Link to='/findcase' onClick={
                                    useEffect(() => {
                                        fetch('http://localhost/Allend/backend/public/api/findcase/2')
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                setPosts(data)
                                            })
                                            .catch((err) => {
                                                console.log(err.message);
                                            });
                                    }, [])} >
                                    <div >軟體程式</div>
                                    <img src={a2} style={{ width: '60px' }}></img>
                                </Link>
                                <hr className="d-sm-none" />
                            </div>
                            <div className="col-2">
                                <Link to='/findcase' onClick={
                                    useEffect(() => {
                                        fetch('http://localhost/Allend/backend/public/api/findcase/3')
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                setPosts(data)
                                            })
                                            .catch((err) => {
                                                console.log(err.message);
                                            });
                                    }, [])} >
                                    <div >平面設計</div>
                                    <img src={a5} style={{ width: '60px' }}></img>
                                </Link>
                                <hr className="d-sm-none" />
                            </div>
                            <div className="col-2">
                                <Link to='/findcase' onClick={
                                    useEffect(() => {
                                        fetch('http://localhost/Allend/backend/public/api/findcase/4')
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                setPosts(data)
                                            })
                                            .catch((err) => {
                                                console.log(err.message);
                                            });
                                    }, [])} >
                                    <div >文字語言</div>
                                    <img src={a4} style={{ width: '60px' }}></img>
                                </Link>
                                <hr className="d-sm-none" />
                            </div>
                            <div className="col-2">
                                <Link to='/findcase' onClick={
                                    useEffect(() => {
                                        fetch('http://localhost/Allend/backend/public/api/findcase/5')
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log(data);
                                                setPosts(data)
                                            })
                                            .catch((err) => {
                                                console.log(err.message);
                                            });
                                    }, [])} >
                                    <div >專業諮詢</div>
                                    <img src={a6} style={{ width: '60px' }}></img>
                                </Link>
                                <hr className="d-sm-none" />
                            </div>


                        </div>
                    </div>
                </div>
                {/* 分類按鈕 */}


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
                            <Dropdown.Item href="#/action-1">5000以下</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5001~1萬</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">1萬~5萬</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">5萬~10萬</Dropdown.Item>
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



                {/* 案件欄位 */}
                <div >
                    {/* {posts.map((post, index) => {
                        return (
                            // <div key={index}>
                            //     {post.type == "網站設計" ?
                            //         <div className='row' key={index}>
                            //             <Link to='/casecontext' className='col-sm-2' style={{ border: 'solid black', textDecoration: "none", color: "black" }}>
                            //                 {post.d_name}<br></br>
                            //                 案件類別:{post.type}<br></br>
                            //                 預算:${post.d_amount}/{post.d_unit}<br></br>
                            //                 地點:{post.country_city}<br></br>
                            //                 {post.d_duration}期<br></br>
                            //                 {post.updated_at}<br></br>
                            //             </Link>
                            //             <div className='position-relative col-sm-10' style={{ border: 'solid' }}>
                            //                 {post.d_description}
                            //                 <div className='position-absolute bottom-0 end-0'>
                            //                     <Orderbuttom ></Orderbuttom>
                            //                 </div>
                            //             </div>
                            //         </div>
                            //         : ""}
                            // </div>

                        )
                    })} */}


                </div>

                {/* 案件欄位 */}









                <br></br>

                {/* 頁碼 */}
                <NextPage></NextPage>
            </div >
            <Footer></Footer>
        </>
    )
}

export default Findcase
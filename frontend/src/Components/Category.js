import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import a1 from "../Components/img/a1.png"
import a2 from "../Components/img/a2.png"
import a4 from "../Components/img/a4.png"
import a5 from "../Components/img/a5.png"
import a6 from "../Components/img/a6.png"
import styles from './category.module.css'

function Category() {
    const [posts, setPosts] = useState([]);

    // const url = window.location.href;
    // console.log(url);
    // const type = new URL(url);
    // console.log(type);
    // console.log(type.pathname);
    const url = "http://localhost/Allend/backend/public/api/findcase?type="
    const href = window.location.href
    const type = new URL(href);
    if (type.pathname == "/findcase") {
        // fetchData();
    }

    // switch (type.pathname) {
    //     case "/":
    //         break;
    //     case "/findcase":
    //         fetchData();
    //         break;

    // }
    // const fetchData = async (type) => {
    //     let url = "http://localhost/Allend/backend/public/api/findcase?type=";
    //     switch (type) {
    //         case "網站設計":
    //             url += "1";
    //             break;
    //         case "軟體程式":
    //             url += "2";
    //             break;
    //         case "平面設計":
    //             url += "3";
    //             break;
    //         case "文字語言":
    //             url += "4";
    //             break;
    //         case "專業諮詢":
    //             url += "5";
    //             break;
    //         default:
    //             break;


    //     }

    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setPosts(data);
    //         })
    // }
    return (


        <div style={{ marginLeft: '60px', marginRight: '0' }}>

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-2 text-center">
                    <Link to={`/findman/1`} style={{backgroundcolor: "#66B3FF", border: "null"}}  className={`${styles.categorylink}`}>
                            <div >網站設計</div>
                            <img src={a1} style={{ width: '60px' }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center">
                        <Link to={`/findman/2`} className={`${styles.categorylink}`}>
                            <div >軟體程式</div>
                            <img src={a2} style={{ width: '60px' }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center ">
                        <Link to={`/findman/3`} className={`${styles.categorylink}`}>
                            <div >平面設計</div>
                            <img src={a5} style={{ width: '60px' }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center">
                        <Link to={`/findman/4`} className={`${styles.categorylink}`}>
                            <div >文字語言</div>
                            <img src={a4} style={{ width: '60px'}}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className={`col-2 text-center ${styles.catrgorycontainer}`}>
                        <Link to={`/findman/5`} className={` ${styles.categorylink}`}>
                            <div>專業諮詢</div>
                            <img src={a6} style={{ width: '60px'}}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category
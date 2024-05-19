import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import a1 from "../Components/img/a1.png";
import a2 from "../Components/img/a2.png";
import a4 from "../Components/img/a4.png";
import a5 from "../Components/img/a5.png";
import a6 from "../Components/img/a6.png";
import styles from './category.module.css'


function Category2({type}) {
    const [changecolor1, setChangecolor1] = useState(false);
    const [changecolor2, setChangecolor2] = useState(false);
    const [changecolor3, setChangecolor3] = useState(false);
    const [changecolor4, setChangecolor4] = useState(false);
    const [changecolor5, setChangecolor5] = useState(false);
    console.log(type);
    console.log(1);
    const chagecolorOff = async () => {
        setChangecolor1(false);
        setChangecolor2(false);
        setChangecolor3(false);
        setChangecolor4(false);
        setChangecolor5(false);
    }
    useEffect(() => {
        chagecolorOff();
        switch (type) {
            case "1":
                setChangecolor1(true)
                break;
            case "2":
                setChangecolor2(true)
                break;
            case "3":
                setChangecolor3(true)
                break;
            case "4":
                setChangecolor4(true)
                break;
            case "5":
                setChangecolor5(true)
                break;

            default:
                break;
        }
    }, [type])
    return (


        <div style={{ marginLeft: '60px', marginRight: '0' }}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-2 text-center ">
                        <Link to={`/findman/1`} style={{ backgroundcolor: "#66B3FF", border: "null" }} className={`${styles.categorylink}`}>
                            <div >網站設計</div>
                            <img src={a1} style={{ width: '60px',opacity: (changecolor1 == true ? 0.4 : "") }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center">
                        <Link to={`/findman/2`} className={`${styles.categorylink}`}>
                            <div >軟體程式</div>
                            <img src={a2} style={{ width: '60px',opacity: (changecolor2 == true ? 0.4 : "") }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center ">
                        <Link to={`/findman/3`} className={`${styles.categorylink}`}>
                            <div >平面設計</div>
                            <img src={a5} style={{ width: '60px',opacity: (changecolor3 == true ? 0.4 : "") }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-2 text-center">
                        <Link to={`/findman/4`} className={`${styles.categorylink}`}>
                            <div >文字語言</div>
                            <img src={a4} style={{ width: '60px',opacity: (changecolor4 == true ? 0.4 : "") }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className={`col-2 text-center ${styles.catrgorycontainer}`}>
                        <Link to={`/findman/5`} className={` ${styles.categorylink}`}>
                            <div>專業諮詢</div>
                            <img src={a6} style={{ width: '60px',opacity: (changecolor5 == true ? 0.4 : "") }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category2
import React from 'react';
import { Link } from 'react-router-dom';
import a1 from "../Components/img/a1.png";
import a2 from "../Components/img/a2.png";
import a4 from "../Components/img/a4.png";
import a5 from "../Components/img/a5.png";
import a6 from "../Components/img/a6.png";
import styles from './category.module.css'


function Category2() {
    return (


        <div style={{ marginLeft: '60px', marginRight: '0' }}>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div className="col-2 text-center ">
                    <Link to={`/findman/1`}className={`${styles.categorylink}`}>
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
                        <Link to={`/findman/5`} className={` d-inline-block align-items-center text-cener ${styles.categorylink}`}>
                            <div>專業諮詢
                            <img src={a6} style={{ width: '75%', display:'block', margin: '0 auto' }}></img></div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category2
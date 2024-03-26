import React from 'react'
import { Link } from 'react-router-dom'
import webdesign from './webdesign.jpg'
import { TbWorldWww } from "react-icons/tb";



function Category() {
   
    
    return (


        <div>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div  className="col-sm-2 ">
                        <Link to='/findman' >
                            <img src={webdesign} style={{width:'100px'}}></img>
                            <div >網站設計</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">軟體程式</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">文字語言</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">專業諮詢</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div className="fakeimg">程式設計</div>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category
import React from 'react'
import { Link } from 'react-router-dom'
import { LuLanguages } from "react-icons/lu";
import { SiWebmoney } from "react-icons/si";
import { RiMiniProgramFill } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { FcAssistant } from "react-icons/fc";
import a1 from "../Components/img/a1.png"
import a2 from "../Components/img/a2.png"
import a3 from "../Components/img/a3.png"
import a4 from "../Components/img/a4.png"
import a5 from "../Components/img/a5.png"
import a6 from "../Components/img/a6.png"

function Category2() {


    return (


        <div>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div className="col-sm-2 ">
                        <Link to='/findman' >
                            <div >網站設計</div>
                            <img src={a1} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/softdesign' >
                            <div >軟體程式</div>
                            <img src={a2} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/word' >
                            <div >文字語言</div>
                            <img src={a5} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/pro' >
                            <div >專業諮詢</div>
                            <img src={a4} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/program' >
                            <div >程式設計</div>
                            <img src={a6} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category2
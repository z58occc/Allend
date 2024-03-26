import React from 'react'
import { Link } from 'react-router-dom'
import { LuLanguages } from "react-icons/lu";
import { SiWebmoney } from "react-icons/si";
import { RiMiniProgramFill } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { FcAssistant } from "react-icons/fc";

function Category() {
   
    
    return (


        <div>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div  className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >網站設計</div>
                            <SiWebmoney size={50}></SiWebmoney>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >軟體程式</div>
                            <RiMiniProgramFill size={50}></RiMiniProgramFill>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >文字語言</div>
                            <LuLanguages size={50}></LuLanguages>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >專業諮詢</div>
                            <FcAssistant size={50}></FcAssistant>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >程式設計</div>
                            <MdOutlineDesignServices size={50}></MdOutlineDesignServices>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category
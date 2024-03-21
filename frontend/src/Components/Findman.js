import React from 'react'
import Footer from '../homepage/Footer';
import Category from './Category'
import { GoTriangleDown } from "react-icons/go";
import NextPage from '../homepage/NextPage';

function Findman() {
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
            <Category></Category>
            <hr></hr>
            <div className='row'>

                {/* 左邊 */}
                <div className='col-sm-2'>
                    <div style={{ border: 'solid' }}>
                        接案人專長
                        <hr></hr>
                        <input type='checkbox'></input>平面設計<br></br>
                        <input type='checkbox'></input>軟體程式<br></br>
                        <input type='checkbox'></input>文字語言<br></br>
                        <input type='checkbox'></input>網站設計<br></br>
                        <input type='checkbox'></input>專業諮詢<br></br>
                    </div>
                    <br></br>
                    <div style={{ border: 'solid' }}>
                        接案人專長
                        <hr></hr>
                        <input type='checkbox'></input>平面設計<br></br>
                        <input type='checkbox'></input>軟體程式<br></br>
                        <input type='checkbox'></input>文字語言<br></br>
                        <input type='checkbox'></input>網站設計<br></br>
                        <input type='checkbox'></input>專業諮詢<br></br>
                    </div>
                    <br></br>
                    <div style={{ border: 'solid' }}>
                        接案人專長
                        <hr></hr>
                        <input type='checkbox'></input>平面設計<br></br>
                        <input type='checkbox'></input>軟體程式<br></br>
                        <input type='checkbox'></input>文字語言<br></br>
                        <input type='checkbox'></input>網站設計<br></br>
                        <input type='checkbox'></input>專業諮詢<br></br>
                    </div>
                    <br></br>
                    <div style={{ border: 'solid' }}>
                        接案人專長
                        <hr></hr>
                        <input type='checkbox'></input>平面設計<br></br>
                        <input type='checkbox'></input>軟體程式<br></br>
                        <input type='checkbox'></input>文字語言<br></br>
                        <input type='checkbox'></input>網站設計<br></br>
                        <input type='checkbox'></input>專業諮詢<br></br>
                    </div>
                    <br></br>
                </div>

                {/* 右邊 */}
                <div className='col-sm-10'>
                    <div style={{ textAlign: 'end' }}>
                        <button>最近更新<GoTriangleDown /></button>
                        <button>最新刊登<GoTriangleDown /></button>
                        <button>預算金額<GoTriangleDown /></button>
                        <button>提案人數<GoTriangleDown /></button>
                    </div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                        <div className="col-sm-4 card ">
                            <div className="card-header">Header</div>
                            <div className="card-body">Content</div>
                            <div className="card-footer">Footer</div>
                        </div>
                    </div>
                </div>
            </div>
            <NextPage></NextPage>
            <Footer></Footer>
        </div>
    )
}

export default Findman
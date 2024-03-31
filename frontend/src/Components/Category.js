import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import a1 from "../Components/img/a1.png"
import a2 from "../Components/img/a2.png"
import a3 from "../Components/img/a3.png"
import a4 from "../Components/img/a4.png"
import a5 from "../Components/img/a5.png"
import a6 from "../Components/img/a6.png"

function Category() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost/Allend/backend/public/api/findcase/{d_type}')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // console.log(data.service);

                // const result;
                // for (let i = 0; i < 9; i++) {
                // //   data.service[i].image = data.project[i]["image"]
                
                // }



                // console.log(data.service)
                // setPosts(data.service)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (


        <div style={{ marginLeft: '60px', marginRight: '0' }}>

            <div className="container mt-5">
                <div className="row justify-content-center">

                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >網站設計</div>
                            <img src={a1} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >軟體程式</div>
                            <img src={a2} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >文字語言</div>
                            <img src={a5} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2 ">
                        <Link to='/findcase' >
                            <div >專業諮詢</div>
                            <img src={a4} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-2">
                        <Link to='/findcase' >
                            <div >平面設計</div>
                            <img src={a6} style={{ width: 50 }}></img>
                        </Link>
                        <hr className="d-sm-none" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Category
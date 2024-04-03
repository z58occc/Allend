import React, { useState, useEffect, useRef } from "react";
import Footer from '../homepage/Footer'
import { VscAccount } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';





function CaseContext() {
    const [key, setkey] = useState(0);
    const [posts, setPosts] = useState([]);
    const [members, setMembers] = useState([]);
    const [service_star_avg, setServiceStarAvg] = useState([]);
    const url = window.location.href;
    const [endnumber,setEndnumber] = useState(0);
    

    // console.log(url);
    // debugger;
    // console.log(urlParameter, );
    async function fetchData(id) {
        console.log(id);
            fetch(`http://localhost/Allend/backend/public/api/demmand_content/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(data.dammand);
                    setPosts(data.dammand);
                    setMembers(data.members);
                    setServiceStarAvg(data.service_star_avg);
                })
        
    }
    const urlParameter = window.location.search;
    useEffect(() => {
        const id = urlParameter.replace("?", "");
        fetchData(id);
        // if (  ){
        //     console.log(456768687, endnumber);
        // }
    }, [urlParameter]);

    // const fetchData = async () => {
    //     fetch("http://localhost/Allend/backend/public/api/demmand_content/12")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             console.log(data.dammand);
    //             setPosts(data.dammand);
    //             setMembers(data.members);
    //             setServiceStarAvg(data.service_star_avg);
    //         })
    // }




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const redTextStyle = {
        color: 'red'
    };
    useEffect(() => {
        fetchData()
    }, []);

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

                <div className='row mt-5'>
                    <div className='col-sm-9' style={{ border: 'solid' }}>
                        案件編號:{posts.did}<br></br>
                        案件名稱:{posts.d_name}<br></br>
                        案件類別:{posts.d_type}<br></br>
                        {posts.updated_at}更新:<br></br>
                        <ul>
                            <li>預算金額:{posts.d_amount}/{posts.d_unit}</li>
                            <li>地點:{posts.d_active_location}</li>
                            <li>案件期程:{posts.d_duration}</li>
                            <li>案件說明:{posts.d_description}</li>
                        </ul>
                    </div>
                    <div className='col-sm-3' >
                        案主資訊
                        <hr></hr>
                        <VscAccount />
                        {members.avatar}
                        {members.name}
                        <br></br>
                        <Button onClick={handleShow} >我要報價</Button>
                        <br></br>
                        {service_star_avg}
                        <br></br>
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <br></br>
                        最後上線時間:{members.last_login}
                        <br></br>
                        <FaHeart style={{ color: 'red' }} />
                    </div>
                </div>

                <div className='mt-5'>
                    <span style={redTextStyle}>提醒:請勿在非公開場所赴約</span>
                </div>



                {/* 我要報價頁面 */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title style={{ fontSize: 15 }}>
                            案件名稱:<span>{posts.d_name}</span>
                            <hr></hr>
                            案件編號:<span>{posts.did}</span>
                            <hr></hr>
                            案件類別:<span>{posts.d_type}</span>
                            <hr></hr>
                            案件地點:<span>{posts.d_active_location}</span>
                            <hr></hr>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>報價金額</Form.Label>
                            <Form.Group
                                className="mb-3 d-flex"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Control
                                    style={{ width: "100px" }}
                                    type=""
                                    autoFocus
                                    value={posts.d_amount}
                                // ref={QuoteNumber}
                                ></Form.Control>
                                <span className="mt-2">{"/" + posts.d_unit}</span>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>接案人留言</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="請輸入訊息"
                                // ref={QuoteMessage}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            送出
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* 我要報價頁面 */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </div>
            <Footer></Footer>
        </>
    )
}

export default CaseContext
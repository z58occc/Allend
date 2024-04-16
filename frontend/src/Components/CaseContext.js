import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie";
import { IsLoggedInContext } from "../App";
import Footer from '../homepage/Footer'
import axios from 'axios';


function CaseContext() {
    const { isLoggedIn, setIsLoggedIn, handleShow } = useContext(IsLoggedInContext);

    const close = async () => {
        setShow(false);
        setMessagewarm(false);
        setAmountwarm(false);
    }
    const [messagewarm, setMessagewarm] = useState(false);
    const [amountwarm, setAmountwarm] = useState(false);

    // Modal下面 送資料回去
    const QuoteAmount = useRef();
    const QuoteMessage = useRef();

    // 送出報價
    const sendQuote = async (did, q_amount, q_message) => {
        try {
            fetch("http://localhost/Allend/backend/public/api/quote", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify({
                    did: did,
                    q_amount: q_amount,
                    q_message: q_message
                })
            })

        } catch (err) {
            console.log(err);
        }
    };


    const handleClose = async (d) => {
        const q_amount = QuoteAmount.current.value;
        const q_message = QuoteMessage.current.value;
        setShow(false);
        if (q_amount.length == 0 && q_message.length < 10) {
            setShow(true);
            setAmountwarm(true);
            setMessagewarm(true);
        } else if (q_amount.length == 0) {
            setAmountwarm(true);
            setShow(true);
        } else if (q_message.length < 10) {
            setShow(true);
            setMessagewarm(true);
        } else {
            const did = d;
            try {
                const data = await sendQuote(did, q_amount, q_message);
                console.log(data);
            } catch (err) {
                console.log(err);
            }
            setMessagewarm(false);
            setAmountwarm(false);
        }

    };
    // Modal下面 送資料回去
    const [key, setkey] = useState(0);
    const [posts, setPosts] = useState([]);
    const [members, setMembers] = useState([]);
    const [service_star_avg, setServiceStarAvg] = useState([]);
    const url = window.location.href;
    const [endnumber, setEndnumber] = useState(0);

    const { id } = useParams();

    async function fetchData(id) {
        if (isLoggedIn) {
            fetch(`http://localhost/Allend/backend/public/api/demmand_content/${id}`,
                { headers: { 'Authorization': `Bearer ${Cookies.get('token')}` } })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.dammand)
                    setPosts(data.dammand);
                    setMembers(data.members);
                    setServiceStarAvg(data.service_star_avg);
                })
        } else {
            fetch(`http://localhost/Allend/backend/public/api/demmand_content/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.dammand)
                    setPosts(data.dammand);
                    setMembers(data.members);
                    setServiceStarAvg(data.service_star_avg);
                })
        }
    }
    // 相同類別案件
    const [othercase, setOthercase] = useState([]);
    const [type, setType] = useState("");
    // if (posts.d_type == "網站設計" && type != 1) {
    //     setType(1);
    // }
    console.log(posts.d_type);
    if (type == "") {
        switch (posts.d_type) {
            case "網站設計":
                setType(1);
                console.log(1);
                break;
            case "軟體程式":
                setType(2);
                break;
            case "平面設計":
                setType(3);
                break;
            case "文字語言":
                setType(4);
                break;
            case "專業諮詢":
                setType(5);
                break;

            default:
                break;
        }
    }
    const fetchDataOther = async () => {

        let url = `http://localhost/Allend/backend/public/api/findcase?type=${type}`;
        console.log(type);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {

                setOthercase(data);
                console.log(data);
            });

    };


    // 相同類別案件

    useEffect(() => {
        if (Cookies.get('token')) {
            setIsLoggedIn(true)
        }

        fetchData(id);
        fetchDataOther();
    }, [type, id, isLoggedIn]);

    const [textShow, setTextShow] = useState(false);
    // 加入收藏
    const addServiceCollection = (did) => {
        axios({
            method: "post",
            url: "http://localhost/Allend/backend/public/api/addcollection",
            data: { did: did },
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
            .then((res) => {
                setPosts({ ...posts, fid: res.data.fid.fid })
                setTextShow(true)
                setTimeout(() => {
                    setTextShow(false)
                }, 3000)
            })
            .catch((err) => { console.log(err) })
    }

    // 取消收藏
    const cancelServiceCollection = (fid) => {
        axios({
            method: 'post',
            url: "http://localhost/Allend/backend/public/api/delcollection",
            data: { fid: fid },
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
            .then((res) => {
                setPosts({ ...posts, fid: null })
            })
            .catch((err) => { console.log(err) })
    }


    const [show, setShow] = useState(false);
    const handlePopShow = () => setShow(true);
    const redTextStyle = {
        color: 'red'
    };
    console.log(service_star_avg)





    return (
        <>
            <div className='container vh-100'>
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

                <Row className="mt-5">
                    <Col xs={8} style={{ backgroundColor: "#FCFCFC", color: "black", borderRadius: "5px" }}>
                        <div style={{ marginTop: "10px" }}>
                            <div>案件編號：{posts.did}</div>
                            <div>案件名稱：{posts.d_name}</div>
                            <div>案件類別：{posts.d_type}</div>
                            <ul>
                                <li>預算金額：{posts.d_amount}&nbsp;/&nbsp;{posts.d_unit}</li>
                                <li>地點：{posts.d_active_location}</li>
                                <li>案件期程：{posts.d_duration}</li>
                                <li>案件說明：{posts.d_description}</li>
                            </ul>
                        </div>
                        <div className='mt-5'>
                            {isLoggedIn === true && posts.fid
                                ? <>
                                    <FaHeart size={25} style={{ color: 'red', cursor: 'pointer', marginRight: '5px' }} onClick={() => { cancelServiceCollection(posts.fid) }} />
                                    {textShow && <span style={{ color: 'red' }}>已收藏！</span>}
                                </>
                                : <FaRegHeart size={25} style={{ cursor: 'pointer' }} onClick={isLoggedIn ? () => { addServiceCollection(posts.did) } : handleShow} />}
                            <div style={{ position: "absolute", right: "30px", bottom: "0px" }}>更新時間：{posts.updated_at}</div>
                        </div>
                    </Col>
                    <Col xs={2}></Col>
                    <Col xs={2} style={{ border: "solid", borderRadius: "5px" }}>
                        <div  >
                            <div style={{ marginTop: "5px" }}>案主資訊</div>
                            <hr></hr>
                            <div>
                                <img style={{ width: "60px" }} src={members.avatar}></img></div>
                            <div>{members.name}</div>
                            <div >
                                評價：
                                {service_star_avg !== 0
                                    ? Array.from({ length: service_star_avg }, (_, i) => (<FaStar key={i} className="" style={{ color: "gold" }} />))
                                    : <>尚無評價</>}
                            </div>
                            <div style={{ marginTop: "5px" }}>最後上線時間：{members.last_login}</div>
                            <div className="mt-3">
                                <Button style={{ marginLeft: "30px" }} onClick={handlePopShow}>我要報價</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <span style={redTextStyle}>提醒：請勿在非公開場所赴約</span>



                {/* 我要報價頁面 */}
                <Modal show={show} onHide={close}>
                    <Modal.Header closeButton >
                        <Modal.Title style={{ fontSize: 15 }}>
                            報價表單：
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <div>案件名稱：{posts.d_name}</div>
                            <hr></hr>
                            <div>案件編號：{posts.did}</div>
                            <hr></hr>
                            <div>案件類別：{posts.d_type}</div>
                            <hr></hr>
                            <div>案件地點：{posts.d_active_location}</div>
                            <hr></hr>
                            <Form.Label>報價金額</Form.Label>
                            <Form.Group
                                className="mb-3 d-flex"
                                controlId="exampleForm.ControlInput1"
                            >
                                {/* <input style={{ width: "100px" }}  ref={QuoteAmount}></input> */}
                                <Form.Control
                                    style={{ width: "100px" }}
                                    type=""
                                    autoFocus
                                    defaultValue={posts.d_amount}
                                    ref={QuoteAmount}
                                ></Form.Control>
                                <div className="mt-2"> &nbsp;/&nbsp;{posts.d_unit}<span style={{ display: (amountwarm != true ? "none" : ""), color: "red", marginLeft: "15px" }}>請輸入金額</span></div>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>接案人留言</Form.Label>
                                <div style={{ display: (messagewarm != true ? "none" : ""), color: "red" }}>請輸入至少10個字以上</div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder=" 請輸入至少10個字以上"
                                    ref={QuoteMessage}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { handleClose(posts.did) }}>
                            送出
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* 我要報價頁面 */}





                {/* 類似案件 */}
                <h4 className="mt-5">相同類別案件：</h4>
                <div className="row " >
                    <div className=" mb-4 container" style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex" }}>
                            {othercase.slice(0, 3).map((post, index) => {
                                return (
                                    <Row key={index} style={{ margin: "30px 32px 30px 32px" }}>
                                        <Col>
                                            <Link to={`/casecontext/${post.did}`} style={{ width: "30%", textDecoration: "none" }} >
                                                <div className="toast show ">
                                                    <div className="toast-header">
                                                        <strong className="me-auto">
                                                            <div>{post.d_name}</div>
                                                            <div>預算：{post.d_amount}</div>
                                                        </strong>
                                                    </div>
                                                    <div className="toast-body">
                                                        <div>刊登日期：{post.created_at}</div>
                                                        <div>地點：{post.country_city}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* 類似案件 */}

            </div>
            <Footer></Footer>
        </>
    )
}

export default CaseContext
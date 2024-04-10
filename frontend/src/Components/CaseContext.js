import React, { useState, useEffect, useRef } from "react";
import Footer from '../homepage/Footer'
import { VscAccount } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Form, Button, Row, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";






function CaseContext() {


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

    }, [urlParameter]);



    const [show, setShow] = useState(false);

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
                <Row className="mt-5">
                    <Col xs={8} style={{backgroundColor:"#8A1D1A",color:"white"}}>
                        <div >
                            案件編號：{posts.did}<br></br>
                            案件名稱：{posts.d_name}<br></br>
                            案件類別：{posts.d_type}<br></br>
                            {posts.updated_at}更新：<br></br>
                            <ul>
                                <li>預算金額：{posts.d_amount}/{posts.d_unit}</li>
                                <li>地點：{posts.d_active_location}</li>
                                <li>案件期程：{posts.d_duration}</li>
                                <li>案件說明：{posts.d_description}</li>
                            </ul>
                        </div>
                        <div className='mt-5'>
                            <span style={redTextStyle}>提醒：請勿在非公開場所赴約</span>
                        </div>

                    </Col>
                    <Col xs={2}></Col>
                    <Col xs={2} style={{border:"solid"}}>
                        <div  >
                            <div>案主資訊</div>
                            <hr></hr>
                            <div></div>
                            <img style={{ width: "50px" }} src={members.avatar}></img>
                            {members.name}
                            <div>{service_star_avg}</div>
                            <div style={{ color: "yellow" }}>☆<FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                            <div>最後上線時間：{members.last_login}</div>
                            <div className="mt-3">
                                <FaHeart size={25} style={{ color: 'red' }} />
                                <Button style={{marginLeft:"30px"}} onClick={handleShow} >我要報價</Button>
                            </div>

                        </div>
                    </Col>
                </Row>



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
                                <div className="mt-2"> &nbsp;/&nbsp;{posts[key]?.d_unit}<span style={{ display: (amountwarm != true ? "none" : ""), color: "red", marginLeft: "15px" }}>請輸入金額</span></div>
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
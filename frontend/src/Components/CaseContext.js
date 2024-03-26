import React from 'react'
import Footer from './Footer'
import { VscAccount } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';





function CaseContext() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <div className='row mt-5'>
                <div className='col-sm-9' style={{ border: 'solid' }}>
                    案件編號:<br></br>
                    案件名稱:<br></br>
                    案件類別:<br></br>
                    2024/XX/XX更新:<br></br>
                    <ul>
                        <li>預算金額:</li>
                        <li>地點:</li>
                        <li>案件時間:短期</li>
                        <li>案件說明:</li>
                    </ul>
                </div>
                <div className='col-sm-3' >
                    案主資訊
                    <hr></hr>
                    <VscAccount />姓名
                    <br></br>
                    <Button onClick={handleShow} >我要報價</Button>
                    <br></br>
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <br></br>
                    最後上線時間:5小時前
                    <br></br>
                    <FaHeart style={{ color: 'red' }} />
                </div>
            </div>
            <div className='mt-5'>提醒:請勿在非公開場所赴約</div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title style={{ fontSize: 15 }} >
                        案件名稱:<input></input><hr></hr>
                        案件編號:<input></input><hr></hr>
                        案件類別:<input></input><hr></hr>
                        案件地點:<input></input><hr></hr>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>報價金額</Form.Label>
                            <Form.Control
                                type=''
                                placeholder="請輸入金額"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>接案人留言</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='請輸入訊息' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleClose} >
                        送出
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer></Footer>
        </div>
    )
}

export default CaseContext
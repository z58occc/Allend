import React, { useState } from "react";
import { Form, Button, Alert, Col, Row, Container, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import LeftVerticalNavbar from "../../../RatingPage/LeftVerticalNavbar";
// import "./fix.css";
import Footer from "../../../homepage/Footer";
import Cookies from "js-cookie";
import { FaLock } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import { BsWrenchAdjustable } from "react-icons/bs";

function PasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const [showModal, setShowModal] = useState(false)
  const [oerr, setOerr] = useState("")
  const [err, setErr] = useState("")
  // 修改密碼
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (newPassword !== confirmNewPassword) {
    //   setMessage("新密碼與確認新密碼不一致");
    //   return; // 返回以防止後續的 Axios 請求
    // }
    const cookie = Cookies.get("token");
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/updatepassword",
      data: {
        oldpassword: oldPassword,
        password: newPassword,
        password_confirmation: confirmNewPassword,
      },
      headers: {
        Authorization: "Bearer " + cookie,
      },
    })
      .then((res) => {
        setMessage(res.data.message);
        // console.log(res.data.error);
        // 在這裡處理成功後的邏輯
      })
      .then(() => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        setOerr(err.response.data.oldpassword)
        setErr(err.response.data.password)
      });
  };

  return (
    <>
      <Container xxl={12} style={{minHeight: '100vh', paddingTop: '1.5rem'}}>
        <Row>
          <Col sm={3}>
            <LeftVerticalNavbar />
          </Col>
          <Col sm={9}>
            <Row className="justify-content-center">
              <Col sm={6}>
                <div>
                  <h2><BsWrenchAdjustable />修改密碼</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Label>舊密碼：<span style={{color:'red'}}>*</span>{oerr && oerr.map((v) => {return <span style={{color:'red'}}>{v}</span>})}</Form.Label>
                    <InputGroup>
                      <InputGroup.Text controlId="formOldPassword">< FaLock /></InputGroup.Text>
                      <Form.Control
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        style={{ width: "100%" }}
                      />
                    </InputGroup>
                    <br />
                    <Form.Label>新密碼：<span style={{color:'red'}}>*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text controlId="formNewPassword">< FaLock /></InputGroup.Text>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={{ width: "100%" }}
                        aria-describedby="formNewPassword"
                      />
                    </InputGroup>
                    <br />
                    <Form.Label>確認新密碼：<span style={{color:'red'}}>*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text controlId="formConfirmNewPassword">< FaLock /></InputGroup.Text>
                      <Form.Control
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        style={{ width: "100%" }}
                        aria-describedby="formConfirmNewPassword"
                      />
                    </InputGroup>
                    {err &&
                      err.map((v) => {
                        return <p style={{color:'red', }}>{v}</p>
                      })
                    }
                    <br />
                    <Button
                      variant="primary"
                      type="submit"
                      style={{fontSize: "20px", borderRadius: '.5rem', padding: '.54rem 1.7rem'}}
                    >
                      提交
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Modal.Title>修改成功</Modal.Title>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={() => setShowModal(false)}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PasswordForm;

import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// 修改密碼
function PasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("新密碼與確認新密碼不一致");
    } else {
      axios({
        method: "post",
        url: "http://localhost/PHP/Allend/backend/public/api/resetpwd",
        data: {
          email: null,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          setNewPassword("");
          setConfirmNewPassword("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Container style={{ maxWidth: "400px" }}>
      <div>
        <h2>修改密碼</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOldPassword">
            <Form.Label>舊密碼：</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <br />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>新密碼：</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>确認新密碼：</Form.Label>
            <Form.Control
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            提交
          </Button>
        </Form>
        {message && <Alert variant="info">{message}</Alert>}
      </div>
    </Container>
  );
}

export default PasswordForm;

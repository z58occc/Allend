import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap'; // 引入所需的组件
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入React Bootstrap样式

// 修改密码
function PasswordForm () {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword === confirmNewPassword) {
      // 在这里执行密码修改逻辑，这里只是模拟修改成功的情况
      setMessage('密碼修改成功！');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setMessage('新密碼與确認密码不匹配，請重新输入。');
    }
  };

  return (
   <Container style={{ maxWidth: '400px' }}>
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
          <br/>
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
        <br/>
        <Form.Group controlId="formConfirmNewPassword">
          <Form.Label>确認新密碼：</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br/>
        <Button variant="primary" type="submit">
          提交
        </Button>
      </Form>
      {message && <Alert variant="info">{message}</Alert>}
    </div>
    </Container>
  );
};

export default PasswordForm;

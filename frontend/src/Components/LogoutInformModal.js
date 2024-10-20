import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogoutInformModal = ({ isLogout, setIsLogout }) => {
  return (
    <Modal show={isLogout} onHide={() => setIsLogout(false)}>
      <Modal.Header closeButton>
        <Modal.Title>已登出</Modal.Title>
      </Modal.Header>
      <Modal.Body>為確保您的帳戶安全，已將您的帳戶自動登出</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setIsLogout(false)}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutInformModal;

import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Orderbuttom() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button onClick={handleShow} >我要報價</Button>
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
    </>
  )
}

export default Orderbuttom
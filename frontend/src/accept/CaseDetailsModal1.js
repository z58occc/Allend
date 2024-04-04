import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { CaseContext } from './MainScreen';
// import CaseContext from './CaseContext.js'
const CaseDetailsModal = ({ show, onHide, number, data }) => {
  const {fetchData} = useContext(CaseContext); 

  const [Quote, setQuote] = useState("");
  const [messages, setMessages] = useState("");
  const handleSubmit = (e) => {
    console.log(data[number]);
    e.preventDefault();
    fetch('http://127.0.0.1/Allend/backend/public/api/updatetakecase',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
          "did": data[number].did,
          "qid": data[number].qid,
          "message": messages,
          "amount": Quote
      }),
    })
    .then((res)=>{
      console.log(res)
      fetchData();  
      onHide();
      return res.json();
    })
    .then((mes)=>(
      console.log(mes)
    ))

  };
  useEffect(() => {
    if (data && data.length > 0) {
      setQuote(data[number].q_amount);
      setMessages(data[number].q_message);
    }
  }, [data, number]);


  return (
    <>
      {data.length === 0
        ? " "
        :
        <Modal show={show} onHide={onHide} style={{ width: '450px', marginInline: '550px' }}>
          <Modal.Header closeButton>
            <Modal.Title>案件資訊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container" style={{ fontSize: '18px' }}>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>案件名稱： {data[number].d_name}</Form.Label>
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>案件類別： {data[number].type}</Form.Label>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>案件地點： {data[number].active_location}</Form.Label>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>案件描述： {data[number].d_description}</Form.Label>
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>發案人姓名： {data[number].d_contact_name}</Form.Label>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Form.Label>發案人Email： {data[number].d_email}</Form.Label>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="Quote">
                    <Form.Label>報價金額：</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="請輸入報價金額"
                      value={Quote}
                      onChange={(e) => setQuote(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="messages">
                    <Form.Label>接案人留言：</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="請輸入最少十個字"
                      value={messages}
                      onChange={(e) => setMessages(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Form>

              </div>

            </div>
            <div className="mb-2 d-flex justify-content-around">
              <Button variant="primary" size="lg" 
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleSubmit(e); // Pass the event object to handleSubmit
                }}
              >
                儲存變更
              </Button>
              <Button variant="secondary" size="lg" onClick={onHide}>
                取消
              </Button>
            </div>
          </Modal.Body>
        </Modal>}
    </>
  );
};

export default CaseDetailsModal;

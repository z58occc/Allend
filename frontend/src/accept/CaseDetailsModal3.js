import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Star2 from './Star2';
import Cookies from 'js-cookie';
import { CaseContext } from './MainScreen';
import "./case.css";

const CaseDetailsModal3 = ({ show, onHide, number, data, submit }) => {
  const { fetchData } = useContext(CaseContext);
  //星星數
  const [Star, setStar] = useState(0);
  const handleRatingChange = (rating) => {
    setStar(rating);
  }
  //評論
  const [Comment, setComment] = useState("");

  //送出評論
  const handleRating = () => {
    fetch('http://127.0.0.1/Allend/backend/public/api/takeEvaluation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        "cid": data[number].cid,
        "service_star": Star,
        "service_comment": Comment

      })
    })
      .then((res) => {
        onHide();
        fetchData();
        return res.json();
      })
      .then((success) => {
        console.log(success)
      })
  }

  return (
    <>
      {data.length === 0
        ? " "
        :
        <Modal show={show} onHide={onHide} dialogClassName="custom-background1">
          <Modal.Header closeButton>
            <Modal.Title>案件資訊</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container" style={{ fontSize: '18px' }}>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件編號：{data[number].cid}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件名稱：{data[number].c_name}</strong>


                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件類別：{data[number].type}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>結案金額：</strong> {data[number].c_amount}/{data[number].c_unit}
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人姓名：{data[number].c_contact_name}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人Email：{data[number].c_email}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人手機：{data[number].c_mobile_phone}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <Star2 style={{ marginBottom: "10px", fontSize: "20px" }} onRatingChange={handleRatingChange}></Star2>
                  <div style={{ margin: '0 40px 0 40px' }}>
                    <textarea

                      maxLength={100}
                      rows={5}
                      cols={30}
                      value={Comment} onChange={(e) => { setComment(e.target.value) }}
                    /></div>
                </div>


              </div>
              <div>


              </div>
            </div>
            <div className="mb-2 d-flex justify-content-around">
              <Button variant="primary" style={{ padding: '0.5rem 2.14rem', fontSize: '22px' }} onClick={() => handleRating()}>
                評價提交
              </Button>
              <Button variant="secondary" style={{ padding: '0.5rem 2.14rem', fontSize: '22px' }} onClick={onHide}>
                關閉
              </Button>
            </div>
          </Modal.Body>
        </Modal>}
    </>

  );
};

export default CaseDetailsModal3;

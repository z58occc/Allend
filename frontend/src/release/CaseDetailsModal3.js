import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import Star1 from "./Star1";


const CaseDetailsModal3 = ({ show, onHide, number, data }) => {
  //星星數
  const [Star , setStar] = useState(0);
  const handleRatingChange = (rating) =>{
    setStar(rating);
  }
  //評論
  const [Comment , setComment] = useState("");

  //送出評論
  const handleRating = () =>{
    fetch('http://127.0.0.1/Allend/backend/public/api/publicEvaluation',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body:   JSON.stringify({
        "cid": data[number].cid,
        "demmand_star": Star,
        "demmand_comment": Comment
    
      })
    })
    .then((res)=>{
      onHide();
      return res.json();
    })
    .then((success)=>{
      console.log(success)
    })
  }



  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ fontSize: "18px" }}>
          <div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>案件編號：{data[number].cid}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>案件名稱：{data[number].c_name}</strong>
            </div>
          </div>
          <div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>案件類別：{data[number].type}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>預算金額：{data[number].c_amount}</strong>
            </div>
          </div>
          <div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>接案人姓名：{data[number].c_contact_name}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>接案人Email：{data[number].c_email}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "0px", fontSize: "20px" }}
            >
              <strong>接案人手機：{data[number].c_mobile_phone}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <Star1 style={{ marginBottom: "10px", fontSize: "20px" }} onRatingChange={handleRatingChange}></Star1>
              <div style={{ margin: "10px auto" }}>
                <textarea maxLength={100} rows={5} cols={40} value={Comment} onChange={(e)=>{setComment(e.target.value)}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 d-flex justify-content-around">
          <Button variant="primary" size="lg" onClick={()=>{handleRating()}}>
            評價提交
          </Button>
          <Button variant="secondary" onClick={onHide}>
            關閉
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CaseDetailsModal3;

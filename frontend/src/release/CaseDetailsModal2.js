import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Cookies from "js-cookie";
const CaseDetailsModal2 = ({ show, onHide, number, data }) => {
  const [isDisabled,setIsDisabled] = useState(true);
  const received = (cid) =>{
    fetch(`http://127.0.0.1/Allend/backend/public/api/publish_recevice?cid=${cid}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  return (
    <Modal show={show} onHide={onHide} size="lg">
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
              <strong>地點：{data[number].active_location}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>案件期程：{data[number].c_duration}</strong>
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
              <strong>接案人 Email：{data[number].c_email}</strong>
            </div>
            <div
              className="col"
              style={{ marginBottom: "10px", fontSize: "20px" }}
            >
              <strong>接案人手機：{data[number].c_mobile_phone}</strong>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            聯絡接案人
          </Button>
          <Button variant="secondary" size="lg" onClick={()=>{received(data[number].cid)}} disabled={isDisabled}>
            已收到案件
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CaseDetailsModal2;

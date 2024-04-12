import { React, useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen2";
import PayButton from "./paybutton"


const CaseDetailsModal2 = ({ show, onHide, number, data }) => {
  const {fetchData} = useContext(CaseContext);
  const [selectedCase, setSelectedCase] = useState({
    cid: '',
    c_name: '',
    c_amount: 0
  });

  const received = (cid) =>{
    fetch(`http://127.0.0.1/Allend/backend/public/api/publish_recevice?cid=${cid}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
    .then(()=>{
      fetchData();
      // onHide();
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  useEffect(() => {
    // 當 data[number] 發生變化更新 selectedCase
    setSelectedCase({
      cid: data[number].cid,
      c_name: data[number].c_name,
      c_amount: data[number].c_amount
    });
  }, [data, number]);
  console.log(selectedCase);
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
          {data[number].c_status === 3
          ?
          <Button variant="secondary" size="lg" onClick={()=>{received(data[number].cid)}} disabled={false}>
            已收到案件
          </Button>
          :
          <Button variant="secondary" size="lg" onClick={()=>{received(data[number].cid)}} disabled={true} style={data[number].c_status === 4 ? { display: 'none' } : {}} >
            已收到案件
          </Button>
          }
          {data[number].c_status === 4 && <PayButton cName={selectedCase.c_name} cId={selectedCase.cid} cAmount={selectedCase.c_amount} />}
          
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

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
function GetQuoteModal({ show, onHide, index }) {
  console.log(index);
  const [Quote, setQuote] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1/Allend/backend/public/api/pop_quote?did=${index}`, {
      method: "GET",
      // headers:{Authorization: `Bearer ${Cookies.get("token")}`},
    })
      .then((res) => 
        res.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [index]);
  console.log(Quote);

  // 同意報價按鈕
  const handleAgree = (mid) =>{
    fetch("http://127.0.0.1/Allend/backend/public/api/pop_agree",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        mid: mid,
        did: index,
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  //拒絕報價按鈕
  const handleDisagree = (mid) =>{
    fetch('http://127.0.0.1/Allend/backend/public/api/pop_disagree',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        mid: mid,
        did: index,
      })
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>案件名稱</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover>
          <thead>
            <tr>
              <th>接案人姓名</th>
              <th>Email</th>
              <th>族群</th>
              <th>報價金額</th>
              <th>訊息</th>
              <th>操作</th>
            </tr>
          </thead>
          {Quote.map((item) => (
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.identity}</td>
                <td>{item.q_amount}</td>
                <td>{item.q_message || "無留言"}</td>
                <td>
                  <div class="d-flex justify-content-start">
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                      onClick={()=>{handleAgree(item.mid)}}
                    >
                      接受
                    </Button>
                    <Button
                      variant="danger"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                      onClick={()=>{handleDisagree(item.mid)}}
                    >
                      拒絕
                    </Button>
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      聊聊
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GetQuoteModal;

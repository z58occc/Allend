import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen2";
import { CiCircleCheck } from "react-icons/ci";
import { IsLoggedInContext } from "../App";

function GetQuoteModal({ show, onHide, data }) {
  // 
  const [successshow, setSuccessshow] = useState(false);
  const close =  () => {
    setSuccessshow(false);
  }
  // 

  
  const {isLoggedIn, setIsLoggedIn, handleShow ,showChat,setShowChat,setSelectedItemMid} = useContext(IsLoggedInContext);

  const toggleChat = (mid) => {
    setShowChat(!showChat);
    setSelectedItemMid(mid);
  };

  const { fetchData } = useContext(CaseContext);
  const [datas, setDatas] = useState(true);
  const [dataIndex, setDataIndex] = useState("")
  // 同意報價按鈕
  const handleAgree = (mid, qid, index) => {

    fetch("http://127.0.0.1/Allend/backend/public/api/pop_agree", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        "mid": mid,
        "qid": qid,
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        fetchData();
        setDatas(false);
        setDataIndex(index)
        setSuccessshow(true);
        setTimeout(() => {
          close();
        }, 3000);
        
        // onHide();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // 拒絕報價按鈕
  const handleDisagree = (mid, qid) => {
    fetch('http://127.0.0.1/Allend/backend/public/api/pop_disagree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        mid: mid,
        qid: qid,
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        onHide();
      })
      .catch((error) => {
        console.error(error);
      })
  }
  return (
    <Modal show={show} onHide={onHide} size={data && data.length !== 0 ? "lg" : "sm"}>
      <Modal.Header closeButton>
        <Modal.Title>{data[0]?.d_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {data && data.length !== 0
          ?
          (
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>接案人姓名</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Email</th>
                  <th style={{ whiteSpace: 'nowrap' }}>族群</th>
                  <th style={{ whiteSpace: 'nowrap' }}>報價金額</th>
                  <th style={{ whiteSpace: 'nowrap' }}>訊息</th>
                  <th style={{ whiteSpace: 'nowrap' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} style={{ display: dataIndex === index ? 'none' : 'table-row' }} >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.identity}</td>
                    <td>{item.q_amount}</td>
                    <td>{item.q_message || "無留言"}</td>
                    <td>
                      <div className="d-flex justify-content-start">
                        <Button
                          variant="secondary"
                          style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                          onClick={() => { handleAgree(item.mid, item.qid, index) }}
                        >
                          接受
                        </Button>
                        <Button
                          variant="danger"
                          style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                          onClick={() => { handleDisagree(item.mid, item.qid) }}
                        >
                          拒絕
                        </Button>
                        <Button onClick={isLoggedIn ? ()=>toggleChat(item.mid) : handleShow}variant="secondary"style={{ fontSize: "12px", whiteSpace: "nowrap" }} >
                          聊聊
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h2>目前無任何報價</h2>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer>
      {/*報價成功Modal  */}
      <Modal show={successshow} onHide={close} style={{ marginTop: "250px", fontSize: "50px", textAlign: "center" }}>

        <Modal.Body>
          <CiCircleCheck color="green" size={150} />
          <div>接受報價成功</div>
        </Modal.Body>

      </Modal>
    </Modal>
  );
}

export default GetQuoteModal;

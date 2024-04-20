import { React, useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { CaseContext } from './MainScreen';
import { IsLoggedInContext } from "../App";
import "./case.css";


const CaseDetailsModal2 = ({ show, onHide, number, data }) => {
  const { fetchData } = useContext(CaseContext);
  const [ButtonName, setButtonName] = useState('提交案件');
  const [isDisabled, setIsDisabled] = useState(false);
  const [Color, setColor] = useState("info");

  const { isLoggedIn, setIsLoggedIn, handleShow, showChat, setShowChat, setSelectedItemMid } = useContext(IsLoggedInContext);

  const toggleChat = (mid) => {
    setShowChat(!showChat);
    setSelectedItemMid(mid);
  };


  const submit = (cid) => {
    fetch(`http://127.0.0.1/Allend/backend/public/api/take_submit?cid=${cid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then((res) => {
        setButtonName('等待中');
        setIsDisabled(true);
        setColor('warning');
        fetchData();
        return res.json();
      })
      .then((data) => {

        console.log(data)
      })
  }
  return (
    <>
      {data.length === 0
        ? " "
        :
        <Modal show={show} onHide={onHide} size="lg" dialogClassName="custom-background1">
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
                  <strong>案件地點：{data[number].active_location}</strong>
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件金額：</strong>{data[number].c_amount}&nbsp;/&nbsp;{data[number].c_unit}
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人姓名：{data[number].c_contact_name}</strong>
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人Email：{data[number].c_email}</strong>
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人手機：{data[number].c_mobile_phone}</strong>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2">
              <Button onClick={isLoggedIn ? () => toggleChat(data[number].mid_demmand) : handleShow} variant="primary" 
              style={{ padding: '0.5rem 2.14rem', fontSize: '22px', borderRadius: '.5rem' }}>
                聯絡案主
              </Button>
              {data[number].c_status !== 3
                ?
                <Button variant={Color} style={{ padding: '0.5rem 2.14rem', fontSize: '22px', borderRadius: '.5rem' }} onClick={() => { submit(data[number].cid) }} disabled={isDisabled}>
                  {ButtonName}
                </Button>
                :
                <Button variant="warning" style={{ padding: '0.5rem 2.14rem', fontSize: '22px', borderRadius: '.5rem' }} onClick={() => { submit(data[number].cid) }} disabled={true}>
                  等待中
                </Button>
              }

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide} style={{ padding: '0.5rem 2.14rem', fontSize: '22px', borderRadius: ".5rem" }}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>}
    </>
  );
};

export default CaseDetailsModal2;

import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen2";


const CaseDetailsModal1 = ({ show, onHide, number, data }) => {
  //useContext from Mainscreen
  const { fetchData } = useContext(CaseContext);

  const [nameOfCase, setNameOfCase] = useState("");
  const [category, setCategory] = useState("");
  const [cooperationTime, setCooperationTime] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [unit, setUnit] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1/Allend/backend/public/api/updatepublishcase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        index: data[number].did,
        case_name: nameOfCase,
        type: category,
        amount: budget,
        unit: unit,
        duration: cooperationTime,
        location: location,
        details: details,
        contact_name: userName,
        email: email,
        phone: contact,
      }),
    })
    .then((res) => {
        console.log(res);
        onHide();
        fetchData();
    })
    .catch((error) => {
        console.error('There was a problem updating the case:', error);
    });  



    if (!emailError) {
      // setNameOfCase("");
      // setCategory("");
      // setCooperationTime("");
      // setLocation("");
      // setDetails("");
      // setBudget("");
      // setUnit("");
      // setUserName("");
      // setEmail("");
      // setContact("");
    } else {
      console.error("Form submission error: Email format is incorrect.");
    }
  };
  useEffect(() => {
    if (data && data.length > 0) {
      setNameOfCase(data[number].d_name);
      setCategory(data[number].type);
      setCooperationTime(data[number].d_duration);
      setLocation(data[number].active_location);
      setDetails(data[number].d_description);
      setBudget(data[number].d_amount);
      setUnit(data[number].d_unit);
      setUserName(data[number].d_contact_name);
      setEmail(data[number].d_email);
      setContact(data[number].d_mobile_phone);
    }
  }, [data, number]);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  if (!data || data.length === 0) {
    return null; // Render nothing if data is empty or undefined
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ width: "450px", marginInline: "550px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>案件編號：{data[number].did}</Form.Label>
        <Form >
          <Form.Group controlId="numberOfPeople">
            <Form.Label>案件名稱：{data[number].d_name}</Form.Label>
            <Form.Control
              type="text"
              placeholder="填寫案件名稱"
              value={nameOfCase}
              onChange={(e) => setNameOfCase(e.target.value)}

              required
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>需求類別：</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">請選擇案件類別</option>
              <option value="網站設計">網站設計</option>
              <option value="軟體程式">軟體程式</option>
              <option value="文字語言">文字語言</option>
              <option value="平面設計">平面設計</option>
              <option value="專業諮詢">專業諮詢</option>
            </Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="budget">
                <Form.Label>預算金額：</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="填寫金額"
                  value={budget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setBudget(value);
                    }
                  }}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="unit">
                <Form.Label>單位：</Form.Label>
                <Form.Control
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="例如: 次、件、小時"
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="cooperationTime">
            <Form.Label>合作期程：</Form.Label>

            <Form.Control
              as="select"
              value={cooperationTime}
              onChange={(e) => setCooperationTime(e.target.value)}
              required
            >
              <option value="">請選擇</option>
              <option value="短">短期</option>
              <option value="長">長期</option>
            </Form.Control>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="location">
                <Form.Label>地點選擇：</Form.Label>
                <Form.Control
                  as="select"
                  value={data[number].active_location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">請選擇</option>
                  <optgroup label="北部">
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                  </optgroup>
                  <optgroup label="中部">
                    <option value="台中市">台中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="苗栗縣">苗栗縣</option>
                  </optgroup>
                  <optgroup label="南部">
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                  </optgroup>
                  <optgroup label="東部">
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                    <option value="台東縣">台東縣</option>
                  </optgroup>
                  <optgroup label="離島">
                    <option value="澎湖縣">澎湖縣</option>
                    <option value="金門縣">金門縣</option>
                    <option value="連江縣">連江縣</option>
                  </optgroup>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="details">
            <Form.Label>需求詳情：</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="請輸入最少十個字"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="userName">
            <Form.Label>聯絡人名稱：</Form.Label>
            <Form.Control
              type="text"
              placeholder="請輸入聯絡人名稱"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>聯絡人Email：</Form.Label>
            <Form.Control
              type="email"
              placeholder="請輸入email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              isInvalid={!!emailError}
              required
            />
          </Form.Group>

          <Form.Group controlId="contact">
            <Form.Label>聯絡方式：</Form.Label>
            <Form.Control
              type="phone"
              placeholder="請輸入電話號碼"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
        <div className="mb-2 d-flex justify-content-around">
          <Button
            variant="primary"
            size="lg"
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
    </Modal>
  );
};

export default CaseDetailsModal1;

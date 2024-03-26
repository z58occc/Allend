import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './ProjectForm.css';

//發按表單
function ProjectForm() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [cooperationTime, setCooperationTime] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      category,
      budget,
      cooperationTime,
      location,
      details,
      userName,
      email,
      contact,
      numberOfPeople
    });
    // Clear the form
    setCategory('');
    setBudget('');
    setCooperationTime('');
    setLocation('');
    setDetails('');
    setUserName('');
    setEmail('');
    setContact('');
    setNumberOfPeople('');
  };

  return (
    <div className="project-form">
      <h2>發案表單</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="category">
          <Form.Label>需求類別:</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">請選擇</option>
            <option value="option1">網站設計</option>
            <option value="option2">軟體程式</option>
            <option value="option3">文字語言</option>
            <option value="option4">專業諮詢</option>
            <option value="option5">程式設計</option>
            {/* Add more options here */}
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
            <Form.Group controlId="cooperationTime">
              <Form.Label>合作時間：</Form.Label>
              <Form.Control
                as="select"
                value={cooperationTime}
                onChange={(e) => setCooperationTime(e.target.value)}
                required
              >
                <option value="">請選擇</option>
                <option value="short">短期</option>
                <option value="medium">中期</option>
                <option value="long">長期</option>
                {/* Add more options here */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="location">
              <Form.Label>地點選擇：</Form.Label>
              <Form.Control
                as="select"
                value={location}
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
                {/* Add more options here */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="numberOfPeople">
          <Form.Label>需求人數：</Form.Label>
          <Form.Control
            type="number"
            placeholder="填寫人數"
            value={numberOfPeople}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                setNumberOfPeople(value);
              }
            }}
            required
          />
        </Form.Group>

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
          <Form.Label>名稱：</Form.Label>
          <Form.Control
            type="text"
            placeholder="請輸入聯絡人名稱"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="請輸入email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>聯絡方式：</Form.Label>
          <Form.Control
            type="text"
            placeholder="請輸入電話號碼"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </Form.Group>

          <div className="text-center"> {/* Center align the submit button */}
        <Button variant="primary" type="submit">
          提交
        </Button>
      </div>
      </Form>
    </div>
  );
}

export default ProjectForm;

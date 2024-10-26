import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './ProjectForm.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaBriefcase, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { IoBriefcaseSharp } from 'react-icons/io5';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { SiUnity } from 'react-icons/si';
import { IoIosTime } from 'react-icons/io';
import { MdPlace } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import Footer from '../../layouts/Footer';
import { Modal } from 'react-bootstrap';

// 發案表單
function ProjectForm() {
  const [nameOfCase, setNameOfCase] = useState('');
  const [category, setCategory] = useState('');
  const [cooperationTime, setCooperationTime] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [unit, setUnit] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost/Allend/backend/public/api/commitcase',
      data: {
        d_name: nameOfCase,
        d_type: category,
        d_duration: cooperationTime,
        d_active_location: location,
        d_description: details,
        d_amount: budget,
        d_unit: unit,
        d_contact_name: userName,
        d_email: email,
        d_mobile_phone: contact,
      },
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then((res) => {
        console.log(res);
        // 表單提交成功後顯示模態對話框
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });

    if (!emailError) {
      setNameOfCase('');
      setCategory('');
      setCooperationTime('');
      setLocation('');
      setDetails('');
      setBudget('');
      setUnit('');
      setUserName('');
      setEmail('');
      setContact('');
    } else {
      console.error('Form submission error: Email format is incorrect.');
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  // 處理模態對話框關閉事件
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='project-form'>
        <h2>發案表單</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Label className='project-formInput'>
            案件名稱：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='numberOfPeople'>
              {' '}
              <FaBriefcase />{' '}
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='填寫案件名稱'
              value={nameOfCase}
              onChange={(e) => {
                setNameOfCase(e.target.value);
              }}
              required
            />
          </InputGroup>

          <Form.Label className='project-formInput'>
            需求類別：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='category'>
              {' '}
              <IoBriefcaseSharp />{' '}
            </InputGroup.Text>
            <Form.Control
              as='select'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>請選擇案件類別</option>
              <option value='網站設計'>網站設計</option>
              <option value='軟體程式'>軟體程式</option>
              <option value='文字語言'>文字語言</option>
              <option value='平面設計'>平面設計</option>
              <option value='專業諮詢'>專業諮詢</option>
            </Form.Control>
          </InputGroup>

          <Row>
            <Col>
              <Form.Label className='project-formInput'>
                預算金額：<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <InputGroup className='project-formInput'>
                <InputGroup.Text controlId='budget'>
                  {' '}
                  <RiMoneyDollarCircleFill />{' '}
                </InputGroup.Text>
                <Form.Control
                  type='number'
                  placeholder='填寫金額'
                  value={budget}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, '');
                    setBudget(newValue ? parseInt(newValue) : '');
                  }}
                  required
                />
              </InputGroup>
            </Col>

            <Col>
              <Form.Label className='project-formInput'>
                單位：<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <InputGroup className='project-formInput'>
                <InputGroup.Text controlId='unit'>
                  <SiUnity />
                </InputGroup.Text>
                <Form.Select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                >
                  <option value='' disabled>
                    請選擇
                  </option>
                  <option value='次'>次</option>
                  <option value='件'>件</option>
                  <option value='份'>份</option>
                  <option value='小時'>小時</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

          <Form.Label className='project-formInput'>
            合作期程：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='cooperationTime'>
              {' '}
              <IoIosTime />{' '}
            </InputGroup.Text>
            <Form.Control
              as='select'
              value={cooperationTime}
              onChange={(e) => setCooperationTime(e.target.value)}
              required
            >
              <option value=''>請選擇</option>
              <option value='短'>短期</option>
              <option value='長'>長期</option>
            </Form.Control>
          </InputGroup>

          <Row>
            <Col>
              <Form.Label className='project-formInput'>
                地點選擇：<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <InputGroup className='project-formInput'>
                <InputGroup.Text controlId='location'>
                  {' '}
                  <MdPlace />{' '}
                </InputGroup.Text>
                <Form.Control
                  as='select'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value=''>請選擇</option>
                  <optgroup label='北部'>
                    <option value='台北市'>台北市</option>
                    <option value='新北市'>新北市</option>
                    <option value='桃園市'>桃園市</option>
                    <option value='基隆市'>基隆市</option>
                    <option value='新竹市'>新竹市</option>
                    <option value='新竹縣'>新竹縣</option>
                  </optgroup>
                  <optgroup label='中部'>
                    <option value='台中市'>台中市</option>
                    <option value='彰化縣'>彰化縣</option>
                    <option value='南投縣'>南投縣</option>
                    <option value='苗栗縣'>苗栗縣</option>
                  </optgroup>
                  <optgroup label='南部'>
                    <option value='台南市'>台南市</option>
                    <option value='高雄市'>高雄市</option>
                    <option value='屏東縣'>屏東縣</option>
                    <option value='嘉義市'>嘉義市</option>
                    <option value='嘉義縣'>嘉義縣</option>
                  </optgroup>
                  <optgroup label='東部'>
                    <option value='宜蘭縣'>宜蘭縣</option>
                    <option value='花蓮縣'>花蓮縣</option>
                    <option value='台東縣'>台東縣</option>
                  </optgroup>
                  <optgroup label='離島'>
                    <option value='澎湖縣'>澎湖縣</option>
                    <option value='金門縣'>金門縣</option>
                    <option value='連江縣'>連江縣</option>
                  </optgroup>
                </Form.Control>
              </InputGroup>
            </Col>
          </Row>

          <Form.Group controlId='details'>
            <Form.Label className='project-formInput'>
              需求詳情：<span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              className='project-formInput'
              as='textarea'
              placeholder='請輸入最少十個字'
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Label className='project-formInput'>
            聯絡人名稱：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='userName'>
              {' '}
              <FaUserAlt />{' '}
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='請輸入聯絡人名稱'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </InputGroup>

          <Form.Label className='project-formInput'>
            聯絡人Email：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='email'>
              {' '}
              <HiOutlineMail />{' '}
            </InputGroup.Text>
            <Form.Control
              type='email'
              placeholder='請輸入email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              isInvalid={emailError}
              required
            />
          </InputGroup>

          <Form.Label className='project-formInput'>
            聯絡方式：<span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <InputGroup className='project-formInput'>
            <InputGroup.Text controlId='contact'>
              {' '}
              <FaPhoneAlt />{' '}
            </InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='請輸入電話號碼'
              value={contact}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, '');
                setContact(newValue);
              }}
              isInvalid={contact.length !== 10 && contact.length !== 0}
              required
            />
          </InputGroup>

          <div className='text-center'>
            <Button
              variant='primary'
              type='submit'
              style={{
                width: '110px',
                fontSize: '18px',
                whiteSpace: 'nowrap',
                padding: '0.8rem 1rem',
                borderRadius: '.5rem',
              }}
            >
              提交
            </Button>
          </div>
        </Form>
      </div>

      {/* 提交彈出發案成功畫面 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>發案完成</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center' style={{ fontSize: '32px' }}>
          您的案件已成功提交！
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button
            variant='primary'
            onClick={handleCloseModal}
            style={{
              width: '110px',
              fontSize: '18px',
              whiteSpace: 'nowrap',
              padding: '0.8rem 1rem',
              borderRadius: '.5rem',
            }}
          >
            確認
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer></Footer>
    </>
  );
}

export default ProjectForm;

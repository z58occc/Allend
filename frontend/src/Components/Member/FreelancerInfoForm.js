import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import { IsLoggedInContext } from '../../../App';
import Footer from '../../../layouts/Footer';
import LeftVerticalNavbar from '../../../layouts/UserPage/LeftVerticalNavbar';

// 接案者維護資料
function FreelancerInfoForm() {
  const { setIsVerificationSent, setCountdown, countdown, emailVerified } =
    useContext(IsLoggedInContext);
  console.log(1231);
  //提交完成
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    identity: '',
    experience: '',
    location: '',
    idCard: '',
    email: '',
    name: '',
    phone: '',
    gender: '',
    area: '',
    fb: '',
    line: '',
    about: '',
  });

  const handleReset = () => {
    setFormData({
      identity: '',
      experience: '',
      location: '',
      idCard: '',
      email: formData.email,
      name: '',
      phone: '',
      gender: '',
      area: '',
      fb: '',
      line: '',
      about: '',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          'http://localhost/Allend/backend/public/api/mem',
          { headers: headers }
        );
        const result = await res.data;
        setFormData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // 偵測input變化
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'idCard') {
      const firstCharIsValid = /^[A-Z]/.test(value[0]);
      // 檢查後九位是否全部為數字
      const lastNineDigitsAreNumeric = /^\d{9}$/.test(value.substring(1));

      // 如果長度超過10個字符，或者第一個字符不是英文，或者後九位不是數字，則顯示紅框
      if (value.length > 10 || !firstCharIsValid || !lastNineDigitsAreNumeric) {
        // 在表單控制元素中添加 is-invalid 類
        e.target.classList.add('is-invalid');
      } else {
        // 如果格式正確，則移除 is-invalid 類
        e.target.classList.remove('is-invalid');
      }
    }

    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  // 送出驗證信
  const sendVerificaitonEmail = async () => {
    axios({
      method: 'post',
      url: 'http://localhost/Allend/backend/public/api/emailverification-notification',
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then((res) => {
        setIsVerificationSent(true);
        setCountdown(60);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, setCountdown]);

  // 更新資料
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost/Allend/backend/public/api/updateprofiles',
      data: {
        identity: formData.identity,
        experience: formData.experience,
        location: formData.location,
        idCard: formData.idCard,
        phone: formData.phone,
        gender: formData.gender,
        area: formData.area,
        name: formData.name,
        fb: formData.fb,
        line: formData.line,
        about: formData.about,
      },
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
      .then(() => {
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <>
      <Container xxl={12} style={{ minHeight: '100vh', paddingTop: '1.5rem' }}>
        <Row>
          <Col sm={3}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={9}>
            <h2 className='text-center'>接案人資料維護</h2>
            <Form onSubmit={handleSubmit}>
              {/* 身分 */}
              <Form.Group as={Row}>
                <Form.Label column sm={5}>
                  接案人身分：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={7}>
                  <Row>
                    <Col sm={4}>
                      <Form.Check
                        type='radio'
                        name='identity'
                        id='freelancer'
                        label='個人'
                        value='freelancer'
                        checked={formData.identity === 'freelancer'}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={4}>
                      <Form.Check
                        type='radio'
                        name='identity'
                        id='company'
                        label='公司'
                        value='company'
                        checked={formData.identity === 'company'}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={4}>
                      <Form.Check
                        type='radio'
                        name='identity'
                        id='studio'
                        label='工作室'
                        value='studio'
                        checked={formData.identity === 'studio'}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              {/* 身分 */}

              {/* 年資、接案地點 */}
              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  累積年資：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Label column sm={6}>
                  接案地點：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
              </Form.Group>

              <Form.Group as={Row}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Form.Select
                      name='experience'
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option name='idn' value=''>
                        請選擇累積年資
                      </option>
                      <option name='idn' value='1'>
                        1 年
                      </option>
                      <option name='idn' value='2'>
                        2 年
                      </option>
                      <option name='idn' value='3'>
                        3 年
                      </option>
                      <option name='idn' value='4'>
                        4 年
                      </option>
                      <option name='idn' value='5'>
                        5 年以上
                      </option>
                    </Form.Select>
                  </div>
                  <div className='col-sm-6'>
                    <Form.Select
                      name='location'
                      value={formData.location}
                      onChange={handleChange}
                    >
                      <option value=''>請選擇地點</option>
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
                    </Form.Select>
                  </div>
                </div>
              </Form.Group>
              {/* 年資、接案地點 */}

              <br />
              <hr />
              {/* 身分證 */}
              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  身份證：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Label column sm={6}>
                  電子郵件：
                  {!emailVerified ? (
                    <>
                      {countdown > 0 ? (
                        <span
                          style={{
                            backgroundColor: 'whitesmoke',
                            padding: '0.5rem',
                          }}
                        >
                          等待重新發送({countdown})
                        </span>
                      ) : (
                        <span
                          style={{
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            padding: '0.5rem',
                            borderRadius: '10px',
                          }}
                          onClick={sendVerificaitonEmail}
                        >
                          發送驗證信件
                        </span>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </Form.Label>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={6}>
                  <Form.Control
                    type='text'
                    name='idCard'
                    placeholder='請輸入身分證'
                    value={formData.idCard}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={6}>
                  <div className='mt-2'>{formData.email}</div>
                </Col>
              </Form.Group>

              <br />

              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  真實姓名/公司名稱：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Label column sm={6}>
                  電話：<span style={{ color: 'red' }}>*</span>
                </Form.Label>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={6}>
                  <Form.Control
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              {/* 電子郵件、真實姓名 */}

              <br />

              {/* 性別 */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  性別：
                </Form.Label>
                <Col sm={4}>
                  <Form.Check
                    inline
                    type='radio'
                    label='男性'
                    name='gender'
                    id='male'
                    value='male'
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    type='radio'
                    label='女性'
                    name='gender'
                    id='female'
                    value='female'
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              {/* 性別 */}

              <br />

              {/* 所在地區 */}
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  所在地區：
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name='area'
                    value={formData.area}
                    onChange={handleChange}
                  >
                    <option value=''>請選擇所在地區</option>
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
                  </Form.Select>
                </Col>
              </Form.Group>
              {/* 所在地區 */}

              <Form.Group className='mt-3' as={Row}>
                <Form.Label>關於我：</Form.Label>
                <Form.Control
                  name='about'
                  as='textarea'
                  rows={5}
                  value={formData.about}
                  onChange={handleChange}
                />
              </Form.Group>

              <br />

              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  LINE連結：
                </Form.Label>
                <Form.Label column sm={6}>
                  FB連結：
                </Form.Label>
              </Form.Group>

              <Form.Group as={Row} className='pb-3'>
                <Col sm={6}>
                  <Form.Control
                    type='text'
                    name='line'
                    value={formData.line}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type='text'
                    name='fb'
                    value={formData.fb}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <Button
                  type='submit'
                  variant='primary'
                  style={{
                    width: '50%',
                    fontSize: '20px',
                    borderRadius: '.5rem',
                  }}
                >
                  提交
                </Button>
                <Button
                  variant='danger'
                  onClick={handleReset}
                  style={{ fontSize: '20px', borderRadius: '.5rem' }}
                >
                  重置
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className='text-center'>
          <Modal.Title>提交完成</Modal.Title>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant='primary' onClick={() => setShowModal(false)}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FreelancerInfoForm;

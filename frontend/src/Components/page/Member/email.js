import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LeftVerticalNavbar from "../../../RatingPage/LeftVerticalNavbar";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
import ClientForm from "./Perpetrator";

// 接案者基本資料
function FreelancerForm() {
  // const history = useHistory();

  const [formData, setFormData] = useState({
    identity: "",
    experience: "",
    location: "",
    idCard: "",
    email: "",
    name: "",
    phone: "",
    gender: "male",
    area: "",
    // selectedDate: new Date(),
    nickname: "",
  });

  const handleReset = () => {
    setFormData({
      identity: "",
      experience: "",
      location: "",
      idCard: "",
      email: "",
      name: "",
      phone: "",
      gender: "male",
      area: "",
      //   selectedDate: new Date(),
    });
    setIsSubmitted(false);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(true);
  const [showClientForm, setShowClientForm] = useState(false);

  useEffect(() => {
    // 检查表单是否完整
    const isComplete = Object.values(formData).every((value) => value !== "");
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "identity") {
      // 根据用户选择的身份类型来更新isFreelancer状态
      setIsFreelancer(value === "freelancer");
    }

    if (name === "idCard") {
      const firstCharIsValid = /^[A-Z]/.test(value[0]);
      // 檢查後九位是否全部為數字
      const lastNineDigitsAreNumeric = /^\d{9}$/.test(value.substring(1));

      // 如果長度超過10個字符，或者第一個字符不是英文，或者後九位不是數字，則顯示紅框
      if (value.length > 10 || !firstCharIsValid || !lastNineDigitsAreNumeric) {
        // 在表單控制元素中添加 is-invalid 類
        e.target.classList.add("is-invalid");
      } else {
        // 如果格式正確，則移除 is-invalid 類
        e.target.classList.remove("is-invalid");
      }
    }

    if (name === "email") {
      // 檢查是否包含 @ 字符
      const isValidEmail = value.includes("@");

      // 如果不包含 @ 字符，則顯示紅框
      if (!isValidEmail) {
        // 在表單控制元素中添加 is-invalid 類
        e.target.classList.add("is-invalid");
      } else {
        // 如果格式正確，則移除 is-invalid 類
        e.target.classList.remove("is-invalid");
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost/PHP/Allend/backend/public/api/updateprofiles",
      data: {
        identity: formData.identity,
        nickname: formData.nickname,
        experience: formData.experience,
        location: formData.location,
        idCard: formData.idCard,
        phone: formData.phone,
        gender: formData.gender,
        area: formData.area,
        // email: formData.email,
        name: formData.name,
      },
    });
    // 在這裡處理表單提交
    console.log(formData);

    // 设置表单提交完成的状态为true
    setIsSubmitted(true);
  };

  //   const handleDateChange = (date) => {
  //     // 获取当前日期
  //     const currentDate = new Date();

  //     // 如果选择的日期晚于当前日期，则将选择的日期设置为当前日期
  //     if (date > currentDate) {
  //       date = currentDate;
  //     }

  //     setFormData((prevState) => ({
  //       ...prevState,
  //       selectedDate: date,
  //     }));
  //   };

  const handleToggleForm = () => {
    setShowClientForm(!showClientForm); // 切换显示另一个表单的状态
  };

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <LeftVerticalNavbar />
        </Col>

        <Col sm={9}>
          {showClientForm ? null : (
            <h2 className="text-center">接案人資料維護</h2>
          )}

          {isSubmitted ? (
            <div className="text-center mt-3">提交完成</div>
          ) : (
            <>
              {showClientForm ? ( // 如果显示另一个表单，则渲染另一个表单组件
                <ClientForm />
              ) : (
                <Form onSubmit={handleSubmit}>
                  {/* 身分 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={6}>
                      接案人身分：
                    </Form.Label>
                    <Col sm={6} className="d-flex">
                      <Form.Check
                        type="radio"
                        name="identity"
                        id="freelancer"
                        label="個人"
                        value="freelancer"
                        checked={formData.identity === "freelancer"}
                        onChange={handleChange}
                      />

                      <Form.Check
                        type="radio"
                        name="identity"
                        id="company"
                        label="公司"
                        value="company"
                        checked={formData.identity === "company"}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  {/* 身分 */}

                  {/* 暱稱 */}
                  {isFreelancer && (
                    <Form.Group as={Row}>
                      <Form.Label column sm={6}>
                        暱稱：
                      </Form.Label>
                      {isFreelancer && (
                        <Col sm={6}>
                          <Form.Control
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="請輸入暱稱"
                          />
                        </Col>
                      )}
                    </Form.Group>
                  )}
                  {/* 暱稱 */}

                  {/* 年資、接案地點 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={6}>
                      累積年資：
                    </Form.Label>
                    <Form.Label column sm={6}>
                      接案地點：
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <div className="row">
                      <div className="col-sm-6">
                        <Form.Select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                        >
                          <option value="">請選擇累積年資</option>
                          <option value="1">1~5 年</option>
                          <option value="2">6~10 年</option>
                          <option value="3">10~15 年</option>
                          <option value="3">15 年以上</option>
                        </Form.Select>
                      </div>
                      <div className="col-sm-6">
                        <Form.Select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        >
                          <option value="">請選擇地點</option>
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
                      身份證：
                    </Form.Label>
                    {/* <Form.Label column sm={6}>
                    選擇出生日期：
                  </Form.Label> */}
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={6}>
                      <Form.Control
                        type="text"
                        name="idCard"
                        value={formData.idCard}
                        onChange={handleChange}
                      />
                    </Col>
                    {/* <Col sm={6}>
                    <DatePicker
                      selected={formData.selectedDate}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  </Col> */}
                  </Form.Group>

                  <br />

                  {/* 電子郵件、真實姓名 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={6}>
                      電子郵件：
                    </Form.Label>
                    <Form.Label column sm={6}>
                      真實姓名/公司名稱：
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={6}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col sm={6}>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  {/* 電子郵件、真實姓名 */}

                  <br />

                  {/* 電話；性別 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      電話：
                    </Form.Label>
                    <Col sm={4}>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Col>

                    <Form.Label column sm={2}>
                      性別：
                    </Form.Label>
                    <Col sm={4}>
                      <Form.Check
                        inline
                        type="radio"
                        label="男性"
                        name="gender"
                        id="male"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="女性"
                        name="gender"
                        id="female"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                  {/* 電話；性別 */}

                  <br />

                  {/* 所在地區 */}
                  <Form.Group as={Row}>
                    <Form.Label column sm={3}>
                      所在地區：
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                      >
                        <option value="">請選擇所在地區</option>
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
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  {/* 所在地區 */}

                  <br />

                  <Button
                    type="submit"
                    variant="danger"
                    style={{ width: "50%", margin: "0 auto", display: "block" }}
                    disabled={!isFormComplete}
                  >
                    提交
                  </Button>
                  <Button variant="secondary" onClick={handleReset}>
                    重置
                  </Button>
                  {/* <Button variant="primary" onClick={handlePageChange} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>切換</Button> */}
                </Form>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FreelancerForm;

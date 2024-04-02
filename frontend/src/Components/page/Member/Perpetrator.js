import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import LeftVerticalNavbar from "../../../RatingPage/LeftVerticalNavbar";
import Footer from "../../../homepage/Footer";
import axios from "axios";
import Cookies from "js-cookie";

// 發案人維護资料
function ClientForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [mobileError, setMobileError] = useState(false);
  const [EmailError, setEmailError] = useState(false);

  // useEffect(() => {
  //   // 检查表单是否完整
  //   const isComplete = Object.values(formData).every((value) => value !== "");
  //   setIsFormComplete(isComplete);
  // }, [formData]);

  useEffect(() => {
    const fetchData = async (complete) => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          "http://localhost/Allend/backend/public/api/demmandmem",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const isValidEmail = value.includes("@");
      if (!isValidEmail) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");

      if (onlyNums.length === 10 && onlyNums.startsWith("09")) {
        setMobileError(false);
      } else {
        setMobileError(true);
      }
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyNums,
      }));
      console.log(formData);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log(formData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/updatedemmand",
      data: {
        phone: formData.phone,
        name: formData.name,
      },
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // 设置表单提交完成的状态为true
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
    setIsSubmitted(false);
  };

  return (
    <>
      <Container xxl={12}>
        <Row>
          <Col sm={3} style={{ padding: "20px" }}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={9} style={{ padding: "20px" }}>
            <h2 className="text-center">發案人資料維護</h2>
            {isSubmitted ? (
              <div className="text-center mt-3">提交完成</div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formname">
                  <Form.Label>真實名字/公司名稱：</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="請輸入真實名字/公司名稱"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMobile">
                  <Form.Label>行動電話：</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="請輸入手機號碼"
                    // 根据手机号格式错误状态设置样式
                    isInvalid={mobileError}
                  />
                  {/* 显示手机号格式错误提示 */}
                  <Form.Control.Feedback type="invalid">
                    手機格式不正確 ,以09開頭 ,共10位數字。
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  {/* <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="請輸入Email"
                    isInvalid={EmailError}
                  /> */}
                  <p>{formData.email}</p>
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="danger"
                    style={{ width: "50%" }}
                    disabled={!isFormComplete}
                  >
                    提交
                  </Button>
                  <Button variant="secondary" onClick={handleReset}>
                    重置
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default ClientForm;

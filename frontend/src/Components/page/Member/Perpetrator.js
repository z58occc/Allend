import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import LeftVerticalNavbar from "../../../RatingPage/LeftVerticalNavbar";

// 發案人維護资料
function ClientForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    mobile: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [EmailError, setEmailError] = useState(false);

  useEffect(() => {
    // 检查表单是否完整
    const isComplete = Object.values(formData).every((value) => value !== "");
    setIsFormComplete(isComplete);
  }, [formData]);

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






    // 针对手机输入进行限制
    if (name === "mobile") {
      // 确保只输入数字
      const onlyNums = value.replace(/[^0-9]/g, "");
      // 检查手机号格式是否正确
      if (onlyNums.length === 10 && onlyNums.startsWith("09")) {
        setMobileError(false);
      } else {
        setMobileError(true);
      }
      setFormData((prevState) => ({
        ...prevState,
        [name]: onlyNums,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在这里处理表单提交
    console.log(formData);

    // 设置表单提交完成的状态为true
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      companyName: "",
      mobile: "",
      email: "",
    });
    setIsSubmitted(false);
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={2}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={10}>
            <h2 className="text-center">發案人資料維護</h2>
            {isSubmitted ? (
              <div className="text-center mt-3">提交完成</div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCompanyName">
                  <Form.Label>真實名字/公司名稱：</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="請輸入真實名字/公司名稱"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMobile">
                  <Form.Label>行動電話：</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formData.mobile}
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
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="請輸入Email"
                    isInvalid={EmailError}

                  />
                </Form.Group>

                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <Button
                    type="submit"
                    variant="danger"
                    style={{ width: "50%" }}
                    disabled={!isFormComplete}>
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
    </>
  );
}

export default ClientForm;

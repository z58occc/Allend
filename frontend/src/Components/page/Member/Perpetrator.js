import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

// 發案人填写资料
function ClientForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    mobile: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    // 检查表单是否完整
    const isComplete = Object.values(formData).every((value) => value !== "");
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <h2 className="text-center">發案人填寫资料</h2>
        {isSubmitted ? (
          <div className="text-center mt-3">提交完成</div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label>公司名稱：</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="請輸入公司名稱"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>行動電話：</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="请输入手機號碼"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入Email"
              />
            </Form.Group>

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
          </Form>
        )}
      </Container>
    </>
  );
}

export default ClientForm;

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import LeftVerticalNavbar from '../../../RatingPage/LeftVerticalNavbar';



// 发案人填写资料
function ClientForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        mobile: '',
        email: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);

    useEffect(() => {
        // 检查表单是否完整
        const isComplete = Object.values(formData).every(value => value !== '');
        setIsFormComplete(isComplete);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
            companyName: '',
            mobile: '',
            email: ''
        });
        setIsSubmitted(false);
    };

    return (
        <>
            <Container>
                <Row>
                    <Col sm={3}>
                        <LeftVerticalNavbar />
                    </Col>
                    <Col sm={9}>
                        <h2 className="text-center">发案人填写资料</h2>
                        {isSubmitted ? (
                            <div className="text-center mt-3">提交完成</div>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formCompanyName">
                                    <Form.Label>公司名称：</Form.Label>
                                    <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="请输入公司名称" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formMobile">
                                    <Form.Label>行动电话：</Form.Label>
                                    <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="请输入行动电话" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>电子邮件：</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="请输入电子邮件" />
                                </Form.Group>

                                <Button type="submit" variant="danger" style={{ width: '50%', margin: '0 auto', display: 'block' }} disabled={!isFormComplete}>提交</Button>
                                <Button variant="secondary" onClick={handleReset}>重置</Button>
                             
                            </Form>
                            
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ClientForm;
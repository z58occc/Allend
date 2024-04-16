import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        account: '',
        verificationCode: '',
        confirmVerificationCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', formData);
    };
    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center', /* 水平居中 */
        alignItems: 'center', /* 垂直居中 */
        height: '50vh' 
    };

    return (
        <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAccount">
                <Form.Label>帳號</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="請輸入帳號"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formVerificationCode">
                <Form.Label>驗證碼</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="請輸入驗證碼"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formConfirmVerificationCode">
                <Form.Label>確認驗證碼</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="請再次輸入驗證碼"
                    name="confirmVerificationCode"
                    value={formData.confirmVerificationCode}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                重寄驗證碼
            </Button>
            <Button variant="secondary" className="ml-2">
                取消
            </Button>
        </Form>
        </div>
    );
}

export default ForgotPassword;

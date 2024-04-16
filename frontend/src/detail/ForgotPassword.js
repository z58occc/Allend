import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import queryString from "query-string";


function ForgotPassword() {
    const parsed = queryString.parse(window.location.search);
    console.log(parsed);
    const { token } = useParams();
    const Email = parsed?.email;
    console.log(Email)
    const [formData, setFormData] = useState({
        email: Email,
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('token', token);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('password_confirmation', formData.confirm_password);


        const response = await fetch("http://127.0.0.1/Allend/backend/public/api/reset-password", {
            method: "POST",
            body: formDataToSend
        });
    };

    // CSS
    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
    };

    return (
        <div style={formContainerStyle}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAccount">
                    <Form.Label>帳號</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        name="email"
                        value={Email}
                        disabled={true}
                    />
                </Form.Group>

                <Form.Group controlId="formVerificationCode">
                    <Form.Label>新密碼</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="請輸入新密碼"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmVerificationCode">
                    <Form.Label>確認新密碼</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="請再次輸入新密碼"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    確認
                </Button>
                <Button variant="secondary" className="ml-2">
                    取消
                </Button>
            </Form>
        </div>
    );
}


export default ForgotPassword;

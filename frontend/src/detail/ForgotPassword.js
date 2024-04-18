import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import queryString from "query-string";


function ForgotPassword() {
    const navigate = useNavigate();
    const parsed = queryString.parse(window.location.search);
    const { token } = useParams();
    const Email = parsed?.email;
    const [err, setErr] = useState("");
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
    // 重置密碼
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
        if (response.status === 200) {
            alert('密碼重置成功!');
            navigate('/');
        } else {
            setErr("密碼不一致")
        }      
    };

    // 容器CSS
    const formContainerStyle = {
        display: 'flex',
        width: '100%',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
        // maxWidth: '00px'
    };

    const [showPWD, setShowPWD] = useState(false)
    // 管理密碼隱藏與否
    const handleHiddenPassword = () => {
        setShowPWD((prevShow) => !prevShow)
    }

    // 清空密碼
    const resetPWD = ()=> {
        setFormData({
            password: '',
            confirm_password: ''
        })
    }


    return (
        <div style={formContainerStyle}>
            <Form onSubmit={handleSubmit} >
                <h2 className='text-center'>重置密碼</h2>
                <Form.Group controlId="formAccount" className='mb-3'>
                    <Form.Label>帳號：</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={Email}
                        disabled={true}
                    />
                </Form.Group>

                <Form.Group controlId="formVerificationCode" className='mb-3'>
                    <Form.Label>新密碼：</Form.Label>
                    <Form.Control
                        type={showPWD ? "text" : "password"}
                        placeholder="請輸入至少8個字元"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmVerificationCode" className='mb-3'>
                    <Form.Label>確認新密碼：{err !== "" ? <span style={{color:'red'}}>{err}</span> : <></>}</Form.Label>
                    <Form.Control
                        type={showPWD ? "text" : "password"}
                        placeholder="請再次輸入新密碼"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className='text-center mb-3 rounded-5' onClick={handleHiddenPassword} style={{backgroundColor: 'blanchedalmond', cursor:'pointer'}}>
                    {showPWD ? <>隱藏密碼<IoMdEyeOff/></> : <>顯示密碼<IoMdEye/></>}
                </div>

                <Button variant="primary rounded-5" type="submit" onClick={handleSubmit}>
                    送出修改
                </Button>
                <Button variant="secondary rounded-5" className="ml-2" onClick={resetPWD}>
                    清空密碼
                </Button>
            </Form>
        </div>
    );
}


export default ForgotPassword;

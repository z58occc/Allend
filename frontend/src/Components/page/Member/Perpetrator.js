import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
//發案人資料
export function PerpetratorForm() {
    const [formData, setFormData] = useState({
        identity: '',
        nickname: '',
        experience: '',
        location: '',
        idCard: '',
        email: '',
        name: '',
        phone: '',
        gender: 'male',
        area: '',
        selectedDate: null
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Container>
            <h2 className="text-center">發案人填寫資料</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={12}>接案人身分：</Form.Label>
                    <Col sm={6}>
                        <Form.Check
                            type="radio"
                            name="identity"
                            id="freelancer"
                            label="個人"
                            value="freelancer"
                            checked={formData.identity === "freelancer"}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm={6}>
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
                {/* Add other form fields here */}
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
}

export default PerpetratorForm;

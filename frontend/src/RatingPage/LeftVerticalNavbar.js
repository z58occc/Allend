import React, { useState } from 'react';
import { Navbar, Nav, Image, Button, Modal, Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeftVerticalNavbar.css';
import member from './member.png';
import { Link } from "react-router-dom";



const LeftVerticalNavbar = () => {
    const navItems = [
        { link: '/member', text: '會員中心' },
        { link: '/email', text: '會員維護' },
        { link: '/services', text: '案件管理' },
        { link: '#contact', text: '服務管理' },
        { link: '#favorite', text: '收藏管理' },
    ];

    const [usermember, setUsermember] = useState({
        name: '會員',
        image: member // 默认头像
    });
    const [showModal, setShowModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const handleEditmember = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveImage = () => {
        if (imageFile) {
            setUsermember({ ...usermember, image: URL.createObjectURL(imageFile) });
            setShowModal(false);
        } else {
            alert('請選擇有效的圖片');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };





    return (

        <Navbar bg="light" variant="light" expand="lg" className="flex-column">

            <Button variant="link" onClick={handleEditmember} style={{ margin: 'auto' }}>
                <Image src={usermember.image} roundedCircle width="100" height="100" />
            </Button>

            <Navbar.Text style={{ fontSize: '20px' }}>{usermember.name}</Navbar.Text>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>修改頭像</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formImageFile">
                            <Form.Label>選擇圖片檔案</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={handleSaveImage}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-column">
                    {navItems.map((item, index) => {
                        if (index === 1 || index === 2) {
                            return (
                                <Accordion key={index} defaultActiveKey={0} className="no-arrow-accordion">
                                    <Accordion.Item eventKey={`${index}-1`}>
                                        <Accordion.Header>{item.text}</Accordion.Header>
                                        <Accordion.Body>
                                            {index === 1 ? (
                                                <div className="links-container">
                                                    <Link to="/switch" className="nav-link-no-arrow">資料維護</Link>
                                                    <br></br>
                                                    <Link to="/fix" className="nav-link-no-arrow">修改密碼</Link>
                                                </div>

                                            ) : (
                                                <div className="links-container">
                                                    <Link to="/commit" className="nav-link-no-arrow">發案紀錄</Link>
                                                    <br></br>
                                                    <Link to="/service" className="nav-link-no-arrow">接案紀錄</Link>
                                                </div>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            );
                        } else {
                            return (
                                <Nav.Link key={index} href={item.link} style={{ fontSize: '24px' }}>{item.text}</Nav.Link>
                            );
                        }
                    })}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};



export default LeftVerticalNavbar;

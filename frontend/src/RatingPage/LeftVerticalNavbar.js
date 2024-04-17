import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Image, Button, Modal, Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './LeftVerticalNavbar.module.css';
import member from './member.png';
import { FaCamera } from "react-icons/fa";




const LeftVerticalNavbar = () => {
    const navItems = [
        { link: '/member', text: '會員中心' },
        { link: '/email', text: '會員維護' },
        { link: '/services', text: '案件管理' },
        { link: '/manage', text: '服務管理' },
        { link: '/collect', text: '收藏管理' },
    ];

    const [usermember, setUsermember] = useState({
        name: '',
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
    const avatar = useRef();

    // 修改頭像
    const handleSaveImage = () => {
        const avatarFile = new FileReader();
        avatarFile.onload = (e) => {
            axios({
                method: "post",
                url: "http://localhost/Allend/backend/public/api/avatar",
                data: { image: e.target.result },
                headers: { Authorization: `Bearer ${Cookies.get('token')}`, 'Content-Type': 'multipart/form-data', },
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        avatarFile.readAsDataURL(avatar.current.files[0]);

        // const formData = new FormData();
        // formData.append('image', imageFile);
        // axios({
        //     method: 'post',
        //     url: "http://localhost/Allend/backend/public/api/avatar",
        //     data:formData,
        //     headers: {Authorization: `Bearer ${Cookies.get('token')}`},
        //     'Content-Type': 'multipart/form-data'
        // })
        // .then(response => console.log(response.data))
        // .then(blob => {
        //     // 將返回的二進制數據轉換為可顯示的圖片 URL
        //     const imageUrl = URL.createObjectURL(blob);
        //     setImageFile(imageUrl);
        // })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        if (imageFile) {
            setUsermember({ ...usermember, image: URL.createObjectURL(imageFile) });
            setShowModal(false);
        } else {
            alert('請選擇有效的圖片');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImageFile(file);
        }
    };
    // 獲取頭像、姓名
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("token");
                const headers = { Authorization: `Bearer ${token}` };
                const res = await axios.get(
                    "http://localhost/Allend/backend/public/api/avaname",
                    { headers: headers }
                );
                const result = await res.data;
                // const bidata = atob(result[0].image)

                // const bytes = new Uint8Array(bidata.length);
                // for (let i = 0; i < bidata.length; i++) {
                //   bytes[i] = bidata.charCodeAt(i);
                // }
                // const blob = new Blob([bytes]);
                // const fileUrl = URL.createObjectURL(blob);
                // setImageFile(fileUrl);
                setUsermember({ name: result[0].name, image: result[0].image });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);




    return (





        <Navbar bg="light" variant="light" expand="lg" className="flex-column">
            <div variant="link" className='mt-2' onClick={handleEditmember} style={{ position: 'relative' }}>
                <Image src={usermember.image === "" ? member : usermember.image} roundedCircle width="100" height="100" style={{ cursor: 'pointer' }} />
                < FaCamera
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        padding: '5px',
                        cursor: 'pointer',
                        fontSize: "24px"
                    }}
                    onClick={handleEditmember} // 添加点击事件
                />{/* <Image src={imageFile === "" ? member : imageFile} roundedCircle width="100" height="100" style={{cursor:'pointer'}}/> */}
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '10px' }}>{usermember.name === "" ? "會員" : usermember.name}</div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>修改頭像</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formImageFile">
                            <Form.Label>選擇圖片檔案</Form.Label>
                            <Form.Control type="file" accept="image/*" ref={avatar} onChange={handleFileChange} />
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
                <Nav className=" flex-column">
                    {navItems.map((item, index) => {
                        if (index === 1 || index === 2) {
                            return (
                                <Accordion key={index} defaultActiveKey={0} className="no-arrow-accordion" >
                                    <Accordion.Item eventKey={`${index}`}>
                                        <Accordion.Header
                                            className={`${styles.accHeader} bg-light`}
                                            style={{ backgroundColor: "#D0D0D0" }}
                                            
                                        >
                                            <span style={{fontSize:"32px",margin: 0}}>{item.text}</span>
                                        </Accordion.Header>

                                        <Accordion.Body style={{ backgroundColor: "#D0D0D0" }}>
                                            {index === 1 ? (
                                                <div className={`${styles.linksContainer}`}>
                                                    <Link to="/switch"  className="nav-link-no-arrow " >資料維護</Link>
                                                    <br />
                                                    <Link to="/fix" className="nav-link-no-arrow">修改密碼</Link>
                                                </div>
                                            ) : (
                                                <div className={`${styles.linksContainer}`}>
                                                    <Link to="/commit" className="nav-link-no-arrow">發案紀錄</Link>
                                                    <br />
                                                    <Link to="/service" className="nav-link-no-arrow">接案紀錄</Link>
                                                </div>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            );
                        } else {
                            return (
                                <Nav.Link key={index} href={item.link} style={{ fontSize: '24px', textAlign: 'center' }}>{item.text}</Nav.Link>
                            );
                        }
                    })}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};



export default LeftVerticalNavbar;

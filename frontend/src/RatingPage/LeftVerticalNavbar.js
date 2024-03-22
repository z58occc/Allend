import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeftVerticalNavbar.css';
import member from './member.png';



const LeftVerticalNavbar = () => {
    const navItems = [
        { link: '#home', text: '會員中心' },
        { link: '#about', text: '會員維護' },
        { link: '#services', text: '案件管理' },
        { link: '#contact', text: '服務管理' },
        { link: '#favorite', text: '收藏管理' },
      ];
    
      const userProfile = {
        name: '會員',
        // 填入您的大頭貼圖片 URL
      };
    return (
        <Navbar bg="light" variant="light" expand="lg" className="flex-column" style={{ width: '' }}>
            <Navbar.Brand>
            <Image src={member} roundedCircle className="mr-2" width="100" height="100" />
            </Navbar.Brand>
            <Navbar.Text style={{ fontSize: '20px' }}>{userProfile.name}</Navbar.Text>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-column">
                    {navItems.map((item, index) => {
                        if (index === 1 || index === 2) {
                            return (
                                <Accordion key={index} defaultActiveKey={`${index}-1`} className="no-arrow-accordion">
                                    <Accordion.Item eventKey={`${index}-1`}>
                                        <Accordion.Header>{item.text}</Accordion.Header>
                                        <Accordion.Body>
                                            {index === 1 ? (
                                                <div>
                                                    <Nav.Link href="/email" className="nav-link-no-arrow">資料維護</Nav.Link>

                                                    <Nav.Link href="/fix" className="nav-link-no-arrow">修改密碼</Nav.Link>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Nav.Link href="#push" className="nav-link-no-arrow">發案紀錄</Nav.Link>
                                                    <Nav.Link href="#accept" className="nav-link-no-arrow">接案紀錄</Nav.Link>
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

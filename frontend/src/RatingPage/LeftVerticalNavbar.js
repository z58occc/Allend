import React from 'react';
import { Navbar, Nav, NavbarText } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeftVerticalNavbar.css';
import { FaRegUser } from "react-icons/fa";


function LeftVerticalNavbar  ( {navItems, userProfile} )  {
    return (
        <Navbar bg="light" variant="light" expand="lg" className="flex-column" style={{ width: '250px' }}>
            <Navbar.Brand>
                <FaRegUser/>
            </Navbar.Brand>
            <NavbarText style={{ fontSize: '20px' }}>{userProfile && userProfile.name}</NavbarText>

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
                                                    <Nav.Link href="#data-maintenance" className="nav-link-no-arrow">資料維護</Nav.Link>
                                                    <Nav.Link href="#change-password" className="nav-link-no-arrow">修改密碼</Nav.Link>
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




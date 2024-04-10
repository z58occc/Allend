import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftVerticalNavbar from './LeftVerticalNavbar'; // 導覽列元件
import MainContent from './MainContent'; // 主要內容元件

const Layout = ({ navItems, userProfile }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="p-0">
          <LeftVerticalNavbar navItems={navItems} userProfile={userProfile} />
        </Col>
        <Col md={9}>
          {/* <MainContent /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;

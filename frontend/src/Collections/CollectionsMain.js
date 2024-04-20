import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import ServiceCollection from "./ServiceCollection";
import CaseCollection from "./CaseCollection";
import LeftVerticalNavbar from "../RatingPage/LeftVerticalNavbar";
import Footer from "../homepage/Footer";
import './Collection.module.css';


const CollectionsMain = () => {

  const [activeScreen, setActiveScreen] = useState("case"); // 當前顯示的主畫面
  const handleScreenChange = (tab) => { // 改變顯示主畫面
    setActiveScreen(tab)
  }
  // 資料初始化 (案件、服務)
  const [caseDate, setCaseData] = useState([]);
  const [serviceData, setServiceData] = useState([])
  // 更新資料
  const handleUpdateData = (updatedData, screen) => {
    screen === 1 ? setCaseData(updatedData) : setServiceData(updatedData)
  }
  // 撈案件、服務收藏資料
  const fetchData = async () => {
    const result = await axios.get(
      "http://localhost/Allend/backend/public/api/collection",
      {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      }
    );
    setCaseData(result.data.case);
    setServiceData(result.data.service);
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <Container>
        <Row>

          <Col sm={3} style={{ paddingTop: "62px" }}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={9} style={{ padding: "20px"}}>
              {/* <Container fluid style={{}}> */}
                {/* 上方頁籤 */}
                <Row className="">
                  <Col>
                    <Nav variant="tabs" defaultActiveKey="case">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="case"
                          onClick={() => handleScreenChange("case")}
                          style={{}}
                        >
                          案件收藏
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link
                          eventKey="service"
                          onClick={() => handleScreenChange("service")}
                        >
                          服務收藏
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                {/* 下方主畫面區域 */}
                  <Col md={12} >
                    {activeScreen === "case" && (
                      <CaseCollection data={caseDate} dataUpdate={handleUpdateData}/>
                    )}
                    {activeScreen === "service" && (
                      <ServiceCollection data={serviceData} dataUpdate={handleUpdateData}/>
                    )}
                  </Col>
                </Row>
              {/* </Container> */}
          </Col>

        </Row>
      </Container>
    <Footer></Footer>
    </>
  );
};


export default CollectionsMain;

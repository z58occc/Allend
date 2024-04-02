import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
// import SearchPage from './SearchPage';
import Screen3 from "./Screen3";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import LeftVerticalNavbar from "../RatingPage/LeftVerticalNavbar";
export const CaseContext = createContext();
const MainScreen2 = () => {
  const [activeScreen, setActiveScreen] = useState("screen1"); // 當前顯示的主畫面

  const handleScreenChange = (screenName) => {
    setActiveScreen(screenName);
  };
  const [Case, setCase] = useState({
    demmand_published: [
      {
        did: 0,
        d_name: "",
        type: "",
        d_amount: 0,
        d_unit: "",
        d_duration: "",
        active_location: "",
        d_description: "",
        d_contact_name: "",
        d_email: "",
        d_mobile_phone: "",
        updated_at: "",
      },
    ],
    demmand_progress: [
      {
        cid: 0,
        c_name: "",
        type: "",
        c_amount: 0,
        c_unit: "",
        c_duration: "",
        active_location: "",
        c_description: "",
        c_contact_name: "",
        c_email: "",
        c_mobile_phone: "",
        created_at: "",
      },
    ],
    demmand_completed: [
      {
        cid: 0,
        c_name: "",
        type: "",
        c_amount: 0,
        c_unit: "",
        created_at: "",
        completed_time: "",
      },
    ],
  });
  // http://127.0.0.1/Allend/public/api/mempublishcase
  const fetchData = async () => {
    const result = await axios.get(
      "http://127.0.0.1/Allend/backend/public/api/mempublishcase?mid=5",
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setCase(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(Case);

  return (
    <CaseContext.Provider value={{ Case, setCase, fetchData }}>
      <Container xxl={12}>
        <Row>
          <Col sm={3} style={{ padding: "20px" }}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={2}>
            <Container fluid style={{ width: "800px" }}>
              {/* 上方按鈕區域 */}
              <Row className="mb-3">
                <Col>
                  <Nav variant="tabs" defaultActiveKey="screen1">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="screen1"
                        onClick={() => handleScreenChange("screen1")}
                      >
                        未接案數
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="screen2"
                        onClick={() => handleScreenChange("screen2")}
                      >
                        進行中
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="screen3"
                        onClick={() => handleScreenChange("screen3")}
                      >
                        已結案
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>

              {/* 主畫面區域 */}
              <Row>
                <Col md={12}>
                  {/* 右側主畫面區域 */}
                  {activeScreen === "screen1" && (
                    <Screen1 data={Case.demmand_published} />
                  )}
                  {activeScreen === "screen2" && (
                    <Screen2 data={Case.demmand_progress} />
                  )}
                  {activeScreen === "screen3" && (
                    <Screen3 data={Case.demmand_completed} />
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </CaseContext.Provider>
  );
};

// 畫面1、畫面2、畫面3 等 component 的定義...

export default MainScreen2;

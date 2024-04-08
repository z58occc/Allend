import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Screen1 from "./Screen1";
import LeftVerticalNavbar from "../RatingPage/LeftVerticalNavbar";
export const CaseContext = createContext();
const MainScreen3 = () => {
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
      "http://127.0.0.1/Allend/backend/public/api/mempublishcase",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
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
            <Container fluid style={{ width: "900px" }}>
              {/* 主畫面區域 */}
              <Row>
                <Col md={12}>
                    <Screen1/>
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

export default MainScreen3;

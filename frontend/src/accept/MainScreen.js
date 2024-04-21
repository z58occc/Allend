import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, createContext } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import SearchPage from './SearchPage';
import Screen3 from "./Screen3";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import LeftVerticalNavbar from "../RatingPage/LeftVerticalNavbar";
import Footer from "../homepage/Footer";

export const CaseContext = createContext();
const MainScreen = () => {
  const [activeScreen, setActiveScreen] = useState("screen1"); // 當前顯示的主畫面
  const handleScreenChange = (screenName) => {
    setActiveScreen(screenName);
  };

  const [Case, setCase] = useState({
    Quote: [
      {
        d_name: "",
        q_amount: 0,
      },
    ],
    CaseInProgress: [
      {
        c_name: "",
        c_amount: 0,
      },
    ],
    CaseCompleted: [
      {
        c_name: "",
        c_amount: 0,
      },
    ],
  });

  const fetchData = async () => {
    try{
      const result = await axios.get(
        "http://127.0.0.1/Allend/backend/public/api/memtakecase",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setCase(result.data);
    }catch (err){
      console.log(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(Case);

  return (
    <>
    <CaseContext.Provider value={ {Case, setCase, fetchData} }>
      <Container xxl={12} style={{paddingTop: '1.5rem'}}>
        <Row>
          <Col sm={3}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={2}>
            <Container fluid style={{ width: "800px" }}>
            <h2 className="text-center" style={{borderBottom: '2px solid black'}}>接案紀錄</h2>

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
                  {activeScreen === "screen1" && <Screen1 data={Case.Quote} />}
                  {activeScreen === "screen2" && (<Screen2 data={Case.CaseInProgress} />)}
                  {activeScreen === "screen3" && (<Screen3 data={Case.CaseCompleted} />)}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </CaseContext.Provider>
    <Footer/>
    </>
  );
};

// 畫面1、畫面2、畫面3 等 component 的定義...

export default MainScreen;

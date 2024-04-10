import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Screen1 from "./Screen1";
import LeftVerticalNavbar from "../RatingPage/LeftVerticalNavbar";
export const CaseContext = createContext();
const MainScreen3 = () => {
  const [Service, setService] = useState({
    service: [
      {
        "sid": 0,
        "image": "",
        "s_name": "",
        "type": "",
        "s_description": "",
        "s_amount": 0,
        "s_unit": "",
        "s_active_location": "",
        "updated_at": ""
      },
    ],
    project: [
      {
        "pid": 5,
        "image": " ",
        "p_name": "心靈顧問",
        "p_description": "1對1式心靈開導",
        "updated_at": "2024/03/22"
      },
    ],
    video : [
      {
        "vid": 9,
        "src": "https://www.youtube.com/watch?v=XH3_TXjyhks",
        "v_name": "網站設計",
        "v_description": "網站設計",
        "updated_at": "2024/03/22"
      }
    ]
  });
  //
  const fetchData = async () => {
    const result = await axios.get(
      "http://127.0.0.1/Allend/backend/public/api/memservice",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    setService(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(Service);

  return (
    <CaseContext.Provider value={{ fetchData }}>
      <Container>
        <Row>
          <Col sm={3} style={{ padding: "20px" }}>
            <LeftVerticalNavbar />
          </Col>

          <Col sm={9}>
            {/* <Container fluid > */}
              <Row>
                  <Screen1 data={Service}/>
              </Row>
            {/* </Container> */}
          </Col>
        </Row>
      </Container>
    </CaseContext.Provider>
  );
};

// 畫面1、畫面2、畫面3 等 component 的定義...

export default MainScreen3;

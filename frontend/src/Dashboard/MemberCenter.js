import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Dashoboard from "./Dashoboard";
import Rating from "./Rating";
import LeftVerticalNavbar from "../layouts/UserPage/LeftVerticalNavbar";
import Footer from "../layouts/Footer";
import axios from "axios";
import Cookies from "js-cookie";


// 會員中心
function MemberCenter() {
  const [caseNum, setCaseNum] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          "http://localhost/Allend/backend/public/api/dashboard",
          { headers: headers }
        );
        const result = await res.data;
        setCaseNum(result);
      } catch (err) {
        console.log(err)
        if(err.response.status === 401){
          // return <Navigate to='/switch'></Navigate>
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container xxl={12} style={{minHeight: '100vh'}}>
        <div className="row">
          <div className="col-lg-3" style={{paddingTop: '1.5rem'}}>
            <LeftVerticalNavbar />
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-12">
                <Dashoboard data={caseNum} width="" fontSize="20px" />
              </div>
              <div className="col-lg-12">
                <Rating ratingData={caseNum} fontSize="20px" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default MemberCenter;

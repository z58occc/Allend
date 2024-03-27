import GridComponent from './GridComponent';
import Rating from './Rating';
import LeftVerticalNavbar from './LeftVerticalNavbar';
import Footer from '../homepage/Footer';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//會員中心
function RatingPage() {
  const [caseNum, setCaseNum] = useState([]);
  const [caseCom, setCaseCom] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(
          "http://localhost/PHP/Allend/backend/public/api/dashboard",
          { headers: headers }
        );
        const result = await res.data;
        setCaseNum(result);
        setCaseCom(result.slice(6,9))
        console.log(result)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const lines = [
    { title: "案數", number: 5, path: "#home" },
    { title: "結案數", number: 5, path: "#home" },
    { title: "進行中", number: 5, path: "#home" },
  ];

  const line2 = [
    { title: "接案方評價", rating: 5, message: 100 },
    { title: "發案方評價", rating: 4, message: 100 },
  ];

  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2" style={{padding:"20px"}}>
            <LeftVerticalNavbar />
          </div>
          <div className="col-lg-10">
            <div class="row">
              <div class="col-lg-12">
                <GridComponent data={caseNum} width="" fontSize="20px" />
              </div>
             
              <div className="col-lg-12">
                <div style={{ width: '100%' }}>
                  <Rating lines={line2} fontSize="20px" />
                </div>
              </div>
            
            </div>
          </div>
        </div>
      <Footer></Footer>
      </div>
    </>
  );
}

export default RatingPage;

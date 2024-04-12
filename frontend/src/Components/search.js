import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Search() {
  const [post, setPosts] = useState([]);

  useEffect(() =>{
    const fetchData = (index) => {
      fetch("http://127.0.0.1/Allend/backend/public/api/index?did=")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = 0; i < 9; i++) {
            data.service[i].d_name = data.demmand[i]["d_name"];
            data.service[i].d_amount = data.demmand[i]["d_amount"];
            data.service[i].did = data.demmand[i]["did"];
            data.service[i].d_active_location = data.demmand[i]["d_active_location"];
            data.service[i].d_created_at = data.demmand[i]["created_at"];
            data.service[i].project_image = data.project[i]["image"];
          }
          setPosts(data);
          console.log(data)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  },[])



  return (
    <>

        <div className='container mt-5'>
          <Row style={{ border: "solid black", padding: 0 }}>
          <Col id="link" xs={2} style={{ borderRight: "solid black", fontSize: "15px" }}>
            <Link to={`/casecontext/?`} style={{ textDecoration: "none", color: "black", textAlign: "start" }}>
              <div style={{ marginTop: "10px" }}></div>
              <div >案件類別：</div>
              <div >預算：&nbsp;/&nbsp;</div>
              <div >地點：</div>
              <div >期</div>
            </Link>
          </Col>
          <Col xs={6} >
            <div style={{ marginTop: "10px" }}></div>
          </Col>
          <Col >

          </Col>
          <Col xs={1} style={{ backgroundColor: "white" }}>
            <div style={{ textAlign: "start", fontSize: "13px", marginTop: "20px" }}>
              <div></div>
              <div >人報價中</div>
              <div >刊登時間：</div>
              <div></div>
            </div>
            <div >
              <Button style={{ width: "70px", height: "30px ", fontSize: "10px", }} >我要報價</Button>
            </div>
          </Col>
        </Row>
        </div>
        



      {/* 頁尾 */}
      <Footer></Footer>
      {/* 頁尾 */}

    </>



  )
}

export default Search
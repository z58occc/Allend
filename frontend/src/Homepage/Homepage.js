import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "../layouts/Footer";
import Category from "../Components/Category";
import { BegginerBanner } from "./BegginerBanner";
import NewestService from "./NewestService";
import NewestPost from "./NewestPost";
import FeaturedWork from "./FeaturedWork";
import BackToTop from "./BackToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/App.css";
import "./Homepage.css";


function Homepage() {
  // 儲存最新服務、最新刊登、作品
  const [newService, setNewService] = useState([])
  const [newPublish, setNewPublish] = useState([])
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1/Allend/backend/public/api/index")
      .then((response) => response.json())
      .then((data) => {
        setNewService(data.service)
        setNewPublish(data.demmand)
        setProjects(data.project)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <>
      <Container className="noto-serif">
        <div>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </div>

        {/* 分類 */}
        <Category />

        {/* 新手教學 */}
        <BegginerBanner />

        {/* 最新服務 */}
        <NewestService newService={newService}/>

        {/* 最新刊登 */}
        <NewestPost newPublish={newPublish} />

        {/* 輪播圖 */}
        <FeaturedWork projects={projects} />

        <BackToTop />
      </Container>

      <Footer />
    </>
  );
}

export default Homepage;

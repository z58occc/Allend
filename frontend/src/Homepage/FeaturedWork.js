import React, { useState } from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


// 精選作品
function FeaturedWork({ projects }) {
  // 最新服務 刊登 接API
  const [activeProduct, setActiveProduct] = useState();
  const [change, setChange] = useState(false);
  const [carouselpage, setCarouselpage] = useState(0);
  const handleSelect = (selectedIndex) => {
    setCarouselpage(selectedIndex);
  };

  return (
    <>
      <h4 className="text-center fw-bolder">精選作品</h4>
      <div className="d-flex justify-content-center mt-4" >
        <Carousel
          activeIndex={carouselpage}
          onSelect={handleSelect}
          style={{
            overflow: " hidden",
            background: "linear-gradient( #A3D1D1,#D1E9E9 ,#95CACA,#B3D9D9)",
            width: "750px",
            height: "275px",
            borderRadius: "10px"
          }}
          id="carousel"
          interval={5000}
          indicators={true}
          controls={true}
          prevIcon={
            <span style={{ color: "black", fontSize: "4rem" }}>‹</span>
          }
          nextIcon={
            <span style={{ color: "black", fontSize: "4rem" }}>›</span>
          }
        >
          {projects.map((post, index) => {
            return (
              <Carousel.Item key={index}>
                <Row className="justify-content-md-center">
                  <Col xs lg="6" style={{ padding: "0px" }}>
                    <img src={change === true ? `${activeProduct}` : `data:image/jpeg;base64,${post.image}`} alt="" 
                    style={{ maxWidth: "100%", marginTop: "10px", marginBottom: "10px" }} />
                  </Col>
                  <Col xs lg="2" className="d-flex justify-content-center align-items-center" style={{ padding: "0px" }}>
                    <Link className="links" to={`./talent/${post.mid}`} style={{ fontSize: "20px", position: "relative", left: "30px" }}>
                      <span >{post.name}</span>
                    </Link>
                  </Col>
                </Row>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </div>
    </>
  )
}

export default FeaturedWork
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// 最新服務
function NewestService({ newService }) {
  return (
    <>
      <h4 className="mt-5 fw-bolder">最新服務</h4>
      <div className="d-flex justify-content-center">
        <div className="posts-container" style={{ display: "flex" }}>
          {newService.map((post, index) => {
            return (
              <Row key={index} style={{ margin: "30px" }}>
                <Col style={{ flexGrow: 1 }}>
                  <Link
                    to={`./serve/${post.mid}/${post.sid}`}
                    className="card links"
                    style={{ width: "100%", fontSize: "10px" }}
                  >
                    <div className="card-header ">
                      <img
                        src={`data:image/jpeg;base64,${post.image}`}
                        alt={`${index + 1}`}
                        style={{
                          height: 200,
                          width: "200px",
                          display: "block",
                        }}
                      ></img>
                    </div>
                    <div className="card-body">
                      <div style={{ fontSize: "17px" }}>{`【${post.s_name}】`}</div>
                      <div style={{ fontSize: "14px", color: "#FF5151" }}>${post.s_amount} / 件</div>
                      <hr></hr>
                      <div style={{ fontSize: "15px" }}>{post.name}</div>
                    </div>
                    <div style={{ fontSize: "12px" }} className="card-footer ">{post.created_at}</div>
                  </Link>
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default NewestService
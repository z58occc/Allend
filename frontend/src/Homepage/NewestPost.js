import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// 最新刊登
function NewestPost({ newPublish }) {
  return (
    <>
      <h4 className="mt-3 fw-bolder">最新刊登</h4>
      <div className="row mt-3" >
        <div className="mb-4 container" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex" }}>
            {newPublish.map((post, index) => {
              return (
                <Row key={index} style={{ margin: "1.5rem" }}>
                  <Col>
                    <Link className="links" to={`./casecontext/${post.did}`} style={{ width: "30%" }} >
                      <div className="toast show">
                        <div className="toast-header">
                          <strong className="me-auto">
                            <div>{post.d_name}</div>
                            <div>預算：{post.d_amount}&nbsp;/&nbsp;{post.d_unit}</div>
                          </strong>
                        </div>
                        <div className="toast-body">
                          <div>刊登日期：{post.created_at}</div>
                          <div>地點：{post.d_active_location}</div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default NewestPost
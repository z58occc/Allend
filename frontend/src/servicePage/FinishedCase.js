import React, { useState } from "react";
import { Card } from "react-bootstrap";
import StarRating from "./StarRating";
import { Button, Modal } from "react-bootstrap";

const FinishedCase = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handleModalShow = (key) => {
    setShowModal(true);
    setSelectedDataKey(key);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDataKey(0);
  };
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {data.map((caseData, index) => (
        <Card
          key={index}
          id={index}
          className="my-3"
          style={{ width: "720px", height: "150px", display: "flex" }}
          onClick={() => handleModalShow(index)}
        >
          <div class="d-flex bd-highlight">
            <Card.Body style={{ flex: "1" }}>
              <Card.Text>開始日期：{caseData.startDate}</Card.Text>

              <Card.Title>{caseData.caseName}</Card.Title>
              <hr style={{ background: "black" }}></hr>
              <div class="d-flex justify-content-between">
                <Card.Text>結案日期：{caseData.endDate}</Card.Text>
                <Card.Text>金額：{caseData.amount}</Card.Text>
                <Card.Text>人數：{caseData.count}</Card.Text>
              </div>
            </Card.Body>
            <div className="d-flex flex-column justify-content-center">
              <StarRating rating={caseData.rating}></StarRating>
            </div>
          </div>
        </Card>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>案件資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container" style={{ fontSize: "18px" }}>
            <div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>案件編號：</strong> {data[selectedDataKey].caseNumber}
              </div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>案件名稱：</strong>
                {data[selectedDataKey].caseName}
              </div>
            </div>
            <div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>案件類別：</strong> {data[selectedDataKey].caseCategory}
              </div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>預算金額：</strong> {data[selectedDataKey].budgetAmount}
              </div>
            </div>
            <div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>接案人姓名：</strong>
                {data[selectedDataKey].contractorName}
              </div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>接案人Email：</strong>
                {data[selectedDataKey].contractorEmail}
              </div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <strong>接案人手機：</strong>
                {data[selectedDataKey].contractorPhone}
              </div>
              <div
                className="col"
                style={{ marginBottom: "10px", fontSize: "20px" }}
              >
                <label>輸入評價：</label>
                <div style={{ margin: "0 40px 0 40px" }}>
                  <textarea maxLength={100} rows={5} cols={30} />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="mb-2 d-flex justify-content-around">
            <Button variant="primary" size="lg">
              評價提交
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              關閉
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FinishedCase;

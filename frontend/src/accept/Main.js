import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Main = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const caseData = {
    caseNumber: '12345',
    caseName: '範例案件',
    caseCategory: '建築',
    budgetAmount: '$100,000',
    location: '台北市',
    schedule: '2024-04-01 至 2024-06-30',
    contractorName: '王小明',
    contractorEmail: 'wang@example.com',
    contractorPhone: '0912345678',
  };

  return (
    <div className="text-center">
      <Button variant="primary" onClick={handleModalShow}>
        打開彈出視窗
      </Button>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>案件資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <strong>案件編號:</strong> {caseData.caseNumber}
              </div>
              <div className="col">
                <strong>案件名稱:</strong> {caseData.caseName}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>案件類別:</strong> {caseData.caseCategory}
              </div>
              <div className="col">
                <strong>預算金額:</strong> {caseData.budgetAmount}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>地點:</strong> {caseData.location}
              </div>
              <div className="col">
                <strong>案件期程:</strong> {caseData.schedule}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>接案人姓名:</strong> {caseData.contractorName}
              </div>
              <div className="col">
                <strong>接案人 Email:</strong> {caseData.contractorEmail}
              </div>
              <div className="col">
                <strong>接案人手機:</strong> {caseData.contractorPhone}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Main;

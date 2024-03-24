import {React, useContext }from 'react';
import { Modal, Button } from 'react-bootstrap';
import CaseContext from './CaseContext.js';
const CaseDetailsModal2 = ({ show, onHide}) => {
  const {Case} = useContext(CaseContext);
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ fontSize: '18px' }}>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件編號:</strong> {Case[0].caseNumber}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件名稱:</strong> {Case[0].caseName}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件類別:</strong> {Case[0].caseCategory}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>預算金額:</strong> {Case[0].budgetAmount}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>地點:</strong> {Case[0].location}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件期程:</strong> {Case[0].startDate+"~"+Case[0].endDate}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人姓名:</strong> {Case[0].contractorName}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人 Email:</strong> {Case[0].contractorEmail}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人手機:</strong> {Case[0].contractorPhone}
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            聯絡接案人
          </Button>
          <Button variant="secondary" size="lg">
            已收到案件
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CaseDetailsModal2;

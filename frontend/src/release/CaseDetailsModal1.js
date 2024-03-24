import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CaseContext from './CaseContext.js'
// import { useState } from 'react';
const CaseDetailsModal = ({ show, onHide}) => {
  const {Case} = useContext(CaseContext);
  return (
    <Modal show={show} onHide={onHide} style={{ width: '450px', marginInline: '550px' }}>
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
              <strong>案件名稱:</strong>
              {Case[0].caseName}

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
              <strong>案件期程:</strong> {Case[0].startDate+"~"+ Case[0].endDate}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件說明:</strong>
              <div className="col">
                <textarea cols="30" rows="5" name="message" placeholder="" maxLength="150" wrap="soft" >
                  
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 d-flex justify-content-around">
          <Button variant="primary" size="lg" >
            儲存變更
          </Button>
          <Button variant="secondary" size="lg" onClick={onHide}>
            取消
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CaseDetailsModal;

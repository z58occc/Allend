import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import { useState } from 'react';
const CaseDetailsModal = ({ show, onHide, caseData, onUpdateCase}) => {
  // const [editedCase, setEditedCase] = useState(caseData);
  // console.log(caseData)

  // const handleUpdateCase = () => {
  //   onUpdateCase(editedCase);
  //   onHide(); // 關閉 Modal
  // };

  
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ fontSize: '18px' }}>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件編號:</strong> {caseData.caseNumber}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件名稱:</strong> 
              <input value={123}></input>
              
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件類別:</strong> {caseData.caseCategory}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>預算金額:</strong> {caseData.budgetAmount}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>地點:</strong> {caseData.location}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件期程:</strong> {caseData.schedule}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人姓名:</strong> {caseData.contractorName}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人 Email:</strong> {caseData.contractorEmail}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人手機:</strong> {caseData.contractorPhone}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <Button variant="primary" size="lg" >
            儲存變更
          </Button>
          <Button variant="secondary" size="lg" onClick={onHide}>
            取消
          </Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CaseDetailsModal;

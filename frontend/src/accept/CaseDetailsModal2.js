import {React}from 'react';
import { Modal, Button } from 'react-bootstrap';

const CaseDetailsModal2 = ({ show, onHide ,number,data}) => {
  
  return (
    <>
    {data.length === 0 
    ? " "
    :
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ fontSize: '18px' }}>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件編號:</strong> 
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件名稱:</strong>
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件類別:</strong>
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件地點:</strong> 
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件金額:</strong>{data[number].c_amount}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>發案人姓名:</strong> 
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>發案人Email:</strong> 
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>發案人手機:</strong> 
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            聯絡案主
          </Button>
          <Button variant="secondary" size="lg">
            提交案件
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>}
    </>
  );
};

export default CaseDetailsModal2;

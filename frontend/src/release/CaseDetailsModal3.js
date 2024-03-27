import {React}from 'react';
import { Modal, Button } from 'react-bootstrap';

const CaseDetailsModal3 = ({ show, onHide,data}) => {
  
  return (
    <Modal show={show} onHide={onHide}>
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
                <strong>預算金額:</strong> 
              </div>
            </div>
            <div>
              <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                <strong>接案人姓名</strong> 
              </div>
              <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                <strong>接案人Email:</strong> 
              </div> 
              <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                <strong>接案人手機:</strong> 
              </div>
              <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                <label >輸入評價:</label>
                <div style={{margin:'0 40px 0 40px'}}>
                  <textarea
                
                maxLength={100}
                rows={5}
                cols={30}
                
              /></div>
                </div>


            </div>
            <div>


            </div>
          </div>
          <div className="mb-2 d-flex justify-content-around">
            <Button variant="primary" size="lg" >
              評價提交
            </Button>
            <Button variant="secondary" onClick={onHide}>
              關閉
            </Button>
          </div>
        </Modal.Body>
      </Modal>
  );
};

export default CaseDetailsModal3;
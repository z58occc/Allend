import React, { useContext ,useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import CaseContext from './CaseContext.js'
const CaseDetailsModal = ({ show, onHide, number }) => {
  const {Case,setCase} = useContext(CaseContext);
  const [inputValue, setInputValue] = useState(Case[number].caseName);
  console.log(Case[number].caseName)
  console.log(inputValue);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSetCase = ()=>{
    const updatedCase = [...Case]; // 複製一份 Case 狀態陣列
    updatedCase[number].caseName = inputValue; // 更新案件名稱
    setCase(updatedCase); // 使用 setCase 更新整個 Case 狀態
    console.log(inputValue)
    console.log(Case[number].caseName)
    console.log(updatedCase[number].caseName)
    onHide(); // 關閉 Modal
  }
  return (
    <Modal show={show} onHide={onHide} style={{ width: '450px', marginInline: '550px' }}>
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container" style={{ fontSize: '18px' }}>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件編號:</strong> 
              {Case[number].caseNumber}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件名稱:</strong>
              <input id='input' value={inputValue} type='text' onChange={handleInputChange}></input>

            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件類別:</strong> {Case[number].caseCategory}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>預算金額:</strong> {Case[number].budgetAmount}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>地點:</strong> {Case[number].location}
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件期程:</strong> {Case[number].startDate+"~"+ Case[number].endDate}
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
          <Button variant="primary" size="lg" onClick={handleSetCase}>
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

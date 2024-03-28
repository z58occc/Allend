import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import CaseContext from './CaseContext.js'
const CaseDetailsModal = ({ show, onHide, number ,data}) => {
  // const {Case} = useContext(CaseContext);

  // const [inputValue, setInputValue] = useState(Case['Quote'][number].q_amount);
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const handleSetCase = ()=>{
  //   const updatedCase = [...Case]; // 複製一份 Case 狀態陣列
  //   updatedCase[number].q_amount = inputValue; // 更新案件名稱
  //   setCase(updatedCase); // 使用 setCase 更新整個 Case 狀態
  //   console.log(inputValue)
  //   console.log(Case[number].q_amount)
  //   console.log(updatedCase[number].q_amount)
  //   onHide(); // 關閉 Modal
  // }
  return (
    <>
    {data.length === 0 
    ? " "
    :
    <Modal show={show} onHide={onHide} style={{ width: '450px', marginInline: '550px' }}>
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
              <strong>報價金額:</strong>
                {data[number].q_amount}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>接案人留言:</strong>
              <div className="col">
                <input cols="30" rows="5" name="message" placeholder="" maxLength="150" wrap="soft" >
                  
                </input>
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
    </Modal>}
    </>
  );
};

export default CaseDetailsModal;

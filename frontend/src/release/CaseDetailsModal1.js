import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import CaseContext from './CaseContext.js'
const CaseDetailsModal = ({ show, onHide, number ,data}) => {
  // const {Case,setCase} = useContext(CaseContext);
  // const [inputValue, setInputValue] = useState(data[number].d_name);
  // console.log(data[number].d_name)
  // console.log(inputValue);
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const handleSetCase = ()=>{
  //   const updatedCase = [...data]; // 複製一份 data 狀態陣列
  //   updatedCase[number].d_name = inputValue; // 更新案件名稱
  //   setCase(updatedCase); // 使用 setCase 更新整個 data 狀態
  //   console.log(inputValue)
  //   console.log(data[number].d_name)
  //   console.log(updatedCase[number].d_name)
  //   onHide(); // 關閉 Modal
  // }
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
              
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件名稱:</strong>
              {/* <input id='input' value={inputValue} type='text' onChange={handleInputChange}></input> */}

            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件類別:</strong> 
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>預算金額:</strong> {data[number].d_amount}
            </div>
          </div>
          <div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>地點:</strong> 
            </div>
            <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
              <strong>案件期程:</strong> 
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
          <Button variant="primary" size="lg" onClick={()=>{}}>
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

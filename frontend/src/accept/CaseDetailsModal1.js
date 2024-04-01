import React,{ useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
// import CaseContext from './CaseContext.js'
const CaseDetailsModal = ({ show, onHide, number, data }) => {
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
  const [Quote, setQuote] = useState("");
  const [messages, setMessages] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

  };
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
                  <strong>案件編號：</strong> {data[number].qid}

                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件名稱：</strong>{data[number].d_name}


                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件類別：</strong> {data[number].q_amount}
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件地點：</strong> {data[number].active_location}
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>案件描述：</strong> {data[number].d_description}
                </div>
              </div>
              <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人姓名：</strong>
                  {data[number].d_contact_name}
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人Email：</strong>
                  {data[number].d_email}
                </div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>發案人電話：</strong>
                  {data[number].d_mobile_phone}
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="Quote">
                    <Form.Label>報價金額：</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="請輸入報價金額"
                      value={data[number].q_amount}
                      onChange={(e) => setQuote(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="messages">
                    <Form.Label>接案人留言：</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="請輸入最少十個字"
                      // value= {data[number].q_amount}
                      onChange={(e) => setMessages(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Form>
                {/* <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>報價金額：</strong>
                  {data[number].q_amount}
                </div> */}
              </div>
              {/* <div>
                <div className="col" style={{ marginBottom: '10px', fontSize: '20px' }}>
                  <strong>接案人留言：</strong>
                  <div className="col">
                    <input cols="30" rows="5" name="message" placeholder="" maxLength="150" wrap="soft" >

                    </input>
                  </div>
                </div>
              </div> */}
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
        </Modal>}
    </>
  );
};

export default CaseDetailsModal;

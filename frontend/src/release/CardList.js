import React, { useContext, useState } from 'react';
import { Card, Button, Form, Modal,Table} from 'react-bootstrap';
import SearchPage from './SearchPage';
import CaseDetailsModal1 from './CaseDetailsModal1'
import CaseDetailsModal2 from './CaseDetailsModal2';
import CaseContext from './CaseContext';
const CardList = ({visibility,selectedComponent,text}) => {
  const {Case} = useContext(CaseContext)
  const [checked, setChecked] = useState(false);
  // 控制key回傳對應Modal
  // const [selectedDataKey, setSelectedDataKey] = useState(0);
  // 全選功能
  const [selectedItems, setSelectedItems] = useState([false,false,false]); //設置selectedItems為空陣列，裡面為被選到的index值
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);   
    const allSelected = newSelectedItems.every((item) => item);
    setChecked(allSelected);
  };
  const handleToggleAll = () => {
    const allSelected = !checked;
    setChecked(allSelected);
    const newSelectedItems = Case.map(() => allSelected);
    setSelectedItems(newSelectedItems);
  };
  // 案件詳情Modal
  const [showModal1, setShowModal1] = useState(false)
  
  // 子元件編輯查看
  const handleModalShow1 = () => {
    setShowModal1(true);
  }
  const handleModalClose1 = () => {
    setShowModal1(false);
  }
  // 查看報價按鈕控制
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowQuoteModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  // CardList選擇子元件
  let ComponentToRender;
  if (selectedComponent === 'component1') {
    ComponentToRender = <CaseDetailsModal1 show={showModal1} onHide={handleModalClose1}/> ;
  } else if (selectedComponent === 'component2') {
    ComponentToRender = <CaseDetailsModal2 show={showModal1} onHide={handleModalClose1}/>;
  }
  

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div className="d-flex justify-content-around" style={{ width: '800px', visibility }} >
        
        <Button variant="primary" style={{ fontSize: '12px', width: '110px', whiteSpace: 'nowrap'}} onClick={handleToggleAll}>
          {checked ? '取消全選' : '全選'}
        </Button>
        <Button variant="danger" style={{ fontSize: '12px', width: '100px' }}>
          刪除
        </Button>
        <SearchPage />
      </div>
      {Case.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }}>
              <Card.Text>開始日期: {item.startDate}</Card.Text>
              <Form.Check
                type="checkbox"
                className="align-self-center"
                style={{ marginRight: '50px' ,visibility}}
                checked={selectedItems[index] || false} 
                onChange={() => handleChecked(index)} 
              />
              <Card.Title>{item.caseName}</Card.Title>
              <hr style={{ background: 'black' }} />
              <div className="d-flex justify-content-between">
                <Card.Text>截止日期: {item.endDate}</Card.Text>
                <Card.Text>金額: {item.amount}</Card.Text>
                <Card.Text>人數: {item.count}</Card.Text>
              </div>
            </Card.Body>
            <div className="d-flex flex-column justify-content-center" >
              <Button variant="primary"  className="my-2" style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap'}} onClick={() => handleModalShow1()} >
                {text}
              </Button>
              <Button
                key={index}
                variant="secondary" 
                className="my-2 d-inline-block"
                style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center',visibility }}
                onClick={() => handleShowQuoteModal(item)}
              >
                查看報價
              </Button>
            </div>
          </div>
        </Card>
      ))}



      {/* 查看報價Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
          <Modal.Title>查看報價 - {selectedItem && selectedItem.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>案件名稱</th>
                <th>接案人姓名</th>
                <th>Email</th>
                <th>族群</th>
                <th>報價金額</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows for quote items */}
              <tr>
                <td>1</td>
                <td>項目名稱</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>
                  <div class="d-flex justify-content-start">
                    <Button variant="secondary" style={{ fontSize: '12px', whiteSpace: 'nowrap'}}>接受</Button>
                    <Button variant="danger" style={{ fontSize: '12px', whiteSpace: 'nowrap'}}>拒絕</Button>
                    <Button variant="secondary" style={{ fontSize: '12px', whiteSpace: 'nowrap'}}>聊聊</Button>
                  </div>
                  
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
      
      {ComponentToRender}
    </div>
  );
};

export default CardList;

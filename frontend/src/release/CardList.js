import React, { useState } from 'react';
import { Card, Button, Form, Modal,Table} from 'react-bootstrap';
import SearchPage from './SearchPage';

const CardList = ({visibility}) => {
  const [checked, setChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState([false,false,false]); //設置selectedItems為空陣列，裡面為被選到的index值

  const handleChecked = (index) => {
    
    const newSelectedItems = [...selectedItems];
    console.log(newSelectedItems);
    newSelectedItems[index] = !newSelectedItems[index];
    console.log(newSelectedItems);

    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
    
    const allSelected = newSelectedItems.every((item) => item);
    console.log(allSelected)
    setChecked(allSelected);
  };

  const handleToggleAll = () => {
    const allSelected = !checked;
    setChecked(allSelected);

 
    const newSelectedItems = data.map(() => allSelected);
    setSelectedItems(newSelectedItems);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const data = [
    {
      title: '案件1',
      startDate: '2024/03/20',
      endDate: '2024/04/10',
      amount: 'NTD$ 5000',
      count: 5,
    },
    {
      title: '案件2',
      startDate: '2024/03/25',
      endDate: '2024/04/15',
      amount: 'NTD$ 8000',
      count: 8,
    },
    {
      title: '案件3',
      startDate: '2024/03/25',
      endDate: '2024/04/15',
      amount: 'NTD$ 8000',
      count: 8,
    },
    {
      title: '案件3',
      startDate: '2024/03/25',
      endDate: '2024/04/15',
      amount: 'NTD$ 8000',
      count: 8,
    },
  ];
  

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
      {data.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }}>
              <Card.Text>開始日期: {item.startDate}</Card.Text>
              <Form.Check
                type="checkbox"
                className="align-self-center"
                style={{ marginRight: '50px' }}
                checked={selectedItems[index] || false} 
                onChange={() => handleChecked(index)} 
              />
              <Card.Title>{item.title}</Card.Title>
              <hr style={{ background: 'black' }} />
              <div className="d-flex justify-content-between">
                <Card.Text>截止日期: {item.endDate}</Card.Text>
                <Card.Text>金額: {item.amount}</Card.Text>
                <Card.Text>人數: {item.count}</Card.Text>
              </div>
            </Card.Body>
            <div className="d-flex flex-column justify-content-center">
              <Button variant="primary" className="my-2" style={{ width: '110px', fontSize: '12px' }}>
                編輯
              </Button>
              <Button
                variant="secondary"
                className="my-2 d-inline-block"
                style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center' }}
                onClick={() => handleShowModal(item)}
              >
                查看報價
              </Button>
            </div>
          </div>
        </Card>
      ))}
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
    </div>
  );
};

export default CardList;

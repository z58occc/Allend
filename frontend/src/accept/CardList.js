import React from 'react';
import { Card, Button} from 'react-bootstrap';
import SearchPage from './SearchPage';
import Pagination from 'react-bootstrap/Pagination';
const CardList = ({visibility}) => {

  

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
    {
      title: '案件4',
      startDate: '2024/03/25',
      endDate: '2024/04/15',
      amount: 'NTD$ 8000',
      count: 8,
    },
    
  ];
  function handleShowModal(){
    
  }
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
  }
  

  return (
    <div className="d-flex flex-wrap justify-content-around">
      
      <div className="d-flex justify-content-end" style={{ width: '800px', visibility }} >
        <SearchPage />
      </div>
      {data.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }}>
              <Card.Text>開始日期: {item.startDate}</Card.Text>
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
                棄件
              </Button>
            </div>
          </div>
        </Card>
        
      ))}
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default CardList;

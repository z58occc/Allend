import React from 'react';
import { Card} from 'react-bootstrap';
import StarRating from './StarRating';


const FinishedCase = ({data}) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {data.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }}>
          <div class="d-flex bd-highlight"><Card.Body style={{ flex: '1' }}>
            <Card.Text>開始日期: {item.startDate}</Card.Text>
    
          <Card.Title>{item.title}</Card.Title>
            <hr style={{ background: "black" }}></hr>
            <div class="d-flex justify-content-between">
              <Card.Text>結案日期: {item.endDate}</Card.Text>
              <Card.Text>金額: {item.amount}</Card.Text>
              <Card.Text>人數: {item.count}</Card.Text></div>

          </Card.Body>
            <div className="d-flex flex-column justify-content-center">
              <StarRating rating={item.rating} ></StarRating>
            </div>
            </div>

        </Card>
      ))}
    </div>
  );
};

export default FinishedCase; 
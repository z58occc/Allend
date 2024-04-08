import React, { useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";

const Provider = () => {
  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      data.push({
        id: i + 1,
        title: `Title ${i + 1}`,
        content: `Content ${i + 1}`,
      });
    }
    return data;
  };

//
  const [data] = useState(generateRandomData());
  const [selectedItems, setSelectedItems] = useState(Array(data.length).fill(false));
  const [checkedAll, setCheckedAll] = useState(false);


  const handleToggleAll = () => {
    setCheckedAll(!checkedAll);
    setSelectedItems(Array(data.length).fill(!checkedAll));
  };

//
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    setCheckedAll(newSelectedItems.every((item) => item));
  };
//
  return (
    <div style={{ width: '100%', background: 'lightblue', outline: '1px solid black', height: '600px' }}>
      <div className="d-flex flex-wrap justify-content-around" style={{ height: '100%' ,marginTop:"10px" }}>
        <div className="d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
          <Button
            variant="success"
            style={{ fontSize: "12px", width: "100px", height: '100%' }}
            onClick={() => { /* Missing delete functionality handler */ }}
          >
            新增  
          </Button>
          <Button
            variant="primary"
            style={{ fontSize: "12px", width: "100px", whiteSpace: "nowrap", height: '100%' }}
            onClick={handleToggleAll}
          >
            {checkedAll ? "取消全選" : "全選"}
          </Button>
          <Button
            variant="danger"
            style={{ fontSize: "12px", width: "100px", height: '100%' }}
            onClick={() => {}}
          >
            刪除
          </Button>
        </div>
        {/* DATA */}
        {data.map((item, index) => (
          <Card
            key={index}
            className="my-3"
            style={{ width: "720px", height: "95px", display: "flex"}}
          >
            <div className="d-flex bd-highlight">
              <Card.Body style={{ flex: "1" }}>
                <Card.Title style={{ marginBottom: "0px" }}>
                    <Form.Check
                    type="checkbox"
                    className="align-self-center"
                    style={{ margin:'10px 10px 15px 20px'}}
                    checked={selectedItems[index] || false}
                    onChange={() => handleChecked(index)}
                    />
                    <span style={{margin:"10px 30px 15px 30px"}}>{item.title}</span>
                </Card.Title> 
                
                <Card.Text style={{ fontSize: '18px' }}>{item.content}</Card.Text>
                {/* {} */}
              </Card.Body>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Provider;





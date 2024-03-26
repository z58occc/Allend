import React, { useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import SearchPage from './SearchPage';
import CaseDetailsModal1 from './CaseDetailsModal1'
import CaseDetailsModal2 from './CaseDetailsModal2';
import StarRating from './StarRating';
// import CaseContext from './CaseContext';
const CardList = ({visibility,selectedComponent,data,screen}) => {
  
  // 控制key回傳對應Modal
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index)=>{
    setSelectedDataKey(index);
    console.log(index);
  }
 
  
  // 案件詳情Modal
  const [showModal1, setShowModal1] = useState(false)
  
  // 子元件編輯查看
  const handleModalShow1 = () => {
    setShowModal1(true);
  }
  const handleModalClose1 = () => {
    setShowModal1(false);
  }
  
  
  // CardList選擇子元件
  let ComponentToRender;
  if (selectedComponent === 'component1') {
    ComponentToRender = <CaseDetailsModal1 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={data}/> ;
  } else if (selectedComponent === 'component2') {
    ComponentToRender = <CaseDetailsModal2 show={showModal1} onHide={handleModalClose1} number={selectedDataKey}/>;
  }
  

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div className="d-flex justify-content-around" style={{ width: '800px', visibility }} >
        <SearchPage/>
      </div>
      {data.length === 0 ? <h2>未有紀錄</h2>   : data.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }}>
              <Card.Text>開始日期: </Card.Text>
              <Card.Title>{(screen === 1 && item.d_name) || (screen === 2 && item.c_name) || (screen === 3 && item.c_name)}</Card.Title>
              <hr style={{ background: 'black' }} />
              <div className="d-flex justify-content-between">
                <Card.Text>截止日期: </Card.Text>
                <Card.Text>金額: {(screen === 1 && item.q_amount) || (screen === 2 && item.c_amount) || (screen === 3 && item.c_amount)}</Card.Text>
                <Card.Text>人數: </Card.Text>
              </div>
            </Card.Body>
            {screen ===3  ? 
            <div className="d-flex flex-column justify-content-center">
              <StarRating rating={item.demmand_star} ></StarRating>
            </div>:

            <div className="d-flex flex-column justify-content-center" >
              <Button variant="primary" key={index} className="my-2" style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap',visibility}} onClick={() => {handleModalShow1(); handlesetSelectedDataKey(index)}} >
                編輯
              </Button>
              <Button
                variant="secondary" 
                className="my-2 d-inline-block"
                style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center',visibility }}
                onClick={()=>{}}
              >
                棄件
              </Button>
            </div>}
            
          </div>
        </Card>
      ))}



      
      
      {ComponentToRender}
    </div>
  );
};

export default CardList;

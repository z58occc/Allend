import React, { useContext, useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import SearchPage from './SearchPage';
import CaseDetailsModal1 from './CaseDetailsModal1'
import CaseDetailsModal2 from './CaseDetailsModal2';
import CaseDetailsModal3 from './CaseDetailsModal3';
import StarRating from './StarRating';
import Cookies from 'js-cookie';
import { CaseContext } from './MainScreen';
// import CaseContext from './CaseContext';
const CardList = ({visibility,selectedComponent,text,data1,screen}) => {
  const CaseData = data1
  // 控制key回傳對應Modal
  
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index)=>{
    setSelectedDataKey(index);
    console.log(index);
  }
  //
  const {fetchData} = useContext(CaseContext);
 
  
  // 案件詳情Modal
  const [showModal1, setShowModal1] = useState(false)
  
  // 子元件編輯查看
  const handleModalShow1 = () => {
    setShowModal1(true);
  }
  const handleModalClose1 = () => {
    setShowModal1(false);
    setSelectedDataKey(0);
  }
  //棄件
  const handleDeleted = (qid) => {
    fetch('http://127.0.0.1/Allend/backend/public/api/delmembertakecase',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        qid : qid,
      })
    })
    .then(() => {
       fetchData();
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  // CardList選擇子元件
  let ComponentToRender;
  if (selectedComponent === 'component1') {
    ComponentToRender = <CaseDetailsModal1 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData}/> ;
  } else if (selectedComponent === 'component2') {
    ComponentToRender = <CaseDetailsModal2 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData}/>;
  } else if (selectedComponent === 'component3') {
    ComponentToRender = <CaseDetailsModal3 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData}/>;
  }
  

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div className="d-flex justify-content-end" style={{ width: '800px', visibility }} >
        <SearchPage></SearchPage>
      </div>
      {
      // CaseData.length === 0 ? <h2>未有紀錄</h2>   
       CaseData.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '720px', height: '150px', display: 'flex' }} onClick = {
          () => {
          if (screen === 3) {
              handleModalShow1();
              handlesetSelectedDataKey(index);
          }
        }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }}>
              <Card.Text> {(screen === 1 && <>建立日期：{item.created_at}</>) || (screen === 2 && <>建立日期：{item.created_at}</>) || (screen === 3 && <>建立日期：{item.created_at}</>)}</Card.Text>
              <Card.Title>{(screen === 1 && item.d_name) || (screen === 2 && item.c_name) || (screen === 3 && item.c_name)}</Card.Title>
              <hr style={{ background: 'black' }} />
              <div className="d-flex justify-content-between">
                <Card.Text>{screen === 3 ? <>完成日期：{item.completed_time}</> : <>合作期程：{item.c_duration || item.d_duration}</>}</Card.Text>
                <Card.Text> {(screen === 1 &&<>預算： {item.q_amount}/{item.d_unit} </>) || (screen === 2 && <>成交金額：{item.c_amount}/{item.c_unit}</>) || (screen === 3 && <>成交金額：{item.c_amount}/{item.c_unit}</>)}</Card.Text>
              </div>
            </Card.Body>
            {screen === 3  ? 
            <div className="d-flex flex-column justify-content-center">
              <StarRating rating={1} ></StarRating>
            </div>:

            <div className="d-flex flex-column justify-content-center" >
              <Button variant="primary" key={index} className="my-2" style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap'}} onClick={() => {handleModalShow1(); handlesetSelectedDataKey(index)}} >
                {text}
              </Button>
              <Button
                variant="secondary" 
                className="my-2 d-inline-block"
                style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center',visibility }}
                onClick={()=>{handleDeleted(item.qid)}}
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

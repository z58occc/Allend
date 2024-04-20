import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import SearchPage from './SearchPage';
import CaseDetailsModal1 from './CaseDetailsModal1'
import CaseDetailsModal2 from './CaseDetailsModal2';
import CaseDetailsModal3 from './CaseDetailsModal3';
import StarRating from './StarRating';
import Cookies from 'js-cookie';
import { CaseContext } from './MainScreen';
// import CaseContext from './CaseContext';
const CardList = ({ visibility, selectedComponent, text, data1, screen }) => {
  const { fetchData } = useContext(CaseContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermProgress, setSearchTermProgress] = useState('');
  const [searchTermCompleted, setSearchTermCompleted] = useState('');
  const CaseData = data1;
  // 控制key回傳對應Modal

  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index) => {
    setSelectedDataKey(index);
    console.log(index);
  }
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  //刪除MODAL
  const handleDeletedModal = () => {
    setShowDeletedModal(true);
  }
  const handleClosedDeletedModal = () => {
    setShowDeletedModal(false);
  }
  //
  const handleSearch = (searchTerm) => {
    switch (screen) {
      case 1:
        setSearchTerm(searchTerm);
        break;
      case 2:
        setSearchTermProgress(searchTerm);
        break;
      case 3:
        setSearchTermCompleted(searchTerm);
        break;
      default:
        setSearchTerm(searchTerm);
    }
  };

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
    fetch('http://127.0.0.1/Allend/backend/public/api/delmembertakecase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        qid: qid,
      })
    })
      .then(() => {
        handleClosedDeletedModal()
        fetchData();
      })
      .catch((error) => {
        console.log(error)
      })

  }
  // CardList選擇子元件
  let ComponentToRender;
  if (selectedComponent === 'component1') {
    ComponentToRender = <CaseDetailsModal1 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData} searchTerm={searchTerm} onSearch={handleSearch} />;
  } else if (selectedComponent === 'component2') {
    ComponentToRender = <CaseDetailsModal2 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData} searchTerm={searchTerm} onSearch={handleSearch} />;
  } else if (selectedComponent === 'component3') {
    ComponentToRender = <CaseDetailsModal3 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData} searchTerm={searchTerm} onSearch={handleSearch} />;
  }
  let filteredData = CaseData;
  switch (screen) {
    case 1:
      if (searchTerm) {
        filteredData = CaseData.filter(item => item.d_name.includes(searchTerm));
      }
      break;
    case 2:
      if (searchTermProgress) {
        filteredData = CaseData.filter(item => item.c_name.includes(searchTermProgress));
      }
      break;
    case 3:
      if (searchTermCompleted) {
        filteredData = CaseData.filter(item => item.c_name.includes(searchTermCompleted));
      }
      break;
    default:
      filteredData = CaseData;
  }
  // 
  if (!CaseData || CaseData.length === 0) {
    return (<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      未有紀錄
    </h1>)
  }


  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div className="d-flex justify-content-end" style={{ width: '800px' }} >
        <SearchPage onSearch={handleSearch} searchTerm={screen === 2 ? searchTermProgress : screen === 3 ? searchTermCompleted : searchTerm}></SearchPage>
      </div>
      {
        // CaseData.length === 0 ? <h2>未有紀錄</h2>   
        filteredData.map((item, index) => (
          <Card key={index} className="my-3" style={{ width: '720px', display: 'flex', borderRadius: '.5rem' }}>
            <div className="d-flex bd-highlight">
              <Card.Body style={{ flex: '1' }}>
                {screen === 3 ? <Card.Title style={{ marginBottom: "0px" }}>{item.c_name}</Card.Title> : <></>}
                {(screen === 1 && <Card.Text>建立日期：{item.created_at}</Card.Text>) || (screen === 2 && <Card.Text>建立日期：{item.created_at}</Card.Text>) || (screen === 3 && <Card.Text style={{ marginBottom: "0px" }} >案主評分：<StarRating rating={item.asdemmand_star} ></StarRating></Card.Text >)}
                {(screen === 1 && <Card.Title>{item.d_name}</Card.Title>) || (screen === 2 && <Card.Title>{item.c_name}</Card.Title>) || (screen === 3 && <></>)}
                {screen === 3 ? <><hr style={{ background: 'black', margin: '3px auto' }} /><Card.Text style={{ fontSize: '18px' }}>{item.demmand_comment}</Card.Text> </> : <hr style={{ background: 'black' }} />}
                <div className="d-flex justify-content-between">
                  <span>{screen === 3 ? <>評論日期：{item.completed_time}</> : <>合作期程：{item.c_duration || item.d_duration}</>}</span>
                  <span> {(screen === 1 && <>預算： {item.q_amount}/{item.d_unit} </>) || (screen === 2 && <>成交金額：{item.c_amount}/{item.c_unit}</>) || (screen === 3 && <>成交金額：{item.c_amount}/{item.c_unit}</>)}</span>
                </div>
              </Card.Body>
              {screen === 2
                &&
                <div className="d-flex flex-column justify-content-center" style={{ height: "150px" }}>
                  <Button variant="primary" key={index} className="my-2" style={{
                    width: '110px', fontSize: '18px', whiteSpace: 'nowrap', marginTop: "auto",
                    marginBottom: "40px",
                    padding: "0.8rem 1rem",
                    borderRadius: "10px"
                  }} onClick={() => { handleModalShow1(); handlesetSelectedDataKey(index) }} >
                    查看詳情
                  </Button>
                </div>
              }
              {screen === 1
                &&
                <div className="d-flex flex-column justify-content-center" >
                  <Button variant="success" key={index} className="my-2" style={{ width: '110px', fontSize: '18px', whiteSpace: 'nowrap', marginTop: "auto", marginBottom: "40px", padding: "0.8rem 1rem", borderRadius: "10px" }} onClick={() => { handleModalShow1(); handlesetSelectedDataKey(index) }} >
                    編輯
                  </Button>
                  <Button
                    variant="secondary"
                    className="my-2 d-inline-block"
                    style={{ width: '110px', fontSize: '18px', whiteSpace: 'nowrap', textAlign: 'center', visibility, padding: "0.8rem 1rem" ,borderRadius: "10px" }}
                    onClick={() => { handleDeletedModal() }}
                  >
                    棄件
                  </Button>
                </div>
              }
              {screen === 3 && (
                <div className="d-flex flex-column justify-content-center">
                  <Button
                    variant="primary"
                    key={index}
                    className="my-2"
                    style={{
                      width: item.service_comment ? "120px" : "110px", fontSize: '18px', whiteSpace: 'nowrap', padding: "0.8rem 1rem",
                      borderRadius: '15px',
                      marginTop: "auto",
                      marginBottom: "40px"
                    }}

                    onClick={() => { handleModalShow1(); handlesetSelectedDataKey(index) }}
                    disabled={item.service_comment ? true : false}
                  >
                    {item.service_comment ? '已提出評論' : '提出評論'}
                  </Button>
                </div>
              )}

            </div>
            {/* 棄件MODAL */}
            <Modal show={showDeletedModal} onHide={handleClosedDeletedModal} centered size="sm">
              <Modal.Header closeButton>
                <Modal.Title>{/* 標題內容 */}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                確定捨棄此案件?
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => { handleDeleted(item.qid) }}>
                  確定
                </Button>
                <Button variant="secondary" onClick={handleClosedDeletedModal}>
                  關閉
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        ))}




      {ComponentToRender}
    </div>
  );
};

export default CardList;

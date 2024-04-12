import React, { createContext, useContext, useState } from 'react';
import { Button, Card, Form, Col, Row, Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Cookies from "js-cookie";
import CaseDetailsModal2 from './CaseDetailsModal2';
import { CaseContext } from "./MainScreen3";
import EditModal2 from './EditModal2';


export const WorkContext = createContext();


const Work = ({ data2 }) => {
  console.log(data2);
  // 
  const { fetchData } = useContext(CaseContext);
  const CaseData = data2;
  const [selectedItems, setSelectedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [checkedAll, setCheckedAll] = useState(false);
  // Handle select all / deselect all
  const handleToggleAll = () => {
    setCheckedAll(!checkedAll);
    setSelectedItems(Array(data2.length).fill(!checkedAll));
  };

  // Handle individual selection
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    setCheckedAll(newSelectedItems.every((item) => item));
  };
  //
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }
  //編輯Modal;
  const [index, setIndex] = useState(0);
  const [show1, setShow1] = useState(false);
  const handleShow1 = (index) => {
    setShow1(true);
    setIndex(index);
  }
  const handleClose1 = () => {
    setShow1(false);
  }
  //刪除


  const [deletedIndex, setDeletedIndex] = useState([]);

  let deletedData = [];
  let didOfDeletedData = [];

  const handleDeleted = async () => {
    const deletedIndices = [];
    selectedItems.forEach((item, index) => {
      if (item === true) {
        deletedIndices.push(index);
      }
    });
    setDeletedIndex(deletedIndices);

    deletedData = CaseData.filter((item, index) => deletedIndices.includes(index));
    // 從CaseData中過濾掉已刪除的項目
    const updatedCaseData = CaseData.filter((item, index) => !deletedIndices.includes(index));

    
    didOfDeletedData = deletedData.map(item => item.pid);
    
    try {
      const response = await fetch("http://127.0.0.1/Allend/backend/public/api/delwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify
        (
          {
            pid: didOfDeletedData,
          }
        ),
      });
      console.log(didOfDeletedData)
      
      fetchData();
      // 根據更新後的CaseData長度更新selectedItems和checkedAll狀態
      setSelectedItems(Array(updatedCaseData.length).fill(false));
      setCheckedAll(false);
      // setSelectedItems([false])
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Handle successful response, such as updating the page or other operations

    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle error cases, such as displaying error messages or other handling
    }
  };
  //分頁
  console.log(data2)
  const [active, setActive] = useState(1);
  let items = [];
  const handleSetActive = (number) => {
    setActive(number)
  }
  // 
  const CasePerPage = 6;
  const page = Math.ceil(data2.length / CasePerPage);
  console.log(page);
  data2 = data2?.slice(CasePerPage * (active - 1), CasePerPage * active)
  console.log(data2);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }

  if (!CaseData || CaseData.length === 0) {
    return (
      <div style={{ width: '100%', background: 'lightpink', height: '800px' }}>

        <div className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            未有紀錄，點此按鈕新增
          </h1>
          <Button
            variant="success"
            style={{ fontSize: "12px", width: "100px", height: '100%' }}
            onClick={() => { handleShow() }}
          >
            新增
          </Button>
          <CaseDetailsModal2 show={show} onHide={handleClose}></CaseDetailsModal2>
        </div>

      </div>
    )
  }
  return (
    <div style={{ width: '100%', background: 'lightpink ', height: '800px' }}>
      <Container className="d-flex flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
        <Row className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
          <Button
            variant="success"
            style={{ fontSize: "12px", width: "100px", height: '100%' }}
            onClick={() => { handleShow() }}
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
            onClick={() => { handleDeleted() }}
          >
            刪除
          </Button>
        </Row>
        {/* Generate six Cards */}
        <Row style={{ width: '1000px' }} className='justify-content-center'>
          {data2.map((item, index) => (
            <Col key={index} style={{}} className='mb-3 col-4 d-flex justify-content-center'>
              <Card style={{ width: "240px" }}>
                <Card.Img variant="top" src={`data:image/jpeg;base64,${item.image}`} alt={`${index + 1}`} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="d-flex ">
                  <Card.Title>
                    <Form.Check
                      type="checkbox"
                      checked={selectedItems[index] || false}
                      onChange={() => handleChecked(index)}
                      style={{ margin: "0 10px 3px 10px" }}
                    /> <span style={{ margin: "0 20px" }}>{item.p_name}</span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}

          <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
        </Row>

      </Container>
      <WorkContext.Provider value={{setSelectedItems, setCheckedAll}}>
        <CaseDetailsModal2 show={show} onHide={handleClose}></CaseDetailsModal2>
      </WorkContext.Provider> 
      <EditModal2 show={show1} onHide={handleClose1} data={CaseData} index={index}></EditModal2>
    </div>
  );
};

export default Work;

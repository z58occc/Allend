import React, { createContext, useContext, useState } from 'react';
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import YouTubeEmbed from '../Components/youtube';
import CaseDetailsModal3 from './CaseDetailsModal3';
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen3";
import EditModal3 from './EditModal3';
import Pagination from 'react-bootstrap/Pagination';
export const MediaContext = createContext();
const Media = ({ data3 }) => {

  const { fetchData } = useContext(CaseContext);
  const CaseData = data3;
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
    setSelectedItems(Array(data3.length).fill(!checkedAll));
  };

  // Handle individual selection
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    setCheckedAll(newSelectedItems.every((item) => item));
  };
  //新增
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

    didOfDeletedData = deletedData.map(item => item.vid);

    try {
      const response = await fetch("http://127.0.0.1/Allend/backend/public/api/delvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify
          (
            {
              vid: didOfDeletedData,
            }
          ),
      });
      console.log(didOfDeletedData)

      fetchData();
      // 根據更新後的CaseData長度更新selectedItems和checkedAll狀態
      setSelectedItems(Array(updatedCaseData.length).fill(false));
      setCheckedAll(false);
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
  console.log(data3)
  const [active, setActive] = useState(1);
  let items = [];
  const handleSetActive = (number) => {
    setActive(number)
  }
  // 
  const CasePerPage = 6;
  const page = Math.ceil(data3.length / CasePerPage);
  console.log(page);
  data3 = data3?.slice(CasePerPage * (active - 1), CasePerPage * active)
  console.log(data3);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (!CaseData || CaseData.length === 0) {
    return (
      <div style={{ width: '100%', background: 'lightblue', height: '800px' }}>

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
          <CaseDetailsModal3 show={show} onHide={handleClose}></CaseDetailsModal3>
        </div>

      </div>
    )
  }
  return (
    <>
      <div style={{ fontSize: "36px", background: '#F0F0F0' }}>影音</div>
      <div style={{ width: '100%', background: 'lightblue', height: '800px' }}>
        <div className="d-flex flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
          <div className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
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
          </div>
          {/* Generate six Cards */}
          <Row style={{ width: '1000px' }}>
            {data3.map((item, index) => (
              <Col key={index} style={{ width: '200px', }} className='mb-3 col-4 d-flex justify-content-center'>
                <Card style={{ width: "240px" }}>
                  <YouTubeEmbed variant="top" url={item.src} style={{ width: '100%', height: '180px', objectFit: 'cover' }}></YouTubeEmbed>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems[index] || false}
                        onChange={() => handleChecked(index)}
                        style={{ margin: "0 10px 3px 10px" }}
                      /> <span style={{ margin: "0 20px" }} key={index} onClick={() => handleShow1(index)}>{item.v_name}</span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
          </Row>
        </div>
        <MediaContext.Provider value={{setSelectedItems, setCheckedAll}} >
          <CaseDetailsModal3 show={show} onHide={handleClose}></CaseDetailsModal3>
        </MediaContext.Provider>
        <EditModal3 show={show1} onHide={handleClose1} data={CaseData} index={index}></EditModal3>
      </div>

    </>
  );
};

export default Media;


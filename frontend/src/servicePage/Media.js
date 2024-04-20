import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Col, Row, Modal } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import { FaTrashAlt, FaRegCheckSquare, FaCheck, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import YouTubeEmbed from '../Components/youtube';
import CaseDetailsModal3 from './CaseDetailsModal3';
import { CaseContext } from "./MainScreen3";
import EditModal3 from './EditModal3';
import styles from './servicemanagement.module.css';


export const MediaContext = createContext();


const Media = ({ data3 }) => {

  const { fetchData } = useContext(CaseContext);
  const CaseData = data3;
  const [selectedItems, setSelectedItems] = useState([]);
  //
  useEffect(() => {
    setSelectedItems(Array.from(CaseData).fill(false));
  }, [data3])
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
  //deleted Modal
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const handleDeletedModal = () => {
    setShowDeletedModal(true);
  }
  const handleClosedDeletedModal = () => {
    setShowDeletedModal(false);
  }
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
      handleClosedDeletedModal();
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

  //頁數控制
  const CasePerPage = 6;
  const page = Math.ceil(data3.length / CasePerPage);
  const [active, setActive] = useState(1);
  let items = [];
  data3 = data3?.slice(CasePerPage * (active - 1), CasePerPage * active);
  if (data3?.length === 0 && active > 1) {
    setActive(() => active - 1)
  }
  const handleSetActive = (number) => {
    setActive(number)
  }
  //

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (!CaseData || CaseData.length === 0) {
    return (
      <>
        <div style={{ fontSize: "30px", background: '#F0F0F0' }}>影音</div>
        <div style={{
          width: '100%', background: 'lightgreen', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
          borderRadius: "0 0 10px 10px"
        }}>
          <div className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", marginTop: "30px" }}>
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
              <h3>未有影音紀錄，點此按鈕新增</h3>
              <Button
                variant="success"
                size="sm"
                className={`${styles.increasecollectionchecked}`}
                onClick={() => { handleShow() }}
              >
                <FaPlus size={16} />
                新增
              </Button>
              <CaseDetailsModal3 show={show} onHide={handleClose}></CaseDetailsModal3>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className={`${styles.titlestyle}`}>影音</div>
      <div style={{ width: '100%', background: 'lightgreen', minHeight: '33vh', borderRadius: "10px" }}>
        <div className="flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
          <div className={`${styles.buttoncontainer}`}>
            <Button
              variant="success"
              className={`${styles.increasecollectionchecked}`}
              onClick={() => { handleShow() }}
            >
              <FaPlus size={16} />
              新增
            </Button>

            <Button
              variant="primary"
              className={`${styles.togglecollectionchecked}`}
              onClick={handleToggleAll}
            >
              {checkedAll ? (
                <>
                  <FaRegCheckSquare size={20} />
                  取消
                </>
              ) : (
                <>
                  <FaCheck size={16} />
                  全選
                </>
              )}
            </Button>
            <Button
              variant="danger"
              className={`${styles.deletecollectionchecked}`}
              onClick={() => { handleDeletedModal() }}
            ><FaTrashAlt size={16} />
              刪除
            </Button>
          </div>
          {/* Generate six Cards */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Row style={{ width: '100%', marginTop: "10px" }}>
              {data3.map((item, index) => (
                <Col key={index} style={{ width: '200px', }} className='mb-3 col-4 d-flex justify-content-center'>
                  <Card style={{ width: "240px" }}>
                    <YouTubeEmbed variant="top" url={item.src} style={{ width: '100%', height: '180px', objectFit: 'cover' }}></YouTubeEmbed>
                    <Card.Body className="d-flex flex-column">
                    <Card.Title className='w-100 '>
                        <div
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            margin:"0 1rem 0.1rem 1rem"
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            checked={selectedItems[index] || false}
                            onChange={() => handleChecked(index)}
                            style={{display:'block' ,margin:"0 1rem 0.2rem 0"}}
                          />
                          <span style={{marginLeft:"0.5rem"}} onClick={() => handleShow1(index)}>{item.v_name}</span>
                        </div>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

              <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
            </Row>
          </div>
        </div>

        <MediaContext.Provider value={{ setSelectedItems, setCheckedAll }} >
          <CaseDetailsModal3 show={show} onHide={handleClose}></CaseDetailsModal3>
        </MediaContext.Provider>

        <EditModal3 show={show1} onHide={handleClose1} data={CaseData} index={index}></EditModal3>

        {/* 刪除 */}
        <Modal show={showDeletedModal} onHide={handleClosedDeletedModal} centered size="sm">
          <Modal.Header closeButton>
            <Modal.Title>{/* 標題內容 */}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',fontSize: "28px" }}>
            確定刪除所選影音?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="primary" onClick={() => handleDeleted()}style={{ padding: '0.5rem 1.7rem', fontSize: '20px', borderRadius: "10px" }}>
              確定
            </Button>
            <Button variant="danger" onClick={handleClosedDeletedModal}style={{ padding: '0.5rem 1.7rem', fontSize: '20px', borderRadius: "10px" }}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </>

  );
};

export default Media;


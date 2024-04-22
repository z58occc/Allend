import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Modal, Col, Row } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Cookies from "js-cookie";
import CaseDetailsModal1 from './CaseDetailsModal1';
import { CaseContext } from "./MainScreen3";
import EditModal1 from './EditModal1';
import Footer from '../homepage/Footer';
import styles from './servicemanagement.module.css';
import { FaTrashAlt, FaRegCheckSquare, FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";


export const DataContext = createContext();


const Provider = ({ data1 }) => {

  const CaseData = data1;
  const { fetchData } = useContext(CaseContext);
  //
  const [selectedItems, setSelectedItems] = useState([]);
  //
  useEffect(() => {
    setSelectedItems(Array.from(CaseData).fill(false));
  }, [data1])
  //
  const [checkedAll, setCheckedAll] = useState(false);
  //
  const [index, setIndex] = useState(0);

  const handleToggleAll = () => {
    setCheckedAll(!checkedAll);
    setSelectedItems(Array(data1.length).fill(!checkedAll));
  };
  //deleted Modal
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const handleDeletedModal = () => {
    setShowDeletedModal(true);
  }
  const handleClosedDeletedModal = () => {
    setShowDeletedModal(false);
  }
  //
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    setCheckedAll(newSelectedItems.every((item) => item));
  };
  //新增Modal;
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }
  //編輯Modal;
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

    didOfDeletedData = deletedData.map(item => item.sid);

    try {
      const response = await fetch("http://127.0.0.1/Allend/backend/public/api/delmemser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify
          (
            {
              sid: didOfDeletedData,
            }
          ),
      });
      console.log(didOfDeletedData)


      // 根據更新後的CaseData長度更新selectedItems和checkedAll狀態
      // setSelectedItems([false])
      fetchData();
      setSelectedItems(Array(updatedCaseData.length).fill(false));
      setShowDeletedModal(false);
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
  //
  //頁數控制
  const CasePerPage = 6;
  const page = Math.ceil(data1.length / CasePerPage);
  const [active, setActive] = useState(1);
  let items = [];
  data1 = data1?.slice(CasePerPage * (active - 1), CasePerPage * active);
  if (data1?.length === 0 && active > 1) {
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
        <div style={{ fontSize: "30px", background: '#F0F0F0' }}>提供服務</div>
        <div style={{
          width: '100%', background: 'lightblue', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
          borderRadius: "10px 10px 0 0"
        }}>
          <div className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", marginTop: "30px" }}>
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
              <h3>未有案件紀錄，點此按鈕新增</h3>
              <Button
                variant="success"
                size="sm"
                className={`${styles.increasecollectionchecked}`}
                onClick={() => { handleShow() }}
              >
                <FaPlus size={16} />
                新增
              </Button>
              <CaseDetailsModal1 show={show} onHide={handleClose}></CaseDetailsModal1>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <h2 className={`${styles.titlestyle}`}>提供服務</h2>
      <div style={{ width: '100%', background: 'lightblue', minHeight: '33vh', borderRadius: "10px", marginBottom: '1.3rem' }}>
        <div className=" flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
          <div className={`${styles.buttoncontainer}`}>
            <Button
              variant="success"
              className={`${styles.increasecollectionchecked}`}
              onClick={() => { handleShow() }}
            >
              <FaPlus />
              新增
            </Button>
            <Button
              variant="primary"
              className={`${styles.togglecollectionchecked}`}
              onClick={handleToggleAll}
            >
              {checkedAll ? (
                <>
                  <FaRegCheckSquare />
                  取消
                </>
              ) : (
                <>
                  <FaCheck />
                  全選
                </>
              )}
            </Button>
            <Button
              variant="danger"
              className={`${styles.deletecollectionchecked}`}
              onClick={() => handleDeletedModal()}
            ><FaTrashAlt />
              刪除
            </Button>
          </div>
          {/* DATA */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Row style={{ width: '100%', marginTop: "10px" }} >
              {data1.map((item, index) => (
                <Col key={index} className='mb-3 col-4 d-flex justify-content-center'>
                  <Card style={{ width: "240px" }}>
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${item.image}`} alt={`${index + 1}`} style={{ height: '180px', objectFit: 'cover' }} onClick={() => handleShow1(index)} />
                    <Card.Body>
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
                          <span style={{marginLeft:"0.5rem"}}>{item.s_name}</span>
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

        <DataContext.Provider value={{ setCheckedAll, setSelectedItems }}>
          <CaseDetailsModal1 show={show} onHide={handleClose}></CaseDetailsModal1>
        </DataContext.Provider>

        <EditModal1 show={show1} onHide={handleClose1} data={CaseData} index={index}></EditModal1>

        {/* 刪除 */}
        <Modal show={showDeletedModal} onHide={handleClosedDeletedModal} centered size="sm">
          <Modal.Header closeButton>
            <Modal.Title>{/* 標題內容 */}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',fontSize: "28px" }}>
            確定刪除所選服務?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="primary" style={{ padding: '0.5rem 1.7rem', fontSize: '20px', borderRadius: "10px" }} onClick={() => handleDeleted()}>
              確定
            </Button>
            <Button variant="danger" style={{ padding: '0.5rem 1.7rem', fontSize: '20px', borderRadius: "10px" }} onClick={handleClosedDeletedModal}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Provider;





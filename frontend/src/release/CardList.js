import React, { useContext, useEffect, useState, } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import SearchPage from "./SearchPage";
import StarRating from "./StarRating";
import CaseDetailsModal1 from "./CaseDetailsModal1";
import CaseDetailsModal2 from "./CaseDetailsModal2";
import CaseDetailsModal3 from "./CaseDetailsModal3";
import { CaseContext } from "./MainScreen2";
import GetQuoteModal from "./GetQuoteModal";
import Cookies from "js-cookie";
import { FaTrashAlt,FaRegCheckSquare,FaCheck } from "react-icons/fa";
import styles from './cardlist.module.css';

const CardList = ({ visibility, selectedComponent, data1, screen }) => {
  // const {Case} = useContext(CaseContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermProgress, setSearchTermProgress] = useState('');
  const [searchTermCompleted, setSearchTermCompleted] = useState('');
  const { fetchData } = useContext(CaseContext);
  const CaseData = data1;

  //刪除MODAL
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const handleDeletedModal = () => {
    setShowDeletedModal(true);
  }
  const handleClosedDeletedModal = () => {
    setShowDeletedModal(false);
  }

  //搜尋選擇case
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


  // 控制key回傳對應Modal
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index) => {
    setSelectedDataKey(index);
  };
  // 全選功能
  // console.log(data1);
  const [checked, setChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState(Array.from(data1).fill(false)); //設置selectedItems為空陣列，裡面為被選到的index值
  useEffect(() => {
    setSelectedItems(Array.from(data1).fill(false))
  }, [data1]);
  useEffect(() => {
    const hasSelected = selectedItems.some(item => item === true);
    setDisabledDeleteButton(!hasSelected);
  }, [selectedItems]);
  // 刪除disable
  const [disabledDeleteButton, setDisabledDeleteButton] = useState(true);

  // console.log(selectedItems);
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
    const isAllSelected = newSelectedItems.every((item) => item); //查看newSelectedItems每個是否為true，return 1 or 0
    setChecked(isAllSelected);
  };
  const handleToggleAll = () => {
    const isAllSelected = !checked;
    setChecked(isAllSelected);
    const newSelectedItems = CaseData.map(() => isAllSelected);
    setSelectedItems(newSelectedItems);
  };

  // 刪除
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
    const updateData = CaseData.filter((item, index) => !deletedIndices.includes(index));

    didOfDeletedData = deletedData.map(item => item.did);

    try {
      const response = await fetch("http://127.0.0.1/Allend/backend/public/api/delpublishcase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ did: didOfDeletedData }),
      }).then(() => {
        fetchData();
        setSelectedItems(Array.from(data1.length).fill(false));
        handleClosedDeletedModal();
        setChecked(false);
      })
      // console.log(updateData);
      // console.log(selectedItems);
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      const responseData = await response.json();
      // console.log('Response data:', responseData);

    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // 案件詳情Modal
  const [showModal1, setShowModal1] = useState(false);

  // 子元件編輯查看
  const handleModalShow1 = () => {
    setShowModal1(true);
  };
  const handleModalClose1 = () => {
    setShowModal1(false);
    setSelectedDataKey(0);
  };
  // 查看報價按鈕控制
  const [Quote, setQuote] = useState([]); //報價資料

  const [showModal, setShowModal] = useState(false);

  const handleShowQuoteModal = (did) => {
    setShowModal(true);

    fetch(`http://127.0.0.1/Allend/backend/public/api/pop_quote?did=${did}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };
  const handleCloseModal = () => {
    setShowModal(false);
  };


  // CardList選擇子元件
  let ComponentToRender;
  if (selectedComponent === "component1") {
    ComponentToRender = (
      <CaseDetailsModal1
        show={showModal1}
        onHide={handleModalClose1}
        number={selectedDataKey}
        data={CaseData}
      />
    );
  } else if (selectedComponent === "component2") {
    ComponentToRender = (
      <CaseDetailsModal2
        show={showModal1}
        onHide={handleModalClose1}
        number={selectedDataKey}
        data={CaseData}
      />
    );
  } else if (selectedComponent === "component3") {
    ComponentToRender = (
      <CaseDetailsModal3
        show={showModal1}
        onHide={handleModalClose1}
        number={selectedDataKey}
        data={CaseData}
      />
    );
  }
  if (!CaseData || CaseData.length === 0) {
    return (<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      未有紀錄
    </h1>)

  }

  //根據條件選擇screen的casedata
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
  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div
        className="d-flex justify-content-around"
        style={{ width: "800px" }}
      >
        <Button
          variant="primary"
          style={{visibility}}
          className={`${styles.togglecollectionchecked}`}
          onClick={handleToggleAll}
        >
          {checked ? (
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
          style={{ visibility }}
          className={`${styles.deletecollectionchecked}`}
          onClick={() => handleDeletedModal()}
          disabled={disabledDeleteButton}
        >
          <FaTrashAlt size={16} />刪除
        </Button>
        <SearchPage onSearch={handleSearch} searchTerm={screen === 2 ? searchTermProgress : screen === 3 ? searchTermCompleted : searchTerm}></SearchPage>
      </div>


      {filteredData.map((item, index) => (
        <Card
          key={index}
          className="my-3"
          style={{ width: "720px", height: "", display: "flex" }}
        >
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: "1" }}>
              <Card.Text>{screen === 1 ? (
                <>更新日期：{item.updated_at}</>
              ) : screen === 3 ? <Card.Title style={{ marginBottom: "0px" }}>{item.c_name}</Card.Title> : (
                <>建立日期：{item.created_at}</>
              )}</Card.Text>
              <Form.Check
                type="checkbox"
                className="align-self-center"
                style={{ paddingLeft: "1.25rem", visibility }}
                checked={selectedItems[index] || false}
                onChange={() => { handleChecked(index) }}
              />
              {screen !== 3
                &&
                <Card.Title
                  style={
                    screen === 1 ? { marginLeft: "25px" } : { marginLeft: "0px" }
                  }
                >
                  {screen === 1 ? item.d_name : item.c_name}
                </Card.Title>
              }

              {(screen === 3 && <Card.Text style={{ marginBottom: "0px" }} >案主評分：<StarRating rating={item.service_star} ></StarRating></Card.Text >)}
              {screen === 3 ? <><hr style={{ background: 'black', margin: '3px auto' }} /><Card.Text style={{ fontSize: '18px' }}>{item.service_comment}</Card.Text> </> : <hr style={{ background: 'black' }} />}
              <div className="d-flex justify-content-between">
                <span>
                  {screen === 3
                    ? <>評論日期：{item.completed_time}</>
                    : screen === 1
                      ? (<>合作期程：{item.d_duration}</>)
                      : (<>合作期程：{item.c_duration}</>)
                  }
                </span>
                <span>
                  金額：
                  {screen === 1
                    ? (<>{item.d_amount} / {item.d_unit}</>)
                    : (<>{item.c_amount} / {item.c_unit}</>)
                  }
                </span>
              </div>
            </Card.Body>
            {screen === 2 && (
              <div className="d-flex flex-column justify-content-center" style={{ height: "150px" }}>
                <Button
                  variant="primary"
                  key={index}
                  className="my-2"
                  style={{
                    width: "110px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    marginTop: "auto",
                    marginBottom: "40px",
                    padding:"0.8rem 1rem"
                  }}
                  onClick={() => {
                    handleModalShow1();
                    handlesetSelectedDataKey(index);
                  }}
                >
                  案件詳情
                </Button>
              </div>
            )}

            {screen === 3 && (
              <div className="d-flex flex-column justify-content-center">
                <Button
                  variant="primary"
                  key={index}
                  className="my-2"
                  style={{
                    width: item.demmand_comment ? "120px" : "110px",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    marginTop: "auto",
                    marginBottom: "40px",
                    padding:"0.8rem 1rem",
                    borderRadius: '15px'
                  }}
                  onClick={() => {
                    handleModalShow1();
                    handlesetSelectedDataKey(index);
                  }}
                  disabled={item.demmand_comment ? true : false}
                >
                  {item.demmand_comment ? '已提出評論' : '提出評論'}
                </Button>
              </div>
            )}


            {screen === 1 && (
              <div className="d-flex flex-column justify-content-center" >
                <Button
                  variant="primary"
                  key={index}
                  className="my-2"
                  style={{
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    padding:"0.8rem 1rem"
                  }}
                  onClick={() => {
                    handleModalShow1();
                    handlesetSelectedDataKey(index);
                  }}
                >
                  編輯
                </Button>
                <Button
                  variant="secondary"
                  className="my-2 d-inline-block"
                  style={{
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    padding:"0.8rem 1rem"
                  }}
                  onClick={() => {
                    handleShowQuoteModal(item.did);
                  }}
                >
                  查看報價
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* 查看報價Modal */}
      <GetQuoteModal show={showModal} onHide={handleCloseModal} data={Quote}></GetQuoteModal>


      <Modal show={showDeletedModal} onHide={handleClosedDeletedModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          確定刪除所選案件?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleDeleted}>
            確定
          </Button>
          <Button variant="secondary" onClick={handleClosedDeletedModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      {ComponentToRender}
    </div>
  );
};

export default CardList;

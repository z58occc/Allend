import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import Cookies from "js-cookie";
import CaseDetailsModal1 from './CaseDetailsModal1';
import { CaseContext } from "./MainScreen3";
import EditModal1 from './EditModal1';
import Footer from '../homepage/Footer';


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
  console.log(data1)
  const [active, setActive] = useState(1);
  let items = [];
  const handleSetActive = (number) => {
    setActive(number)
  }
  //
  const CasePerPage = 6;
  const page = Math.ceil(data1.length / CasePerPage);
  console.log(page);
  data1 = data1?.slice(CasePerPage * (active - 1), CasePerPage * active)
  console.log(data1);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  if (!CaseData || CaseData.length === 0) {
    return (
      
      <div style={{ width: '100%', background: 'lightblue', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center',
       borderRadius: "10px 10px 0 0" }}>
        <div className="mb-3 d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
          <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h3>未有案件紀錄，點此按鈕新增</h3>
            <Button
              variant="success"
              size="sm"
              style={{ fontSize: "15px", width: "100px", height: '55px' }}
              onClick={() => { handleShow() }}
            >
              新增
            </Button>
            <CaseDetailsModal1 show={show} onHide={handleClose}></CaseDetailsModal1>
          </div>
        </div>
      </div>

    )
  }

  return (

    <>
    <div style={{ fontSize: "30px", background: '#F0F0F0' }}>提供服務</div>
    <div style={{ width: '100%', background: 'lightblue', height: '800px',borderRadius:"10px" }}>
      <div className=" flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
        <div className="d-flex justify-content-around" style={{ width: "100%", height: '50px', marginBottom: '20px' }}>
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
        {/* DATA */}
        <div style={{}}>

          {data1.map((item, index) => (

            <Card
              key={index}
              className=""
              style={{ width: "720px", height: "95px", margin: '10px auto' }}
            >
              <Card.Body key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <Form.Check
                    type="checkbox"
                    className="mr-3"
                    checked={selectedItems[index] || false}
                    style={{ marginBottom: "30px", fontSize: "18px", marginRight: "10px" }}
                    onChange={() => handleChecked(index)}
                  />
                  <Card.Title style={{ marginBottom: "0px", fontSize: "18px", marginRight: "10px" }} key={index} onClick={() => {
                    handleShow1(index);
                  }}>
                    {item.s_name}
                  </Card.Title>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <hr style={{ background: "black", margin: "0px", width: "50%" }} />
                </div>
                <Card.Text style={{ fontSize: "14px" }}>
                  {item.s_description}
                </Card.Text>
              </Card.Body>
            </Card>


          ))}
          <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
        </div>
      </div>
      <DataContext.Provider value={{ setCheckedAll, setSelectedItems }}>
        <CaseDetailsModal1 show={show} onHide={handleClose}></CaseDetailsModal1>
      </DataContext.Provider>

      <EditModal1 show={show1} onHide={handleClose1} data={CaseData} index={index}></EditModal1>
    </div>
    </>
    
  );
};

export default Provider;





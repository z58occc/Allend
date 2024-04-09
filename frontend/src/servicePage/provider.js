import React, { useContext, useState } from 'react';
import { Button, Card, Form } from "react-bootstrap";
import CaseDetailsModal1 from './CaseDetailsModal1';
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen2";
const Provider = ({ data1 }) => {

  const CaseData = data1;
  const [Service, setService] = useState(CaseData);
  const { fetchData } = useContext(CaseContext);
  //
  const [selectedItems, setSelectedItems] = useState(Array(data1.length).fill(false));
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
  //
  const [show,setShow] = useState(false);
  const handleShow = (index) => {
    setShow(true);
    setIndex(index);
    setService(CaseData[0]);
  }
  const handleClose = () => {
    setShow(false);
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
  
        fetchData();
        setSelectedItems([false])
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
  return (
    <div style={{ width: '100%', background: 'lightblue', outline: '1px solid black', height: '600px' }}>
      <div className=" flex-wrap justify-content-around" style={{ height: '100%', marginTop: "10px" }}>
        <div className="d-flex justify-content-around" style={{ width: "100%", height: '50px', marginBottom: '20px' }}>
          <Button
            variant="success"
            style={{ fontSize: "12px", width: "100px", height: '100%' }}
            onClick={()=>{handleShow()}}
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
            onClick={() => {handleDeleted()}}
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
              onClick={(index)=>{
                handleShow(index);
              }}
            >
              <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <Form.Check
                    type="checkbox"
                    className="mr-3"
                    checked={selectedItems[index] || false}
                    style={{ marginBottom: "30px", fontSize: "18px", marginRight: "10px" }}
                    onChange={() => handleChecked(index)}
                  />
                  <Card.Title style={{ marginBottom: "0px", fontSize: "18px", marginRight: "10px" }}>
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
        </div>
      </div>
      <CaseDetailsModal1 show={show} onHide={handleClose} data={Service}></CaseDetailsModal1>
    </div>
  );
};

export default Provider;





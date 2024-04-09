import React, { useContext, useState } from 'react';
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import YouTubeEmbed from '../Components/youtube';
import CaseDetailsModal3 from './CaseDetailsModal3';
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen2";
const Media = ({ data3 }) => {
  console.log(data3);
  const { fetchData } = useContext(CaseContext);
  const CaseData = data3;
  const [selectedItems, setSelectedItems] = useState(Array(data3.length).fill(false));
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
  //
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
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
    <div style={{ width: '100%', background: 'lightblue', outline: '1px solid black', height: '650px' }}>
      <div className="d-flex flex-wrap justify-content-around align-items-center" style={{ height: '100%', marginTop: "10px" }}>
        <div className="d-flex justify-content-around align-items-center" style={{ width: "800px", height: '50px' }}>
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
        <Row className="justify-content-center" style={{ marginLeft: "40px" }}>
          {data3.map((item, index) => (
            <Col key={index} xs={6} md={4} className="my-3">
              <Card style={{ width: "240px" }}>
                <YouTubeEmbed variant="top" url={item.src} style={{ width: '100%', height: '180px', objectFit: 'cover' }}></YouTubeEmbed>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <Form.Check
                      type="checkbox"
                      checked={selectedItems[index] || false}
                      onChange={() => handleChecked(index)}
                      style={{ margin: "0 10px 3px 10px" }}
                    /> <span style={{ margin: "0 20px" }}>{item.v_name}</span>
                  </Card.Title>
                </Card.Body>
                <CaseDetailsModal3 show={show} onHide={handleClose}></CaseDetailsModal3>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Media;


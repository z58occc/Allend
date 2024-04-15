import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import { CaseContext } from "./MainScreen3";
import { WorkContext } from "./Work";


const CaseDetailsModal2 = ({ show, onHide }) => {
  //useContext from Mainscreen
  // const {setSelectedItems, setCheckedAll} = useContext(WorkContext)
  const { fetchData } = useContext(CaseContext);

  const [nameOfWork, setNameOfWork] = useState("");
  const [details, setDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('p_name', nameOfWork);
    formData.append('p_description', details);
    formData.append('image', imageFile);


    await fetch('http://127.0.0.1/Allend/backend/public/api/work', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        onHide();
        fetchData();
        // setSelectedItems(Array(6).fill(false));
        // setCheckedAll(false);
      })
      .catch((error) => {
        console.error('There was a problem updating the case:', error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Set selected file to imageFile state
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      className="row justify-content-center w-100"
    >
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group controlId="numberOfPeople">
            <Form.Label>作品品項：</Form.Label>
            <Form.Control
              type="text"
              placeholder="填寫服務名稱"
              value={nameOfWork}
              onChange={(e) => setNameOfWork(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="details">
            <Form.Label>作品描述：</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="請輸入最少十個字"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImageFile">
            <Form.Label>上傳圖片</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>

        </Form>
        <div className="mb-2 d-flex justify-content-around">
          <Button
            variant="primary"
            size="lg"
            onClick={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleSubmit(e); // Pass the event object to handleSubmit
            }}
          >
            發布
          </Button>
          <Button variant="secondary" size="lg" onClick={onHide}>
            取消
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CaseDetailsModal2;

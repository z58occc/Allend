import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { Modal, Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { CaseContext } from "./MainScreen2";
import Cookies from "js-cookie";
const EditModal1 = ({ show, onHide, data, index }) => {
  console.log(data);
  console.log(data[index]);
  //useContext from Mainscreen 
  const { fetchData } = useContext(CaseContext);

  const [nameOfService, setNameOfService] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [unit, setUnit] = useState("");
  const [imageFile, setImageFile] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('s_name', nameOfService);
    formData.append('s_type', category);
    formData.append('s_description', details);
    formData.append('s_amount', budget);
    formData.append('s_unit', unit);
    formData.append('s_active_location', location);
    formData.append('image', imageFile);




    await fetch('http://127.0.0.1/Allend/backend/public/api/updateservice', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        setNameOfService("")
        setCategory("")
        setLocation("")
        setDetails("")
        setBudget("")
        setUnit("")
        onHide();
        fetchData();
      })
      .catch((error) => {
        console.error('There was a problem updating the case:', error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  useEffect(() => {
    setNameOfService(data[index].s_name)
    setCategory(data[index].s_type)
    setLocation(data[index].s_active_location)
    setDetails(data[index].s_description)
    setBudget(data[index].s_amount)
    setUnit(data[index].s_unit)
  }, [data,index])


  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ width: "450px", marginInline: "550px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>案件資訊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group controlId="numberOfPeople">
            <Form.Label>服務名稱：</Form.Label>
            <Form.Control
              type="text"
              placeholder="填寫服務名稱"
              value={nameOfService}
              onChange={(e) => setNameOfService(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>服務類型：</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">請選擇案件類別</option>
              <option value="網站設計">網站設計</option>
              <option value="軟體程式">軟體程式</option>
              <option value="文字語言">文字語言</option>
              <option value="平面設計">平面設計</option>
              <option value="專業諮詢">專業諮詢</option>
            </Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="budget">
                <Form.Label>報價金額：</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="填寫金額"
                  value={budget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setBudget(value);
                    }
                  }}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="unit">
                <Form.Label>單位：</Form.Label>
                <Form.Control
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="例如: 次、件、小時"
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="location">
                <Form.Label>服務地點：</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">請選擇</option>
                  <optgroup label="北部">
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                  </optgroup>
                  <optgroup label="中部">
                    <option value="台中市">台中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="苗栗縣">苗栗縣</option>
                  </optgroup>
                  <optgroup label="南部">
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                  </optgroup>
                  <optgroup label="東部">
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                    <option value="台東縣">台東縣</option>
                  </optgroup>
                  <optgroup label="離島">
                    <option value="澎湖縣">澎湖縣</option>
                    <option value="金門縣">金門縣</option>
                    <option value="連江縣">連江縣</option>
                  </optgroup>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="details">
            <Form.Label>服務描述：</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="請輸入最少十個字"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImageFile">
            <Form.Label>選擇圖片檔案</Form.Label>
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

export default EditModal1;

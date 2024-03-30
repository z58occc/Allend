import React, { useState } from "react";
import { Card, Button, Form, Modal, Table } from "react-bootstrap";
import SearchPage from "./SearchPage";
import StarRating from "./StarRating";
import CaseDetailsModal1 from "./CaseDetailsModal1";
import CaseDetailsModal2 from "./CaseDetailsModal2";
import CaseDetailsModal3 from "./CaseDetailsModal3";
// import CaseContext from './CaseContext';

const CardList = ({ visibility, selectedComponent, text, data1, screen }) => {
  // const {Case} = useContext(CaseContext)
  const CaseData = data1;
  // let CaseData = [
  //   {
  //     "d_name": "心理諮商師",
  //     "d_required": 1,
  //     "d_amount": 3000,
  //     "d_unit": "次",
  //     "created_at": "2024-03-19 08:05:59"
  //   }
  // ];

  // 控制key回傳對應Modal
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index) => {
    setSelectedDataKey(index);
    console.log(index);
  };
  // 全選功能
  const [checked, setChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    false,
    false,
    false,
    false,
    false,
  ]); //設置selectedItems為空陣列，裡面為被選到的index值
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
    const isAllSelected = newSelectedItems.every((item) => item); //查看newSelectedItems每個是否為true，return 1 or 0
    setChecked(isAllSelected);
  };
  const handleToggleAll = () => {
    const isAllSelected = !checked;
    setChecked(isAllSelected);
    const newSelectedItems = CaseData.map(() => isAllSelected);
    setSelectedItems(newSelectedItems);
  };
  //刪除
  // const [deletedIndex, setdeletedIndex] = useState([]);
  
  // let deletedData = [];
  // let didOFdeletedData = [];
  // const handleDeleted =  async () =>{
  //   selectedItems.forEach((item,index)=>{
  //   if(item === true){
  //     deletedIndex.push(index);
  //   }
  //   CaseData.forEach((items,index)=>{
  //     if(deletedIndex.includes(index)){
  //       deletedData = CaseData.filter((item, index) => deletedIndex.includes(index));

  //     }
  //   })
  //   didOFdeletedData = deletedData.map(item => item.did);
  //   const response =  fetch ("http://127.0.0.1:8000/api/delpublishcase", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ did: didOFdeletedData }),
  //   });


  // })
  // }
  
  
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
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleShowQuoteModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
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

  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div
        className="d-flex justify-content-around"
        style={{ width: "800px", visibility }}
      >
        <Button
          variant="primary"
          style={{ fontSize: "12px", width: "110px", whiteSpace: "nowrap" }}
          onClick={handleToggleAll}
        >
          {checked ? "取消全選" : "全選"}
        </Button>
        <Button
          variant="danger"
          style={{ fontSize: "12px", width: "100px" }}
          onClick={()=>handleDeleted()}
        >
          刪除
        </Button>
        <SearchPage />
      </div>
      {CaseData.map((item, index) => (
        <Card
          key={index}
          className="my-3"
          style={{ width: "720px", height: "150px", display: "flex" }}
          onClick={() => {
            if (screen === 3) {
              handleModalShow1();
              handlesetSelectedDataKey(index);
            }
          }}
        >
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: "1" }}>
              <Card.Text>
                {screen === 1 ? (
                  <>更新日期：{item.updated_at}</>
                ) : (
                  <>建立日期：{item.created_at}</>
                )}
              </Card.Text>
              <Form.Check
                type="checkbox"
                className="align-self-center"
                style={{ marginLeft: "20px", visibility }}
                checked={selectedItems[index] || false}
                onChange={() => handleChecked(index)}
              />
              <Card.Title
                style={
                  screen === 1 ? { marginLeft: "25px" } : { marginLeft: "0px" }
                }
              >
                {screen === 1 ? item.d_name : item.c_name}
              </Card.Title>
              <hr style={{ background: "black" }} />
              <div className="d-flex justify-content-between">
                <Card.Text>
                  {screen === 3 ? (
                    <>完成日期：{item.completed_time}</>
                  ) : screen === 1 ? (
                    <> 合作期程：{item.d_duration}</>
                  ) : (
                    <> 合作期程：{item.c_duration}</>
                  )}
                </Card.Text>
                <Card.Text>
                  金額：
                  {screen === 1 ? (
                    <>
                      {item.d_amount} / {item.d_unit}
                    </>
                  ) : (
                    <>
                      {item.c_amount} / {item.c_unit}
                    </>
                  )}
                </Card.Text>
              </div>
            </Card.Body>
            {screen === 3 ? (
              <div className="d-flex flex-column justify-content-center">
                <StarRating rating={item.demmand_star}></StarRating>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center">
                <Button
                  variant="primary"
                  key={index}
                  className="my-2"
                  style={{
                    width: "110px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleModalShow1();
                    handlesetSelectedDataKey(index);
                  }}
                >
                  {text}
                </Button>
                <Button
                  variant="secondary"
                  className="my-2 d-inline-block"
                  style={{
                    width: "110px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    visibility,
                  }}
                  onClick={() => handleShowQuoteModal(item)}
                >
                  查看報價
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* 查看報價Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            查看報價 - {selectedItem && selectedItem.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>案件名稱</th>
                <th>接案人姓名</th>
                <th>Email</th>
                <th>族群</th>
                <th>報價金額</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>項目名稱</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>NTD$ 1000</td>
                <td>
                  <div class="d-flex justify-content-start">
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      接受
                    </Button>
                    <Button
                      variant="danger"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      拒絕
                    </Button>
                    <Button
                      variant="secondary"
                      style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                    >
                      聊聊
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      {ComponentToRender}
    </div>
  );
};

export default CardList;

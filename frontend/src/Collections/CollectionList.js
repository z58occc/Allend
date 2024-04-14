import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import styles from './Collection.module.css';


const CollectionList = ({visibility,selectedComponent,text,data,screen,dataUpdate}) => {
  console.log(data)
  // 控制key回傳對應Modal
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index)=>{
    setSelectedDataKey(index);
    console.log(index);
  }
  // 全選
  const [checked, setChecked] = useState(false); // 是否全選
  const [selectedItems, setSelectedItems] = useState(Array.from(data).fill(false)); // 設置selectedItems為空陣列，裡面為被選到的index的true/false

  // 確保預設都是未勾選
  useEffect(() => {
    setSelectedItems(Array.from(data).fill(false))
  }, [data]);
  useEffect(() => {
    const hasSelected = selectedItems.some(item => item === true);
    setDisabledDeleteButton(!hasSelected);
  }, [selectedItems]);

  // 沒有勾選，刪除鈕disabled
  const [disabledDeleteButton, setDisabledDeleteButton] = useState(true);

  // 判斷有無勾選
  const handleChecked = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    // 重新儲存被選擇的index
    setSelectedItems(newSelectedItems);
    console.log(selectedItems);
    // 判斷是否全選 (所有item = true)
    const isAllSelected = newSelectedItems.every((item) => item);
    setChecked(isAllSelected);
  };
  const handleToggleAll = () => {
    const isAllSelected = !checked;
    setChecked(isAllSelected);
    const newSelectedItems = data.map(() => isAllSelected);
    setSelectedItems(newSelectedItems);
  };

  // 開關刪除收藏modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleOpenCancelModal = () => {
    setShowCancelModal(true);
  }
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  }

  // 儲存搜尋框內的文字 (存疑)
  const [searchcase, setSearchCase] = useState('');
  const [searchservice, setSearchService] = useState('');
  const handleSearch = (searchTerm) => {
    switch (screen) {
      case 1:
        setSearchCase(searchTerm);
        break;
      case 2:
        setSearchService(searchTerm);
        break;
      default:
        setSearchCase(searchTerm);
    }
  };

  let deletedData = [];
  let fidOfDeletedData = [];

  // 勾選取消收藏
  const multipleCancel = () => {
    const deletedIndices = [];
    selectedItems.forEach((item, index) => {
      if (item === true) {
        deletedIndices.push(index);
      }
    });

    deletedData = data.filter((item, index) => deletedIndices.includes(index));
    fidOfDeletedData = deletedData.map(item => item.fid);
    const updateData = data.filter((item, index) => !deletedIndices.includes(index));

    handleCancelCollection(fidOfDeletedData, updateData)
    handleCloseCancelModal()
  }
  // 右側取消收藏
  const singleCancel = (fid) => {
    const updateData = data.filter((item, i) => item.fid !== fid);

    handleCancelCollection(fid, updateData)
  }
  // 取消收藏功能
  const handleCancelCollection = (delData, updateData) => {
    axios({
      method: 'post',
      url: "http://localhost/Allend/backend/public/api/delcollection",
      data: {fid: delData},
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .then((res) => {
      dataUpdate(updateData, screen)
    })
    .catch((err) => console.log(err))
  }
  
  // 案件詳情Modal
  // const [showModal1, setShowModal1] = useState(false)
  
  // // 子元件編輯查看
  // const handleModalShow1 = () => {
  //   setShowModal1(true);
  // }
  // const handleModalClose1 = () => {
  //   setShowModal1(false);
  //   setSelectedDataKey(0);
  // }

  

  // CollectionList選擇子元件
  // let ComponentToRender;
  // if (selectedComponent === 'casecollection') {
  //   ComponentToRender = <CaseDetailsModal1 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData} searchTerm={searchTerm} onSearch={handleSearch}/> ;
  // } else if (selectedComponent === 'servicecollection') {
  //   ComponentToRender = <CaseDetailsModal2 show={showModal1} onHide={handleModalClose1} number={selectedDataKey} data={CaseData} searchTerm={searchTerm} onSearch={handleSearch}/>;
  // }

  // 篩選符合搜索標題的資料
  let filteredData = data;
  switch (screen) {
    case 1:
      if (searchcase) {
        filteredData = data.filter(item => item.d_name.includes(searchcase));
      }
      break;
    case 2:
      if (searchservice) {
        filteredData = data.filter(item => item.c_name.includes(searchservice));
      }
      break;
    default:
      filteredData = data;
  }

console.log(selectedItems.filter((item, i) => item))
  return (
    <div className="d-flex flex-wrap justify-content-center">

      <div className="d-flex justify-content-end mt-3 " style={{ width: '100%'}}>
        <div className='me-auto d-flex align-items-center'>
          <Button
            variant='primary'
            className={`${styles.togglecollectionchecked}`}
            onClick={handleToggleAll}
          >
            {checked ? "取消全選" : "全選"}
          </Button>
          
          <Button
            variant="danger"
            className={`${styles.deletecollectionchecked}`}
            onClick={handleOpenCancelModal}
            disabled={disabledDeleteButton}
          >
            刪除收藏
          </Button>
        </div>
    {/* <div className='row w-100 d-flex justify-content-end'> */}
        <SearchBox className="ms-5" onSearch={handleSearch} searchTerm={screen === 1 ? searchcase : searchservice}></SearchBox>
        {/* </div> */}
      </div>

      {filteredData.length === 0
      ? <div style={{ fontSize: '24px', marginTop: '50px',fontWeight: '550',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {screen === 1
          ? <>還沒有收藏的案件喔～快去<Link to='/findcase'>我要接案</Link>找尋心儀的案件吧！</>
          : <>還沒有收藏的服務喔～快去<Link to='/findman'>我要找人</Link>找尋心儀的服務吧！</>
          }
        </div>
      : filteredData.map((item, index) => (
        <Card key={index} className="my-3" style={{ width: '100%', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <div className='d-flex align-items-center' style={{ padding: "0 1.25rem" }}>
              <input
                  type="checkbox"
                  className={`align-self-center ${styles.collectioncheckbox}`}
                  checked={selectedItems[index] || false}
                  onChange={() => { handleChecked(index) }}
                />
            </div>
            <Card.Body style={{ flex: '1' }} className={`${styles.collectioncardbody}`} >
              <Link to={screen === 1 ? `/casecontext/${item.did}` : `/talent/${item.mid}`} style={{lineHeight: '1'}}>
                <Card.Text>收藏日期：{item.created_at}</Card.Text>
                <Card.Title style={{ fontWeight: '550'}}>{screen === 1 ? item.d_name : item.s_name}</Card.Title>
                <div className='mt-2'>{screen === 1 ? <>案主：{item.name}</> : <>服務提供：{item.name}</> }</div>

                <hr style={{ background: 'black' }} />

                <div className="d-flex justify-content-between">
                  <span>{screen === 1 ? <>合作期程：{item.d_duration}</> : <></>}</span>
                  <span>{screen === 1
                    ? <>案件預算：{item.d_amount}&nbsp;/&nbsp;{item.d_unit}</>
                    : <>服務報價：{item.s_amount}&nbsp;/&nbsp;{item.s_unit}</>}
                  </span>
                </div>
              </Link>
            </Card.Body>

            { <div className="d-flex flex-column justify-content-center" >
                <Button
                  variant="danger"
                  className={`${styles.deletecollectionchecked}`}
                  onClick={()=>{singleCancel(item.fid)}}
                >
                  刪除收藏
                </Button>
              </div>
            }
          </div>
        </Card>
      ))}

      {/* 確認刪除modal */}
      <Modal show={showCancelModal} onHide={handleCloseCancelModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>刪除確認</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          確定刪除所選收藏?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={multipleCancel}>
            確定
          </Button>
          <Button variant="secondary" onClick={handleCloseCancelModal}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {ComponentToRender} */}
    </div>
  );
};

export default CollectionList;

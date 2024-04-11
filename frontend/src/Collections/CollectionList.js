import React, { useContext, useEffect, useState } from 'react';
import { Card, Button} from 'react-bootstrap';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";


const CollectionList = ({visibility,selectedComponent,text,data,screen,dataUpdate}) => {
  // 控制key回傳對應Modal
  const [selectedDataKey, setSelectedDataKey] = useState(0);
  const handlesetSelectedDataKey = (index)=>{
    setSelectedDataKey(index);
    console.log(index);
  }

  // const {fetchData} = useContext(CaseContext);
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

  // 取消收藏按鈕
  const handleCancelCollection = (fid) => {
    axios({
      method: 'post',
      url: "http://localhost/Allend/backend/public/api/delcollection",
      data: {fid: fid},
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .then((res) => {
      const newData = data.filter((item) => item.fid !== fid);
      dataUpdate(newData, screen)
    })
    .catch((err) => console.log(err))
  }
  
  // // 案件詳情Modal
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


  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div className="d-flex justify-content-end me-2" style={{ width: '100%'}} >
        <SearchBox className="" onSearch={handleSearch} searchTerm={screen === 1 ? searchcase : searchservice}></SearchBox>
      </div>
      {filteredData.length === 0
      ? <div style={{ fontSize: '24px', marginTop: '50px',fontWeight: '550',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {screen === 1
          ? <>還沒有收藏的案件喔～快去<Link to='/findcase'>我要接案</Link>找尋心儀的案件吧！</>
          : <>還沒有收藏的服務喔～快去<Link to='/findman'>我要找人</Link>找尋心儀的服務吧！</>}
        </div>
      : filteredData.map((item, index) => (
        <Card key={item.fid} className="my-3" style={{ width: '720px', height: '180px', display: 'flex' }}>
          <div className="d-flex bd-highlight">
            <Card.Body style={{ flex: '1' }} >
              <Link to={screen === 1 ? `/casecontext/?${item.did}` : `/talent/${item.mid}`}>
                <Card.Text>收藏日期：{screen === 1 ? item.created_at : item.created_at}</Card.Text>
                <Card.Title style={{ fontWeight: '550'}}>{screen === 1 ? item.d_name : item.s_name}</Card.Title>
                <div className='mt-2'>{screen === 1 ? <>案主：{item.name}</> : <>服務提供：{item.name}</> }</div>

                <hr style={{ background: 'black' }} />

                <div className="d-flex justify-content-between">
                  <Card.Text>{screen === 1 ? <>合作期程：{item.d_duration}</> : <></>}</Card.Text>
                  <Card.Text>{screen === 1
                    ? <>案件預算：{item.d_amount}&nbsp;/&nbsp;{item.d_unit}</>
                    : <>服務報價：{item.s_amount}&nbsp;/&nbsp;{item.s_unit}</>}
                  </Card.Text>
                </div>
              </Link>
            </Card.Body>

            {
            // screen !== 1  ? 
            // <div className="d-flex flex-column justify-content-center" style={{height : "150px"}}>
            //   <Button variant="primary" key={index} className="my-2" style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap'}} onClick={() => {handleModalShow1(); handlesetSelectedDataKey(index)}} >
            //   {text}
            //   </Button>
            // </div>:

            <div className="d-flex flex-column justify-content-center" >
              {/* <Button variant="primary" key={index} className="my-2" style={{ width: '110px', fontSize: '12px', whiteSpace: 'nowrap' ,marginTop: "auto" ,marginBottom: "40px"}} onClick={() => {handleModalShow1(); handlesetSelectedDataKey(index)}} >
                編輯
              </Button> */}
              <Button
                variant="danger" 
                className=" d-inline-block"
                style={{ width: '110px', fontSize: '14px', whiteSpace: 'nowrap', textAlign: 'cente',  }}
                onClick={()=>{handleCancelCollection(item.fid)}}
              >
                取消收藏
              </Button>
            </div>
            }
          </div>
        </Card>
      ))}


      {/* {ComponentToRender} */}
    </div>
  );
};

export default CollectionList;

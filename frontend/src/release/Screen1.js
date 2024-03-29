import React, { useState } from 'react';
// import { CaseProvider } from './CaseContext';
import CardList from './CardList';
import Pagination from 'react-bootstrap/Pagination';




const Screen1 = ({data}) => {
  //頁數控制
  console.log(data)
  const [active,setActive] = useState(1);
  let items = [];
  const handleSetActive = (number)=>{
    setActive(number)
  }
  //
  const CasePerPage = 5;
  console.log(data.length);
  const page = (data.length / CasePerPage) + 1;
  console.log(page);
  data = data.slice(  CasePerPage * (active-1) , CasePerPage * active)  
  console.log(data);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div style={{ width: '100%', height: '1200px', background: 'lightcoral' }}>
        <CardList selectedComponent={'component1'} text={"編輯"} screen={1} data1={data}></CardList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
    </> );
    
};

export default Screen1;
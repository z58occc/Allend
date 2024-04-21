import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
// import { CaseProvider } from './CaseContext';
import CardList from './CardList';




const Screen1 = ({data}) => {
  //頁數控制
  const CasePerPage = 5;
  const page = Math.ceil(data.length / CasePerPage);
  const [active,setActive] = useState(1);
  let items = [];
  data = data?.slice(  CasePerPage * (active-1) , CasePerPage * active);
  if(data?.length === 0 && active > 1){
    setActive(()=>active - 1)
  }  
  const handleSetActive = (number)=>{
    setActive(number)
  }
  //

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', background: 'lightcoral',borderRadius: "10px" }}>
        <CardList selectedComponent={'component1'} screen={1} data1={data}></CardList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
    </> );
    
};

export default Screen1;
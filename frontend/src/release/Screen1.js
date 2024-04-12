import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
// import { CaseProvider } from './CaseContext';
import CardList from './CardList';




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
  const page = Math.ceil(data.length / CasePerPage);
  console.log(page);
  data = data?.slice(  CasePerPage * (active-1) , CasePerPage * active)  
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
        <CardList selectedComponent={'component1'} screen={1} data1={data}></CardList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
    </> );
    
};

export default Screen1;
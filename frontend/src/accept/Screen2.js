import React, { useState } from 'react';

import CardList from './CardList';
import { Pagination } from 'react-bootstrap';

const Screen2 = ({data}) => {
    //頁數控制
    console.log(data)
    const [active,setActive] = useState(1);
    let items = [];
    const handleSetActive = (number)=>{
      setActive(number)
    }
    //
    const CasePerPage = 5;
    console.log(data?.length);
    const page = Math.ceil(data.length / CasePerPage);
    console.log(page);
    data = data?.slice(  CasePerPage * (active-1) , CasePerPage * active)  

  
    for (let number = 1; number <= page; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
          {number}
        </Pagination.Item>
      );
    }
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'lightgreen' }}>
        <CardList visibility= 'hidden' text={'查看詳情'} selectedComponent={'component2'} data1={data} screen={2}></CardList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>    
      </div>
    </>
  );
};



export default Screen2;

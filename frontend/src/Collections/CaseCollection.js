import React, { useEffect, useState } from 'react';
import CollectionList from './CollectionList';
import Pagination from 'react-bootstrap/Pagination';


const CaseCollection = ({data, dataUpdate}) => {
  //頁數控制
  const [active,setActive] = useState(1);
  let items = [];
  const handleSetActive = (number)=>{
    setActive(number)
  }

  const CasePerPage = 1;
  const page = Math.ceil(data.length / CasePerPage);
  data = data.slice(CasePerPage * (active-1) , CasePerPage * active)  
  if(data.length === 0 && active > 1){
    setActive(()=>active - 1)
  }
  console.log(page);
  console.log(data);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }

  // useEffect(()=>{
  //   data = data.slice(CasePerPage * (active-1) , CasePerPage * active)  
  //   if(data.length === 0 && active > 1){
  //     setActive(()=>active - 1)
  //   }
  
  // }, [active])
  
  return (
      <div style={{ width: '100%', height: '100vh' }}>
        <CollectionList selectedComponent={'case'} screen={1} data={data} dataUpdate={dataUpdate}></CollectionList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
  );  
};

export default CaseCollection;
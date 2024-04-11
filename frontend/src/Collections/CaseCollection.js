import React, { useState } from 'react';
import CollectionList from './CollectionList';
import Pagination from 'react-bootstrap/Pagination';


const CaseCollection = ({data, dataUpdate}) => {
  //頁數控制
  const [active,setActive] = useState(1);
  let items = [];
  const handleSetActive = (number)=>{
    setActive(number)
  }

  
  const CasePerPage = 5;
  const page = Math.ceil(data?.length / CasePerPage);
  console.log(page);
  data = data?.slice(CasePerPage * (active-1) , CasePerPage * active)  
  console.log(data);

  for (let number = 1; number <= page; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }

  
  return (
      <div style={{ width: '100%', height: '100vh' }}>
        <CollectionList selectedComponent={'case'} screen={1} data={data} dataUpdate={dataUpdate}></CollectionList>
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
  );  
};

export default CaseCollection;
import React, { useEffect, useState } from 'react';
import CollectionList from './CollectionList';
import Pagination from 'react-bootstrap/Pagination';


const ServiceCollection = ({data, dataUpdate}) => {
  // 頁數控制
  // 初始化active
  const [active,setActive] = useState(1);
  const CasePerPage = 5; // 每頁幾個card
  const [displayData, setDisplayData] = useState([])
  // useEffect(() => {
  //   setDisplayData(data.slice(CasePerPage * (active-1) , CasePerPage * active))

  // }, [active, data])


  let items = [];
  const TotalPage = Math.ceil(data.length / CasePerPage); // 總共有幾頁
  // setActive(page)
  // let data;
  // console.log(data.length)
  data = data.slice(CasePerPage * (active-1) , CasePerPage * active)
  if(data?.length === 0 && data % 1 < CasePerPage){
    setActive(active - 1)
  }
  // console.log(active)
  const handleSetActive = (number)=>{
    setActive(number)
  }
  // console.log(data?.length);
  // console.log(page);
  // useEffect(()=>{
  //   data = data.slice(CasePerPage * (active-1) , CasePerPage * active)  
  //   if(data.length === 0 && active > 1){
  //     setActive(()=>active - 1)
  //   }
  
  // }, [active])

  for (let number = 1; number <= TotalPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>handleSetActive(number)}>
        {number}
      </Pagination.Item>
    );
  }
  

  return (
      <div style={{ width: '100%', height:'100vh'}}>
        <CollectionList visibility='hidden' selectedComponent={'servicecollection'} data={data} screen={2} dataUpdate={dataUpdate}></CollectionList>    
        <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
      </div>
  );
};


export default ServiceCollection;

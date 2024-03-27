import React from 'react';
// import { CaseProvider } from './CaseContext';
import CardList from './CardList';



const Screen1 = (data) => {
  
  console.log(data)
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'lightcoral' }}>
        <CardList selectedComponent={'component1'} text={"編輯"} screen={1} data1={data}></CardList>
      </div>
    </> );
    
};

export default Screen1;
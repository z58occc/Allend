import React from 'react';

import CardList from './CardList';



const Screen2 = ({data}) => {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'lightgreen' }}>
        <CardList visibility= 'hidden' text={'查看詳情'} selectedComponent={'component2'} data1={data} screen={2}></CardList>    
      </div>
    </>
  );
};



export default Screen2;

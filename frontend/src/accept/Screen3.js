import React from 'react';

import CardList from './CardList';


const Screen3 = ({data}) => {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'lightyellow' }}>
      <CardList visibility= 'hidden' selectedComponent={'component3'} data1={data} screen={3}></CardList>
    </div>
    </>
  );
};



export default Screen3;

import React from 'react';

import CardList from './CardList';


const Screen1 = ({ data }) => {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'lightcoral' }}>
        <CardList selectedComponent={'component1'}  text={'編輯'}  data1={data} screen={1}></CardList>
      </div>
    </>
  );
};



export default Screen1;

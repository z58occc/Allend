import React from 'react';
import CardList from './CardList';
// import SearchPage from './SearchPage';
// import {Button} from 'react-bootstrap';
const Screen2 = () => {
  // const visibility = 'hidden';
  return (
    <div style={{ width: '100%', height: '100vh', background: 'lightgreen' }}>
      <CardList visibility= 'hidden' selectedComponent={'component2'}></CardList>    
    </div>
  );
};


export default Screen2;

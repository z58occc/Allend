import React from 'react';
import CardList from './CardList';
import { CaseProvider } from './CaseContext';
// import SearchPage from './SearchPage';
// import {Button} from 'react-bootstrap';
const Screen2 = () => {
  return (
    <CaseProvider>
      <div style={{ width: '100%', height: '100vh', background: 'lightgreen' }}>
        <CardList visibility= 'hidden' selectedComponent={'component2'}></CardList>    
      </div>
    </CaseProvider>
   
  );
};


export default Screen2;

import React from 'react';
import { CaseProvider } from './CaseContext';
import CardList from './CardList';



const Screen1 = () => {


  return (
    <CaseProvider>
      <div style={{ width: '100%', height: '100vh', background: 'lightcoral' }}>
        <CardList selectedComponent={'component1'} text={"編輯"}></CardList>
      </div>
    </CaseProvider> );
    
};

export default Screen1;
import React, { useContext } from 'react';
import { CaseProvider } from './CaseContext';
import CardList from './CardList';
import CaseContext from './CaseContext';


const Screen2 = () => {
  return (
    <CaseProvider>
      <Screen2Content />
    </CaseProvider>
  );
};
const Screen2Content = () => {
  const { Case } = useContext(CaseContext);
  return (
    
      <div style={{ width: '100%', height: '100vh', background: 'lightgreen' }}>
        <CardList visibility= 'hidden' selectedComponent={'component2'} data={Case['CaseInProgress']} screen={2}></CardList>    
      </div>
    
   
  );
};


export default Screen2;

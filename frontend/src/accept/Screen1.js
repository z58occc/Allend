import React, { useContext } from 'react';
import { CaseProvider } from './CaseContext';
import CardList from './CardList';
import CaseContext from './CaseContext';

const Screen1 = () => {
  return (
    <CaseProvider>
      <Screen1Content />
    </CaseProvider>
  );
};

const Screen1Content = () => {
  const { Case } = useContext(CaseContext);
  return (
    <div style={{ width: '100%', height: '100vh', background: 'lightcoral' }}>
      <CardList selectedComponent={'component1'} data={Case['Quote']} screen={1}></CardList>
    </div>
  );
};

export default Screen1;

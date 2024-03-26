import React, { useContext } from 'react';
import { CaseProvider } from './CaseContext';
import CardList from './CardList';
import CaseContext from './CaseContext';

const Screen3 = () => {
  return (
    <CaseProvider>
      <Screen1Content />
    </CaseProvider>
  );
};

const Screen1Content = () => {
  const { Case } = useContext(CaseContext);
  return (
    <div style={{ width: '100%', height: '100vh', background: 'lightyellow' }}>
      <CardList  data={Case['CaseCompleted']} screen={3}></CardList>
    </div>
  );
};

export default Screen3;

import React from 'react';

import CardList from './CardList';


const Screen1 = () => {
  // Sample data for cards

  return (
    <div style={{ width: '100%', height: '100vh', background: 'lightcoral' }}>
      
      <CardList selectedComponent={'component1'}></CardList>
    </div>
  );
};

export default Screen1;
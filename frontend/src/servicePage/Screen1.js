import React, { useState } from 'react';
// import { CaseProvider } from './CaseContext';
import Provider from './provider';
import Work from './Work';
import Media from './Media';


const Screen1 = () => {
  return (
    <>
      <div class="d-flex flex-column justify-content-between" style={{ width: '100%', height: '1700px', background: 'lightcoral' }}>
        <Provider></Provider>
        <Work></Work>
        <Media></Media>
      </div>
    </>
  );

};

export default Screen1;
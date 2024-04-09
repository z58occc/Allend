import React from 'react';
// import { CaseProvider } from './CaseContext';
import Provider from './provider';
import Work from './Work';
import Media from './Media';


const Screen1 = ({data}) => {
  console.log(data);
  return (
    <>
      <div class="d-flex flex-column justify-content-between" style={{ width: '100%', height: '1700px', background: 'lightcoral' }}>
        <Provider data1={data.service}></Provider>
        <Work data2={data.project}></Work>
        <Media data3={data.video}></Media>
      </div>
    </>
  );

};

export default Screen1;
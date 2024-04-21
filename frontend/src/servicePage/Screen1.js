import React from 'react';
import Provider from './provider';
import Work from './Work';
import Media from './Media';


const Screen1 = ({data}) => {
  return (
      <div class="col d-flex flex-column justify-content-between" style={{ width: '100%', height: '100%'}}>
        <Provider data1={data.service}></Provider>
        <Work data2={data.project}></Work>
        <Media data3={data.video}></Media>
      </div>
  );
};


export default Screen1;
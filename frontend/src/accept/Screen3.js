import React from 'react';
import FinishedCase from './FinishedCase';
// import SearchPage from './SearchPage';
// import {Button} from 'react-bootstrap';
const Screen3 = () => {
    const data1 = [
        {
          title: '案件9',
          startDate: '2024/03/25',
          endDate: '2024/04/15',
          amount: 'NTD$ 8000',
          count: 8,
          rating: 3,
        },
        {
          title: '案件10',
          startDate: '2024/03/25',
          endDate: '2024/04/15',
          amount: 'NTD$ 8000',
          count: 8,
          rating: 4,
        },
        {
          title: '案件10',
          startDate: '2024/03/25',
          endDate: '2024/04/15',
          amount: 'NTD$ 8000',
          count: 8,
          rating: 2,
        },
        {
          title: '案件10',
          startDate: '2024/03/25',
          endDate: '2024/04/15',
          amount: 'NTD$ 8000',
          count: 8,
          rating: 1,
        },
        // 可以根據需要添加更多的案件資料
      ];
  return (
    <div style={{ width: '100%', height: '1100px', background: 'lightyellow' }}>
        
        <FinishedCase data={data1}></FinishedCase>
    </div>
    
  );
};

export default Screen3;

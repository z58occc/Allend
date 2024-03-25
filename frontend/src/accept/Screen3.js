import React from 'react';
import FinishedCase from './FinishedCase';
// import SearchPage from './SearchPage';
// import {Button} from 'react-bootstrap';
const Screen3 = () => {
  const data2 = [
    { 
      caseNumber: '12345',
      caseName: '案件1',
      caseCategory: '建築',
      location: '台北市',
      budgetAmount: '$100,000',
      startDate: '2024/03/20',
      endDate: '2024/04/10',
      contractorName: '王小明',
      contractorEmail: 'wang@example.com',
      contractorPhone: '0912345678',
      amount: 'NTD$ 5000',
      count: 5,
      rating: 4,
    },
    { 
      caseNumber: '12345',
      caseName: '案件2',
      caseCategory: '建築',
      location: '台北市',
      budgetAmount: '$100,000',
      startDate: '2024/03/20',
      endDate: '2024/04/10',
      contractorName: '王小明',
      contractorEmail: 'wang@example.com',
      contractorPhone: '0912345678',
      amount: 'NTD$ 5000',
      count: 5,
      rating: 4,
    },
    { 
      caseNumber: '7777',
      caseName: '案件3',
      caseCategory: '建築',
      location: '台北市',
      budgetAmount: '$100,000',
      startDate: '2024/03/20',
      endDate: '2024/04/10',
      contractorName: '王',
      contractorEmail: 'wang@example.com',
      contractorPhone: '0912345678',
      amount: 'NTD$ 5000',
      count: 5,
      rating: 4,
    }
  ];
  return (
    <div style={{ width: '100%', height: '100vh', background: 'lightblue' }}>
        
        <FinishedCase data={data2}></FinishedCase>
    </div>
    
  );
};

export default Screen3;

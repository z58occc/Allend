import { createContext, useState } from "react";
const CaseContext = createContext();


export const CaseProvider2 = ({ children }) => {
  
  const [Case, setCase] = useState
    (
      [
        {
          caseNumber: '1',
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
        },
        {
          caseNumber: '2',
          caseName: '案件2',
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
        },
      ]
    );

  return (
    <CaseContext.Provider value={{ Case, setCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export default CaseContext;
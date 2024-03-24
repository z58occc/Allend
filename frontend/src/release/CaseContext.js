import { createContext,useState } from "react";
const CaseContext = createContext();


export const CaseProvider = ({ children }) => {
    const [Case, setCase] = useState
    (
      [
        { 
        id: 0,
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
        id: 1,
        caseNumber: '2',
        caseName: '案件2',
        caseCategory: '建築',
        location: '台北市',
        budgetAmount: '$100,000',
        startDate: '2024/03/20',
        endDate: '2024/04/10',
        contractorName: '王8',
        contractorEmail: 'wang8egg@example.com',
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
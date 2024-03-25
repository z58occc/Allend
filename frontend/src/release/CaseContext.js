import { createContext,useState } from "react";
const CaseContext = createContext();
// import axios from "axios";

export const CaseProvider = ({ children }) => {
    // axios('http://127.0.0.1/Allend/backend/public/api/demmand_content', {
    //   method: 'GET',
    //   // params: {
    //   //   mid: 
    //   // },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(response => console.log(response.json()))
    // .then(data => console.log(data))


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
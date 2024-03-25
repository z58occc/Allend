import { createContext,useEffect,useState } from "react";
import axios from "axios";
const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
//     const response =  axios.get('http://127.0.0.1/Allend/backend/public/api/memberTakeCase', {
//       params: {
//         mid: 5 
//       },
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })
//     // const jsonObj = await response.json()
//     console.log(response)

const fetchdata = () => {
  axios.get('http://127.0.0.1/Allend/backend/public/api/memberTakeCase',
  {
    params: {
      mid: 5 
    },
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res)=>{
    console.log(res)
    setCase(res.data)
  }).then((data)=>{
    console.log(data)
  })
}
useEffect(()=>{
  fetchdata()
}, [])
    const [Case, setCase] = useState
    (

      [
        { 
        caseNumber: '1',
        caseName: '案件1',
        caseCategory: '建築',
        location: '台北市',
        budgetAmount: 100000,
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
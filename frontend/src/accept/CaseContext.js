import { createContext, useEffect, useState } from "react";
import axios from "axios";
const CaseContext = createContext();

export const CaseProvider = ({ children }) => {

  const [Case, setCase] = useState({
    "Quote": [
      {
        "d_name": "",
        "q_amount": 0
      },
    ],
    "CaseInProgress": [
      {
        "c_name": "",
        "c_amount": 0
      },

    ],
    "CaseCompleted": [
      {
        "c_name": "",
        "c_amount": 0
      }
    ]
  })
  // useEffect(() => {
  //   const fetchData =  async () => {
  //     try {
  //         axios.get('http://127.0.0.1/Allend/backend/public/api/memtakecase', {
  //         params: {
  //           mid: 3 
  //         },
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       }).then((res)=>{

  //         setCase(res.data)
  //       })
  //       ;

  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //     }
  //   }

  //   fetchData();
  // }, []); 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1/Allend/backend/public/api/memtakecase', {
        params: {
          mid: 1
        },
        headers: {
          'Content-Type': 'application/json'
        },
      }
      )

      setCase(result.data)
    }

    fetchData()
  }, [])






  // const [Case, setCase] = useState
  // (
  //   {
  //     "Quote": [
  //         {
  //             "d_name": "網站設計",
  //             "q_amount": "10000"
  //         },
  //         {
  //             "d_name": "設計",
  //             "q_amount": "20000"
  //         },
  //     ],
  //     "CaseInProgress": [
  //         {
  //             "c_name": "流行音樂網站",
  //             "c_amount": 3000
  //         }
  //     ],
  //     "CaseCompleted": [
  //         {
  //             "c_name": "loopcode",
  //             "c_amount": 20000
  //         }
  //     ]
  //   }

  // );

  return (
    <CaseContext.Provider value={{ Case, setCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export default CaseContext;
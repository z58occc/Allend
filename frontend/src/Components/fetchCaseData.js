// import { findcaseData } from "./findcaseData";
// function fetchData({ type = "", duration = "", city = "", budget = "" }) {
//     //類別
//     switch (type) {
//         case "1":
//             newArray = findcaseData.filter((item) => item.type == "網站設計")
//             break;
//         case "2":
//             newArray = findcaseData.filter((item) => item.type == "軟體程式")
//             break;
//         case "3":
//             newArray = findcaseData.filter((item) => item.type == "平面設計")
//             break;
//         case "4":
//             newArray = findcaseData.filter((item) => item.type == "文字語言")
//             break;
//         case "5":
//             newArray = findcaseData.filter((item) => item.type == "專業諮詢")
//             break;

//         default:
//             newArray = findcaseData
//             break;
//     }
//     setPosts(newArray);

//     //類別


//     //都市
//     const countryQuery = Object.keys(checkedState)
//         .filter((key) => checkedState[key])
//         .map((key) => {
//             switch (key) {
//                 case "台北市":
//                     return "台北市"
//                 case "新北市":
//                     return "新北市"
//                 case "桃園市":
//                     return "桃園市"
//                 case "基隆市":
//                     return "基隆市"
//                 case "新竹市":
//                     return "新竹市"
//                 case "新竹縣":
//                     return "新竹縣"
//                 case "彰化縣":
//                     return "彰化縣"
//                 case "南投縣":
//                     return "南投縣"
//                 case "雲林縣":
//                     return "雲林縣"
//                 case "高雄市":
//                     return "高雄市"
//                 case "台南市":
//                     return "台南市"
//                 case "嘉義市":
//                     return "嘉義市"
//                 case "嘉義縣":
//                     return "嘉義縣"
//                 case "屏東縣":
//                     return "屏東縣"
//                 case "宜蘭縣":
//                     return "宜蘭縣"
//                 case "花蓮縣":
//                     return "花蓮縣"
//                 case "臺東縣":
//                     return "臺東縣"
//                 case "澎湖縣":
//                     return "澎湖縣"
//                 case "金門縣":
//                     return "金門縣"
//                 case "連江縣":
//                     return "連江縣"
//                 default:
//                     return "";
//             }
//         })
//         .join(",");


//     if (countryQuery == false) {
//         setPosts(findcaseData);
//     } else {

//         setPosts((preData) => {
//             return (
//                 preData.filter(item => countryQuery.includes(item.country_city))
//             )
//         })

//     }
//     //都市

//     //預算
//     const budgetQuery = Object.keys(budgetstate)
//         .filter((key) => budgetstate[key])
//         .map((key) => {
//             switch (key) {
//                 case "五千":
//                     return {
//                         min: 0,
//                         max: 5000
//                     };
//                 case "一萬":
//                     return {
//                         min: 5001,
//                         max: 10000
//                     };
//                 case "五萬":
//                     return {
//                         min: 10001,
//                         max: 50000
//                     };
//                 case "十萬":
//                     return {
//                         min: 50001,
//                         max: 100000
//                     };
//                 case "三十萬":
//                     return {
//                         min: 100001,
//                         max: 300000
//                     };
//                 default:
//                     return null;
//             }
//         })

//     console.log(budgetQuery);

//     if (budgetQuery == false) {
//         setPosts(findcaseData)
//     } else {


//         setPosts((preData) => {
//             return (
//                 preData.filter(item => {
//                     return budgetQuery.some(range => item.d_amount >= range.min && item.d_amount <= range.max)
//                 })
//             )
//         })

//     }
//     //預算

// }
// export default fetchData;
// const response = await axios.get(
//     `http://localhost/Allend/backend/public/api/findcase?type=${type}&location=${countryQuery}&amount=${budgetQuery}&d_duration=${durationQuery}&order=${orderQuery}`
//   );
import { findcaseData } from "./findcaseData";
function fetchData({ type = "", duration = "", city = "", budget = "" }) {

    // 分類type//
    const newArray = [];
    console.log(type);
    switch (type) {
        case "1":
            for (let i = 0; i < findcaseData.length; i++) {
                if (findcaseData[i].type == "網站設計") {
                    newArray.push(findcaseData[i]);
                }
            }
            break;
        case "2":
            for (let i = 0; i < findcaseData.length; i++) {
                if (findcaseData[i].type == "軟體程式") {
                    newArray.push(findcaseData[i]);
                }
            }
            break;
        case "3":
            for (let i = 0; i < findcaseData.length; i++) {
                if (findcaseData[i].type == "平面設計") {
                    newArray.push(findcaseData[i]);
                }
            }
            break;
        case "4":
            for (let i = 0; i < findcaseData.length; i++) {
                if (findcaseData[i].type == "文字語言") {
                    newArray.push(findcaseData[i]);
                }
            }
            break;
        case "5":
            for (let i = 0; i < findcaseData.length; i++) {
                if (findcaseData[i].type == "專業諮詢") {
                    newArray.push(findcaseData[i]);
                }
            }
            break;


        default:
            
            break;
    }
    // 分類type//

    // 分類duration
    const secondArray=[];
    switch (duration) {
        case "短":
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].d_duration == "短") {
                    secondArray.push(newArray[i])
                }
            }
            break;
        case "長":
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].d_duration == "長") {
                    secondArray.push(newArray[i])
                }
            }
            break;


        default:
            break;
    }
    // 分類duration

    // const cityFilter = findcaseData.filter(item=>city.includes(item.country_city));
    // console.log(cityFilter);
    // return cityFilter;
    return newArray;
}
export default fetchData;
// const response = await axios.get(
//     `http://localhost/Allend/backend/public/api/findcase?type=${type}&location=${countryQuery}&amount=${budgetQuery}&d_duration=${durationQuery}&order=${orderQuery}`
//   );
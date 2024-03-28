import React, { useEffect, useState } from 'react'
import Footer from '../homepage/Footer';
import Category from './Category'
import { GoTriangleDown } from "react-icons/go";
import NextPage from '../homepage/NextPage';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import Buttom1 from './Buttom1';
import axios from 'axios';

const Findman=() => {

    const [service, setService] = React.useState([]);

    const [identity, setIdentity] = React.useState({
        personal:false,
        company:false,
        studio:false
    });

    const [seniority, setSeniority] = React.useState({
        year1:false,
        year2:false,
        year3:false,
        year4:false,
        year5:false
    });


    useEffect(() => {
        const fetchService = async () => {
            try{
            const identityQuery = Object.keys(identity)
            .filter((key) => identity[key])
            .map(key => {
                switch(key){
                    case 'personal':
                        return '1';
                    case 'company':
                        return '2';
                    case 'studio':
                        return '3';
                    default:
                        return '';
                }})
            .join(',');

            const seniorityQuery = Object.keys(seniority)
            .filter((key) => seniority[key])
            .map(key => {
                switch(key){
                    case 'year1':
                        return '1';
                    case 'year2':
                        return '2';
                    case 'year3':
                        return '3';
                    case 'year4':
                        return '4';
                    case 'year5':
                        return '5';
                    default:
                        return '';
                }})
            .join(',');
            const response = await axios.get(`http://localhost/Allend/backend/public/api/printservicecardcontent?identity=${identityQuery}&seniority=${seniorityQuery}`);

            setService(response.data);

            }catch(err){
                console.error(err);
            }
        };
        fetchService();
    }, [identity, seniority]);

    const handleidentityChange = (event) => {
        const {name, checked} = event.target;
        setIdentity(prevState => ({
            ...prevState,
            [name]:checked}));
    };
    const handleseniorityChange = (event) => {
        const {name, checked} = event.target;
        setSeniority(prevState => ({
            ...prevState,
            [name]:checked}));
    };


    return (
        
        <div className='container'>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <Category></Category>
            <hr></hr>
            <div className='row'>

                {/* 左邊 */}
                <div className='col-sm-2'>
                    <br></br>
                    <div style={{  height: '250px', overflowY: 'scroll', border: 'solid' }}>
                        接案人身分
                        <hr></hr>
                        <input type='checkbox' name='personal' value='1'  onChange={handleidentityChange}></input>個人<br></br>
                        <input type='checkbox' name='company' value='2'  onChange={handleidentityChange}></input>公司<br></br>
                        <input type='checkbox' name='studio' value='3'  onChange={handleidentityChange}></input>工作室<br></br>
                    </div>
                    <br></br>
                    <div style={{  height: '250px', overflowY: 'scroll', border: 'solid' }}>
                        年資
                        <hr></hr>
                        <input type='checkbox' name='year1' value='1'  onChange={handleseniorityChange}></input>1年<br></br>
                        <input type='checkbox' name='year2' value='2'  onChange={handleseniorityChange}></input>2年<br></br>
                        <input type='checkbox' name='year3' value='3'  onChange={handleseniorityChange}></input>3年<br></br>
                        <input type='checkbox' name='year4' value='4'  onChange={handleseniorityChange}></input>4年<br></br>
                        <input type='checkbox' name='year5' value='5'  onChange={handleseniorityChange}></input>5年以上<br></br>
                    </div>
                    <br></br>
                    <div style={{ height: '250px', overflowY: 'scroll', border: 'solid' }}>
                        地點
                        <hr></hr>
                        <input type='checkbox'></input>臺北市<br></br>
                        <input type='checkbox'></input>新北市<br></br>
                        <input type='checkbox'></input>基隆市<br></br>
                        <input type='checkbox'></input>新竹市<br></br>
                        <input type='checkbox'></input>新竹縣<br></br>
                        <input type='checkbox'></input>宜蘭縣<br></br>
                        <input type='checkbox'></input>臺中市<br></br>
                        <input type='checkbox'></input>苗栗縣<br></br>
                        <input type='checkbox'></input>彰化縣<br></br>
                        <input type='checkbox'></input>南投縣<br></br>
                        <input type='checkbox'></input>雲林縣<br></br>
                        <input type='checkbox'></input>高雄市<br></br>
                        <input type='checkbox'></input>臺南市<br></br>
                        <input type='checkbox'></input>嘉義市<br></br>
                        <input type='checkbox'></input>嘉義縣<br></br>
                        <input type='checkbox'></input>屏東縣<br></br>
                        <input type='checkbox'></input>澎湖縣<br></br>
                        <input type='checkbox'></input>花蓮縣<br></br>
                        <input type='checkbox'></input>臺東縣<br></br>
                        <input type='checkbox'></input>金門縣<br></br>
                        <input type='checkbox'></input>連江縣<br></br>
                    </div>
                    <br></br>
                </div>

                {/* 右邊 */}
                <div className='col-sm-10'>
                    <div style={{ textAlign: 'end' }}>
                        <button>最近更新<GoTriangleDown /></button>
                        <button>最新刊登<GoTriangleDown /></button>
                        <button>預算金額<GoTriangleDown /></button>
                        <button>提案人數<GoTriangleDown /></button>
                    </div>
                    <div className="row ">
                    {service.map((data,index)=>(
                        <div className="col-sm-4 " key={index}>
                            <div className='card' >
                                <div className="card-header">
                                    <div style={{display:'block',position:'relative'}}>
                                <img src={`data:image/jpeg;base64,${data.image}`} alt='service' style={{height:200, width:300, display:'block' }} />
                                    </div>
                                </div>
                                <Link to='/talent' className="card-body">
                                    會員名稱:{data.name}
                                    <br></br>
                                    服務名稱:{data.s_name}
                                    <br></br>
                                    <br></br>
                                    作品數:{data.ptotal}
                                    <br></br>
                                </Link>
                                <div className="card-footer">
                                    <FaHeart color='red'></FaHeart>
                                    <Buttom1></Buttom1>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <NextPage></NextPage>
            <Footer></Footer>
        </div>
    )
                    
}


export default Findman
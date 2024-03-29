import React, { useEffect, useState } from "react";
import Footer from "../homepage/Footer";
import Category from "./Category2";
import { GoTriangleDown } from "react-icons/go";
import NextPage from '../homepage/NextPage';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import Buttom1 from './Buttom1';
import axios from 'axios';

const Findman = () => {

  const [service, setService] = React.useState([]);

  const [identity, setIdentity] = React.useState({
    personal: false,
    company: false,
    studio: false
  });

  const [seniority, setSeniority] = React.useState({
    year1: false,
    year2: false,
    year3: false,
    year4: false,
    year5: false
  });

  const [country,setCountry] = React.useState({
    taipei: false,
    newtaipei: false,
    taoyuan: false,
    keelung: false,
    hsinchu: false,
    hsinchucounty: false,
    yilan: false,
    taichung: false,
    miaoli: false,
    changhua: false,
    nantou: false,
    yunlin: false,
    kaohsiung: false,
    tainan: false,
    chiayi: false,
    chiayicounty: false,
    pingtung: false,
    hualien: false,
    taitung: false,
    penghu: false,
    kinmen: false,
    lienchang: false
  });

  const [sort, setSort] = React.useState({});


  useEffect(() => {
    const fetchService = async () => {
      try {
        const identityQuery = Object.keys(identity)
          .filter((key) => identity[key])
          .map(key => {
            switch (key) {
              case 'personal':
                return '1';
              case 'company':
                return '2';
              case 'studio':
                return '3';
              default:
                return '';
            }
          })
          .join(',');

        const seniorityQuery = Object.keys(seniority)
          .filter((key) => seniority[key])
          .map(key => {
            switch (key) {
              case 'year1':return '1';case 'year2':return '2';case 'year3':
                return '3';case 'year4':return '4';case 'year5':return '5';
              default:return '';
            }
          })
          .join(',');

          const countryQuery = Object.keys(country)
          .filter((key) => country[key])
          .map(key => {
            switch (key) {
              case 'taipei':return '1';
              case 'newtaipei':return '2';
              case 'taoyuan':return '3';
              case 'keelung':return '4';
              case 'hsinchu':return '5';
              case 'hsinchucounty':return '6';
              case 'yilan':return '7';
              case 'taichung':return '8';
              case 'miaoli':return '9';
              case 'changhua':return '10';
              case 'nantou':return '11';
              case 'yunlin':return '12';
              case 'kaohsiung':return '13';
              case 'tainan':return '14';
              case 'chiayi':return '15';
              case 'chiayicounty':return '16';
              case 'pingtung':return '17';
              case 'hualien':return '18';
              case 'taitung':return '19';
              case 'penghu':return '20';
              case 'kinmen':return '21';
              case 'lienchang':return '22';
              default:return '';
            }
          })
          .join(',');

          const sortQuery = Object.keys(sort);







        const response = await axios
        .get(`http://localhost/Allend/backend/public/api/printservicecardcontent?identity=${identityQuery}&seniority=${seniorityQuery}&country=${countryQuery}&sort=${sortQuery} `);

        setService(response.data);

      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [identity, seniority,country,sort]);

  const handleidentityChange = (event) => {
    const { name, checked } = event.target;
    setIdentity(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };
  const handleseniorityChange = (event) => {
    const { name, checked } = event.target;
    setSeniority(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handlecountryChange = (event) => {
    const { name, checked } = event.target;
    setCountry(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const clicksort = (sorttype) => {
    setSort({ [sorttype]: true });
  };

  return (
    <>
      <div className="container">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

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
          <div className='col-sm-2' style={{marginTop:"10px"}}>
            <br></br>
            <div style={{ height: '250px', overflowY: 'scroll', border: 'solid' }}>
              接案人身分
              <hr></hr>
              <input type='checkbox' name='personal' value='1' onChange={handleidentityChange}></input>個人<br></br>
              <input type='checkbox' name='company' value='2' onChange={handleidentityChange}></input>公司<br></br>
              <input type='checkbox' name='studio' value='3' onChange={handleidentityChange}></input>工作室<br></br>
            </div>
            <br></br>
            <div style={{ height: '250px', overflowY: 'scroll', border: 'solid' }}>
              年資
              <hr></hr>
              <input type='checkbox' name='year1' value='1' onChange={handleseniorityChange}></input>1年<br></br>
              <input type='checkbox' name='year2' value='2' onChange={handleseniorityChange}></input>2年<br></br>
              <input type='checkbox' name='year3' value='3' onChange={handleseniorityChange}></input>3年<br></br>
              <input type='checkbox' name='year4' value='4' onChange={handleseniorityChange}></input>4年<br></br>
              <input type='checkbox' name='year5' value='5' onChange={handleseniorityChange}></input>5年以上<br></br>
            </div>
            <br></br>
            <div style={{ height: '250px', overflowY: 'scroll', border: 'solid' }}>
              地點
              <hr></hr>
              <input type='checkbox' name="taipei" value='1' onChange={handlecountryChange}></input>臺北市<br></br>
              <input type='checkbox' name="newtaipei" value='2' onChange={handlecountryChange}></input>新北市<br></br>
              <input type='checkbox' name="taoyuan" value='3' onChange={handlecountryChange}></input>桃園市<br></br>
              <input type='checkbox' name="keelung" value='4' onChange={handlecountryChange}></input>基隆市<br></br>
              <input type='checkbox' name="hsinchu" value='5' onChange={handlecountryChange}></input>新竹市<br></br>
              <input type='checkbox' name="hsinchucounty" value='6' onChange={handlecountryChange}></input>新竹縣<br></br>
              <input type='checkbox' name="yilan" value='7' onChange={handlecountryChange}></input>宜蘭縣<br></br>
              <input type='checkbox' name="taichung" value='8' onChange={handlecountryChange}></input>臺中市<br></br>
              <input type='checkbox' name="miaoli" value='9' onChange={handlecountryChange}></input>苗栗縣<br></br>
              <input type='checkbox' name="changhua" value='10' onChange={handlecountryChange}></input>彰化縣<br></br>
              <input type='checkbox' name="nantou" value='11' onChange={handlecountryChange}></input>南投縣<br></br>
              <input type='checkbox' name="yunlin" value='12' onChange={handlecountryChange}></input>雲林縣<br></br>
              <input type='checkbox' name="kaohsiung" value='13' onChange={handlecountryChange}></input>高雄市<br></br>
              <input type='checkbox' name="tainan" value='14' onChange={handlecountryChange}></input>臺南市<br></br>
              <input type='checkbox' name="chiayi" value='15' onChange={handlecountryChange}></input>嘉義市<br></br>
              <input type='checkbox' name="chiayicounty" value='16' onChange={handlecountryChange}></input>嘉義縣<br></br>
              <input type='checkbox' name="pingtung" value='17' onChange={handlecountryChange}></input>屏東縣<br></br>
              <input type='checkbox' name="hualien" value='18' onChange={handlecountryChange}></input>花蓮縣<br></br>
              <input type='checkbox' name="taitung" value='19' onChange={handlecountryChange}></input>臺東縣<br></br>
              <input type='checkbox' name="penghu" value='20' onChange={handlecountryChange}></input>澎湖縣<br></br>
              <input type='checkbox' name="kinmen" value='21' onChange={handlecountryChange}></input>金門縣<br></br>
              <input type='checkbox' name="lienchang" value='22' onChange={handlecountryChange}></input>連江縣<br></br>
            </div>
            <br></br>
          </div>

        {/* 右邊 */}
        <div className="col-sm-10">
          <div style={{ textAlign: "end" }}>
          <button onClick={() => clicksort(1)}>
              作品數
              <GoTriangleDown />
            </button>
            <button onClick={() => clicksort(2)}>
              最新刊登
              <GoTriangleDown />
            </button>
            <button onClick={() => clicksort(3)}>
              預算金額
              <GoTriangleDown />
            </button>
          </div>
          <div className="row ">
            {service.map((service, index) => (
              <div className="col-sm-4 " key={index} style={{ marginBottom:"5px", marginTop:"5px"}}>
                <div className="card">
                  <div className="card-header">
                    <img
                      src={`data:image/jpeg;base64,${service.image}`}
                      alt="service"
                      style={{ width: 300, height: 200, position:"block"}}
                    />
                  </div>
                  <Link to="/talent" className="card-body">
                    服務名稱:{service.name}
                    <br></br>
                    人才名稱:{service.s_name}
                    <br></br>
                    作品數:{service.ptotal}
                    <br></br>
                  </Link>
                  <div className="card-footer">
                    <FaHeart color="red"></FaHeart>
                    <Buttom1></Buttom1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NextPage></NextPage>
     </div>
   <Footer></Footer>
   </>
  );
};

export default Findman;


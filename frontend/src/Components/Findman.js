import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, } from "react-router-dom";
import Footer from "../homepage/Footer";
import { AiOutlineArrowUp } from "react-icons/ai";
import { GoTriangleDown } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Cookies from 'js-cookie';
import { IsLoggedInContext } from "../App";
import NextPage from "../homepage/NextPage";
import Chatbutton from "./ChatButtom";
import Category from "./Category2";
import styles from "./Findman.module.css";
// import "./Findman.css";


const Findman = () => {
  // 是否登入
  const {isLoggedIn, setIsLoggedIn, handleShow,showChat,setShowChat,setSelectedItemMid} = useContext(IsLoggedInContext);
  // 儲存撈回來的資料
  const [service, setService] = useState([]);

  
  


  const toggleChat = (mid) => {
    setSelectedItemMid(mid);
    setShowChat(!showChat);
  };

  const [identity, setIdentity] = useState({
    personal: false,
    company: false,
    studio: false,
  });

  const [seniority, setSeniority] = useState({
    year1: false,
    year2: false,
    year3: false,
    year4: false,
    year5: false,
  });

  const [country, setCountry] = useState({
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
    lienchang: false,
  });

  const { s_type, servicesearch } = useParams();

  // 儲存排序鈕顏色
  const [act, setAct] = useState();

  const [sort, setSort] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (Cookies.get('token')) {
      setIsLoggedIn(true)
    }



    const fetchService = async () => {
      try {
        const identityQuery = Object.keys(identity)
          .filter((key) => identity[key])
          .map((key) => {
            switch (key) {
              case "personal":
                return "1";
              case "company":
                return "2";
              case "studio":
                return "3";
              default:
                return "";
            }
          })
          .join(",");

        const seniorityQuery = Object.keys(seniority)
          .filter((key) => seniority[key])
          .map((key) => {
            switch (key) {
              case "year1":
                return "1";
              case "year2":
                return "2";
              case "year3":
                return "3";
              case "year4":
                return "4";
              case "year5":
                return "5";
              default:
                return "";
            }
          })
          .join(",");

        const countryQuery = Object.keys(country)
          .filter((key) => country[key])
          .map((key) => {
            switch (key) {
              case "taipei":
                return "1";
              case "newtaipei":
                return "2";
              case "taoyuan":
                return "3";
              case "keelung":
                return "4";
              case "hsinchu":
                return "5";
              case "hsinchucounty":
                return "6";
              case "yilan":
                return "7";
              case "taichung":
                return "8";
              case "miaoli":
                return "9";
              case "changhua":
                return "10";
              case "nantou":
                return "11";
              case "yunlin":
                return "12";
              case "kaohsiung":
                return "13";
              case "tainan":
                return "14";
              case "chiayi":
                return "15";
              case "chiayicounty":
                return "16";
              case "pingtung":
                return "17";
              case "hualien":
                return "18";
              case "taitung":
                return "19";
              case "penghu":
                return "20";
              case "kinmen":
                return "21";
              case "lienchang":
                return "22";
              default:
                return "";
            }
          })
          .join(",");

        const sortQuery = Object.keys(sort);
        if (servicesearch == undefined) {
          if (isLoggedIn) {
            const response = await axios.get(
              `http://localhost/Allend/backend/public/api/printservicecardcontent?identity=
            ${identityQuery}&seniority=${seniorityQuery}&country=${countryQuery}&sort=${sortQuery}&page=${currentPage}&s_type=${s_type}`,
              { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }
            );
            setService(response.data.data);
            setTotalPages(response.data.last_page);
          } else {
            const response = await axios.get(
              `http://localhost/Allend/backend/public/api/printservicecardcontent?identity=
            ${identityQuery}&seniority=${seniorityQuery}&country=${countryQuery}&sort=${sortQuery}&page=${currentPage}&s_type=${s_type}`
            );
            setService(response.data.data);
            setTotalPages(response.data.last_page);
          }
        } else {
          const response = await axios.get(
            `http://localhost/Allend/backend/public/api/printservicecardcontent?identity=
            ${identityQuery}&seniority=${seniorityQuery}&country=${countryQuery}&sort=${sortQuery}&page=${currentPage}&s_type=${s_type}&servicesearch=${servicesearch}`
          );
          setService(response.data.data);
          setTotalPages(response.data.last_page);
        }

      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [servicesearch, identity, seniority, country, sort, currentPage, s_type, isLoggedIn]);

  const [textShow, setTextShow] = useState(service.map((item, i) => ({
    sid: item.sid,
    show: false
  })));

  // 加入收藏
  const addServiceCollection = (sid) => {
    axios({
      method: "post",
      url: "http://localhost/Allend/backend/public/api/addcollection",
      data: { sid: sid },
      headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    })
      .then((res) => {
        const newData = service.map((item) => item.sid === sid ? { ...item, fid: res.data.fid.fid } : item);
        setService(newData)
        // setTextShow(service.map((item) => {item.sid === sid ? {...item, show:true} : item }))
        // setTimeout(()=>{
        //     setTextShow(service.map((item) => {item.sid === sid ? {...item, show:false} : item }))
        // }, 3000)

      })
      .catch((err) => { console.log(err) })
  }

  // 取消收藏
  const cancelServiceCollection = (fid) => {
    axios({
      method: 'post',
      url: "http://localhost/Allend/backend/public/api/delcollection",
      data: { fid: fid },
      headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    })
      .then((res) => {
        const newData = service.map((item) => item.fid === fid ? { ...item, fid: null } : item);
        setService(newData)
      })
      .catch((err) => { console.log(err) })
  }

  const handleidentityChange = (event) => {
    const { name, checked } = event.target;
    setIdentity((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleseniorityChange = (event) => {
    const { name, checked } = event.target;
    setSeniority((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handlecountryChange = (event) => {
    const { name, checked } = event.target;
    setCountry((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const clicksort = (sorttype) => {
    setSort({ [sorttype]: true });
    setAct(sorttype)
  };

  {/* 切換上下頁 */ }
  const nextPage = () => {
    setCurrentPage(currentPage + 1);

  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  {/* 切換上下頁 */ }

  {/* 置頂按鈕 */ }
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down beyond a certain point
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  {/* 置頂按鈕 */ }

  return (
    <>
      {/* 置頂按鈕 */}
      {showScrollButton && (
        <button
          className="btn btn-primary rounded-circle shadow"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "20px",
            zIndex: "1000" // Set a high z-index to make sure it appears on top
          }}
          onClick={scrollToTop}
        >
          <AiOutlineArrowUp style={{ fontSize: "24px" }} />
        </button>
      )}

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
        <hr />
        <div className="row">
          {/* 左邊 */}
          <div className="col-sm-2" style={{ marginTop: '45px' }}>
            {/* <br></br> */}
            <div className={`${styles.selectContainer}`}>
              <div className={`${styles.identity}`}>接案人身分</div>
              <div className={`${styles.checkboxContainer}`}>
                <input
                  type="checkbox"
                  name="personal"
                  value="1"
                  id="personalCheckbox"
                  onChange={handleidentityChange}
                ></input>
                <label className="ms-2" htmlFor="personalCheckbox">個人</label><br></br>
                <input
                  type="checkbox"
                  name="company"
                  value="2"
                  id="companyCheckbox"
                  onChange={handleidentityChange}
                ></input>
                <label className="ms-2" htmlFor="companyCheckbox">公司</label><br></br>
                <input
                  type="checkbox"
                  name="studio"
                  value="3"
                  id="studioCheckbox"
                  onChange={handleidentityChange}
                ></input>
                <label className="ms-2" htmlFor="studioCheckbox">工作室</label>
              </div>
            </div>

            <div className={`${styles.selectContainer}`}>
              <div className={`${styles.identity}`}>年資</div>
              <div className={`${styles.checkboxContainer}`}>
                <input
                  type="checkbox"
                  name="year1"
                  value="1"
                  id="year1Checkbox"
                  onChange={handleseniorityChange}
                ></input>
                <label className="ms-2" htmlFor="year1Checkbox">1年</label><br></br>
                <input
                  type="checkbox"
                  name="year2"
                  value="2"
                  id="year2Checkbox"
                  onChange={handleseniorityChange}
                ></input>
                <label className="ms-2" htmlFor="year2Checkbox">2年</label><br></br>
                <input
                  type="checkbox"
                  name="year3"
                  value="3"
                  id="year3Checkbox"
                  onChange={handleseniorityChange}
                ></input>
                <label className="ms-2" htmlFor="year3Checkbox">3年</label><br></br>
                <input
                  type="checkbox"
                  name="year4"
                  value="4"
                  id="year4Checkbox"
                  onChange={handleseniorityChange}
                ></input>
                <label className="ms-2" htmlFor="year4Checkbox">4年</label><br></br>
                <input
                  type="checkbox"
                  name="year5"
                  value="5"
                  id="year5Checkbox"
                  onChange={handleseniorityChange}
                ></input>
                <label className="ms-2" htmlFor="year5Checkbox">5年以上</label><br></br>
              </div>
            </div>

            <div className={`${styles.selectContainer}`} style={{ height: '500px' }}>
              <div className={`${styles.identity}`}>地點</div>
              <div className={`${styles.checkboxContainer}`} style={{ overflowY: 'scroll', height: "90%" }}>
                <optgroup label="北部"></optgroup>
                <input
                  type="checkbox"
                  name="taipei"
                  value="1"
                  id="taipeiCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="taipeiCheckbox">臺北市</label><br></br>
                <input
                  type="checkbox"
                  name="newtaipei"
                  value="2"
                  id="newtaipeiCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="newtaipeiCheckbox">新北市</label><br></br>
                <input
                  type="checkbox"
                  name="taoyuan"
                  value="3"
                  id="taoyuanCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="taoyuanCheckbox">桃園市</label><br></br>
                <input
                  type="checkbox"
                  name="keelung"
                  value="4"
                  id="keelungCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="keelungCheckbox">基隆市</label><br></br>
                <input
                  type="checkbox"
                  name="hsinchu"
                  value="5"
                  id="hsinchuCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="hsinchuCheckbox">新竹市</label><br></br>
                <input
                  type="checkbox"
                  name="hsinchucounty"
                  value="6"
                  id="hsinchucountyCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="hsinchucountyCheckbox">新竹縣</label><br></br>
                <optgroup label="中部"></optgroup>
                <input
                  type="checkbox"
                  name="taichung"
                  value="8"
                  id="taichungCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="taichungCheckbox">臺中市</label><br></br>
                <input
                  type="checkbox"
                  name="miaoli"
                  value="9"
                  id="miaoliCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="miaoliCheckbox">苗栗縣</label><br></br>
                <input
                  type="checkbox"
                  name="changhua"
                  value="10"
                  id="changhuaCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="changhuaCheckbox">彰化縣</label><br></br>
                <input
                  type="checkbox"
                  name="nantou"
                  value="11"
                  id="nantouCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="nantouCheckbox">南投縣</label><br></br>
                <optgroup label="南部"></optgroup>
                <input
                  type="checkbox"
                  name="yunlin"
                  value="12"
                  id="yunlinCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="yunlinCheckbox">雲林縣</label><br></br>
                <input
                  type="checkbox"
                  name="kaohsiung"
                  value="13"
                  id="kaohsiungCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="kaohsiungCheckbox">高雄市</label><br></br>
                <input
                  type="checkbox"
                  name="tainan"
                  value="14"
                  id="tainanCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="tainanCheckbox">臺南市</label><br></br>
                <input
                  type="checkbox"
                  name="chiayi"
                  value="15"
                  id="chiayiCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="chiayiCheckbox">嘉義市</label><br></br>
                <input
                  type="checkbox"
                  name="chiayicounty"
                  value="16"
                  id="chiayicountyCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="chiayicountyCheckbox">嘉義縣</label><br></br>
                <input
                  type="checkbox"
                  name="pingtung"
                  value="17"
                  id="pingtungCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="pingtungCheckbox">屏東縣</label><br></br>
                <optgroup label="東部"></optgroup>
                <input
                  type="checkbox"
                  name="yilan"
                  value="7"
                  id="yilanCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="yilanCheckbox">宜蘭縣</label><br></br>
                <input
                  type="checkbox"
                  name="hualien"
                  value="18"
                  id="hualienCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="hualienCheckbox">花蓮縣</label><br></br>
                <input
                  type="checkbox"
                  name="taitung"
                  value="19"
                  id="taitungCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="taitungCheckbox">臺東縣</label><br></br>
                <optgroup label="離島"></optgroup>
                <input
                  type="checkbox"
                  name="penghu"
                  value="20"
                  id="penghuCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="penghuCheckbox">澎湖縣</label><br></br>
                <input
                  type="checkbox"
                  name="kinmen"
                  value="21"
                  id="kinmenCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="kinmenCheckbox">金門縣</label><br></br>
                <input
                  type="checkbox"
                  name="lienchang"
                  value="22"
                  id="lienchangCheckbox"
                  onChange={handlecountryChange}
                ></input>
                <label htmlFor="lienchangCheckbox">連江縣</label><br></br>
              </div>
            </div>
          </div>

          {/* 右邊 */}
          <div className="col-sm-10">
            <div style={{ textAlign: "end" }}>
              <button className={act === 1 ? "active" : ""} onClick={() => clicksort(1)}>
                作品數
                <GoTriangleDown />
              </button>
              <button className={act === 2 ? "active" : ""} onClick={() => clicksort(2)}>
                新服務
                <GoTriangleDown />
              </button>
              <button className={act === 3 ? "active" : ""} onClick={() => clicksort(3)}>
                上線時間
                <GoTriangleDown />
              </button>
            </div>
            <div className="row">
              {service.map((item, index) => (
                <div
                  className="col-xxl-4 col-md-6 mb-4"
                  key={index}
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  <div className="card">
                    <div className="card-header"
                      style={{ height: '255px', width: '100%' }}
                    >
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt="service"
                        // style={{ width: 300, height: 200, position: "block" }}
                        style={{ height: '100%', width: '100%', position: "block" }}
                      />
                    </div>
                    {/* <div className="sortBtn"> */}
                    <Link to={`/talent/${item.mid}`} className={`card-body text-decoration-none ${styles.link}`}>
                      <div>服務名稱：{item.s_name}</div>
                      <div>人才名稱：{item.name}</div>
                      <div>作品數：{item.ptotal}</div>
                    </Link>
                    {/* </div> */}
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <div>
                        {isLoggedIn === true && item.fid
                          ? <>
                            <FaHeart className={styles.faheart} onClick={() => { cancelServiceCollection(item.fid) }} />
                            {/* {item.fid && (textShow === index) && <span style={{color: 'red'}}>已收藏！</span>} */}
                          </>
                          : <FaRegHeart className={styles.faregheart} onClick={isLoggedIn ? () => { addServiceCollection(item.sid); setTextShow(index) } : handleShow} />}
                      </div>
                      <div onClick={isLoggedIn ? () => toggleChat(item.mid) : handleShow} className='text-center p-2'>
                        <Chatbutton /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* {showChat &&  <PublicMessagesPage receiverId={selectedItemMid} />} */}
          </div>
        </div>

        <NextPage
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
      <Footer></Footer>
    </>
  );
};

export default Findman;

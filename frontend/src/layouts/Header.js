import React, { useContext, useState } from 'react'
import { IsLoggedInContext } from '../App';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ourLogo from '../homepage/ourLogo.jpg';


export const Header = ({ selectedLink, setSelectedLink, email, clickOut }) => {
  const {isLoggedIn, handleShow, } = useContext(IsLoggedInContext);
  const projectFormLink = isLoggedIn ? "/ProjectForm" : window.location.href; // 發案按鈕登入判別

  const [inputvalue, setInputvalue] = useState("")
  const [togglename, setTogglename] = useState("找案件");

  const handleInputChange = (event) => {
    setInputvalue(event.target.value);
  }

  const search = () => {
    setInputvalue(inputvalue);
  }

  const handleChange = (event) => {
    setTogglename(event.target.value);
  };

  const handleLinkClick = (path) => {
    setSelectedLink(path);
  };

  return (
    <>
      <div
        className="p-1"
        style={{
          display: "flex", 
          alignItems: "center", 
          height: 80, 
          background: "linear-gradient(135deg,#EFBC9B 0%, #ffdab9 20%,#ffcab9 100%)",
          zIndex: 100
        }}
      >
        <Link to="/">
          <img style={{ width: 80, height: 80 }} src={ourLogo} alt="" />
        </Link>
        <span className="slogan-text" style={{ letterSpacing: "2px" }}>包您滿意</span>

        <div
          className="search-container d-flex align-items-center"
          style={{ marginLeft: "auto" }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* 搜索框 */}
            <input
              onChange={handleInputChange}
              value={inputvalue}
              type="text"
              placeholder="Search..."
              style={{ width: '280px', height: '70px', border: '1px solid #ccc', paddingLeft: '10px', borderRadius: "10px 0 0 10px" }}
            />
            {/* 找服務按鈕 */}
            {/* 下拉選單 */}
            <select
              value={togglename}
              onChange={handleChange}
              style={{ fontSize: "29px", width: '150px', height: '70px', border: '1px solid #ccc' }}
            >
              {/* 選項 */}
              <option value="找服務" style={{ fontSize: '18px' }}>找服務</option>
              <option value="找案件" style={{ fontSize: '18px' }}>找案件</option>
            </select>
            {/* 搜索按鈕 */}
            <Link to={togglename === "找案件" ? `./findcase/""/${inputvalue}` : `/findman/""/${inputvalue}`}>
              <button
                onClick={search}
                type="submit"
                style={{ height: '70px', width: '70px', borderRadius: '0 10px 10px 0', border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}
              >
                <i className="fa fa-search" style={{ color: "#46A3FF" }}></i>
              </button>
            </Link>
          </div>

          {isLoggedIn ? (
            <Button style={{ height: '70px', width: '140px', borderRadius: '10px', fontSize: '26px' }} onClick={clickOut}>登出</Button>
          ) : (
            <Button className="slogan-text" style={{ height: '70px', width: '140px', borderRadius: '10px', fontSize: '26px' }} onClick={handleShow}>登入/註冊</Button>
          )}
          {isLoggedIn && (
            <div className="nav-item">
              <Link
                to="/member"
                className={`nav-link ${selectedLink === "/member" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/member" ? "#D6DAC8" : "#ffcab9", color: "black" }}
                onClick={() => handleLinkClick("/member")}
              >
                <span style={{ fontSize: '28px' }}>您好，{email.email}</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <nav className="navbar navbar-expand-sm" style={{ background: "linear-gradient(135deg,#EFBC9B 0%, #ffdab9 20%,#ffcab9 100%)" }}>
        <div className="container-fluid" >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/findcase"
                className={`nav-link ${selectedLink === "/findcase" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/findcase" ? "#D6DAC8" : "#FFAD86", color: "black", borderRadius: "8px 0 0 8px" }}
                onClick={() => handleLinkClick("/findcase")}
              >
                <span className="slogan-text">我要接案</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/findman"
                className={`nav-link ${selectedLink === "/findman" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/findman" ? "#D6DAC8" : "#FFAD86", color: "black", borderRadius: "0 8px 8px 0" }}
                onClick={() => handleLinkClick("/findman")}
              >
                <span className="slogan-text">我要找人</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to={projectFormLink}
                className={`nav-link ${selectedLink === "/ProjectForm" ? "active" : ""}`}
                style={{ backgroundColor: selectedLink === "/ProjectForm" ? "#D6DAC8" : "#FFAD86", color: "black", width: "120px", textAlign: "center", borderRadius: "8px" }}
                onClick={isLoggedIn ? () => handleLinkClick("/ProjectForm") : handleShow}
              >
                <span className="slogan-text">發案</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav >
    </>
  )
};
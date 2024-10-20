import React from "react";
import { Row } from "react-bootstrap";
import ourLogo from "../Components/img/logo.jpg";

function Footer() {
  return (
    <div
      className="mt-5 p-4"
      style={{
        fontSize: 14,
        background: "linear-gradient(135deg, #EFBC9B, #ffdab9,#ffcab9)",
      }}
    >
      <Row>
        <span className="col-6" style={{ textAlign: "left" }}>
          <img style={{ width: 50 }} src={ourLogo} alt="" />
          <span style={{ color: "black" }}>包您滿意</span>
          <br />
          <br />
          <div style={{ letterSpacing: "3px", color: "black" }}>
            客服時間 | 9:00~18:00(例假日除外)
          </div>
          <br></br>
          <div style={{ letterSpacing: "3px", color: "black" }}>
            傳真號碼 | 02-1234-5678
          </div>
        </span>
        <span
          className="col-6"
          style={{ lineHeight: "1.5", letterSpacing: "3px", color: "black" }}
        >
          關於我們
          <br></br>
          <br></br>
          我們的目標是建立一個具有卓越使用者體驗的平台<br></br>
          ，讓專業人才可以輕鬆找到合適的項目，同時讓用戶<br></br>
          能夠快速且精確地找到最適合的專業人才。因此取名為<br></br>
          「包你滿意」，期許該平台不僅僅是一個服務交換場所<br></br>
          ，同時也會是一個促進創新和專業成長的社群。<br></br>
        </span>
      </Row>
    </div>
  );
}

export default Footer;

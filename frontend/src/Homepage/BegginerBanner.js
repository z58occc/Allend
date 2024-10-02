import React, { useState } from 'react'
import { FaHandshake, FaWpforms } from 'react-icons/fa';
import { MdOutlineMoneyOff } from 'react-icons/md';
import { BegginerModal } from './BegginerModal';


// 新手教學
export const BegginerBanner = () => {
  /* 控制新手教學彈跳視窗 */
  const [showNewbie, setShowNewbie] = useState(false);
  const handleShow = () => setShowNewbie(true);
  

  return (
    <>
      <h4 className="mt-5 fw-bolder">新手教學</h4>
      <section className="adbar-section mt-4">
        <div className="container-lg container-pad">
          <div className="row justify-content-center" style={{ backgroundColor: "#F0F0F0" }}>
            <div className="col-3" style={{ textAlign: 'center' }}>
              <h4 style={{ color: "#FF9797" }}>提出需求<FaHandshake style={{ fontSize: '50px' }} /></h4>
              <p>為你篩選適合人才</p>
            </div>
            <div className="col-3" style={{ textAlign: 'center' }}>
              <h4 style={{ color: "#FF9797" }}>刊登服務<FaWpforms style={{ fontSize: '50px' }} /></h4>
              <p>上架您的案件</p>
            </div>
            <div className="col-3" style={{ textAlign: 'center' }}>
              <h4 style={{ color: "#FF9797" }}>完全免費<MdOutlineMoneyOff style={{ fontSize: '50px' }} /></h4>
              <p>找人才輕鬆無壓力</p>
            </div>
            <div className="col-12 text-center">
              <span style={{ color: "#FF9797" }}>找案件，找人才，由我們搞定！</span>
              <button style={{ border: "none", backgroundColor: "#FF9797", borderRadius: ".5rem", letterSpacing: '2px' }} 
              onClick={handleShow}>瞭解更多</button>
            </div>
          </div>
        </div>
      </section>

      <BegginerModal showNewbie={showNewbie} setShowNewbie={setShowNewbie}/>
    </>
  )
};
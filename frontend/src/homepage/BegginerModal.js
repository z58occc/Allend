import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BsPersonVcard } from 'react-icons/bs';
import { FaBriefcase } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { RiDraftLine } from 'react-icons/ri';
import { TbBellRinging } from 'react-icons/tb';
import { TfiAnnouncement } from 'react-icons/tfi';


// 新手教學視窗
export const BegginerModal = ({ showNewbie, setShowNewbie }) => {
  const handleClose = () => setShowNewbie(false);
  const [showTalentContent, setShowTalentContent] = useState(false);
  const [showOrganContent, setShowOrganContent] = useState(true);

  const handleTalentClick = () => {
    setShowTalentContent(true);
    setShowOrganContent(false);
  };

  const handleOrganClick = () => {
    setShowTalentContent(false);
    setShowOrganContent(true);
  };


  return (
    <Modal show={showNewbie} onHide={handleClose} centered style={{ borderRadius: '20px' }}>
    <Modal.Header closeButton style={{ borderBottom: '1px solid black' }}>
      <div className="row justify-content-center w-100">
        <div className="col text-center">
          <Modal.Title>平台如何運作</Modal.Title>
          <div className="d-flex">
            <div className="border rounded-pill mx-auto p-1" style={{ borderColor: "black" }}>
              <Button className="rounded-pill btn type-modal-btn btn-medium" data-target="organ-modal-div" onClick={handleOrganClick}>發案者</Button>
              <Button className="rounded-pill btn type-modal-btn btn-medium" data-target="talent-modal-div" onClick={handleTalentClick}>接案者</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal.Header>
    <Modal.Body>
      {showOrganContent && (
        <div className="organ-modal-div ">
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2 pe-2">
                <TfiAnnouncement style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">發布工作 獲取報價</h5>
                <p className="fs-6">
                  依指示填寫需求表單，能免費發布工作，讓專業人才向你提供報價！
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2 ">
                <TbBellRinging style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">收到通知 主動報價</h5>
                <p className="fs-6">
                  工作經審核通過後，會發布於案件工作版，平台內相關專業人才收到信件通知，並根據你的工作描述提出相應報價。
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2">
                <IoIosPeople style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">挑選人才，輕鬆完成工作！</h5>
                <p className="fs-6">
                  會持續以信件通知最新工作進度，也能直接連絡提供報價的專業人才。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTalentContent && (
        <div className="talent-modal-div" >
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2 pe-2"><BsPersonVcard style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">建立個人案件</h5>
                <p className="fs-6">
                  提供建立個人專業服務與工作背景、詳細完整的個人專頁來提升接案的成功率！
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2">
                <FaBriefcase style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">快速送出你的提案</h5>
                <p className="fs-6">
                  每日更新工作案件提供最新接案機會！案主會根據你的提案報價與個人專頁決定是否採用。所有關於工作進度都會通過信件通知!
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 container-fluid container-xl">
            <div className="row">
              <div className="col-2">
                <RiDraftLine style={{ fontSize: "35px", color: "#FF9797" }} />
              </div>
              <div className="col-10">
                <h5 className="fs-4 text-primary">無上限申請提案！</h5>
                <p className="fs-6">
                  免費提案報價，輕鬆接案無負擔。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal.Body>
  </Modal>
  )
};
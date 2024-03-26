import React, { useState } from "react";
import Email from "./email";
import ClientForm from "./Perpetrator";

//切換表單按鈕
function FormSwitcher() {
  const [isFreelancerForm, setIsFreelancerForm] = useState(true);

  const handleSwitchForm = () => {
    setIsFreelancerForm((prevIsFreelancerForm) => !prevIsFreelancerForm);
  };

  return (
    <div style={{ position: "relative" }}>
      {isFreelancerForm ? <Email/> : <ClientForm/>}
      <button 
        onClick={handleSwitchForm}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          border: "none", // 移除線框
          backgroundColor: "lightblue", // 设置背景颜色为淺藍色
          padding: "5px 10px", // 添加一些内边距
          borderRadius: "5px", // 添加圆角
          cursor: "pointer" // 將光標设置为指针样式
        }}
      >
        切換表單: {isFreelancerForm ? "發案人表單" : "接案人表單"}
      </button>
    </div>
  );
}

export default FormSwitcher;

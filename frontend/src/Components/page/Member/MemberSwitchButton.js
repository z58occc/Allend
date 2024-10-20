import React, { useState } from 'react';
import Email from './FreelancerInfoForm';
import ClientForm from './PerpetratorInfoForm';

// 切換表單按鈕
function MemberSwitchButton() {
  const [isFreelancerForm, setIsFreelancerForm] = useState(true);

  const handleSwitchForm = () => {
    setIsFreelancerForm((prevIsFreelancerForm) => !prevIsFreelancerForm);
  };

  return (
    <div style={{ position: 'relative' }}>
      {isFreelancerForm ? <Email /> : <ClientForm />}
      <button
        onClick={handleSwitchForm}
        style={{
          position: 'absolute',
          bottom: '220px',
          right: '10px',
          border: 'none',
          backgroundColor: 'lightblue',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        切換表單: {isFreelancerForm ? '發案人表單' : '接案人表單'}
      </button>
    </div>
  );
}

export default MemberSwitchButton;

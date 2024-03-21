import React, { useState } from 'react';
import './RegisterForm.css'; // Import your CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//註冊
export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在這裡處理表單提交
    console.log({
      name,
      email,
      password
    });
    // 清空表單
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>註冊</h2>
      <div className="form-group">
        <label>名字：</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" />
      </div>
      <div className="form-group">
        <label>密碼：</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">註冊</button>
    </form>
  );
};

export default RegisterForm;

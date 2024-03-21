import React from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

//登入
export function Login() {
  return (
    <div className='wrapper'>
      <form action=''>
        <h1>包你滿意</h1>
        <div className="input-box">
          <input type='email' placeholder='Email' required/>
          <FaUser className='icon'/>
        </div>
        
        <div className="input-box">
          <input type='password' placeholder='Password'  pattern="[A-Za-z0-9]{1,20}" title="Password must be 1-20 alphanumeric characters" required/>
          <FaLock className='icon'/>
        </div>
        <div className="remember-forgot">
          <a href="#">忘記密碼</a>
        </div>
    
        <div>
         
          <button type="submit">登入</button>
        </div>
        
        <div className='register-link'>
          <a href="#">立即註冊</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

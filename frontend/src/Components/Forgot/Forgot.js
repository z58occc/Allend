import React, { useState } from 'react';
import './Forgot.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//忘記密碼

export function Forgot() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            email,
        });
        setEmail('');
    };


    return (
        <form onSubmit={handleSubmit} className="Forgot">
            <h2>忘記密碼</h2>
            <div className="Forgot-form">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="Forgot-form-control" />
            </div>
        <button type="submit" className='btn btn-danger'>送出</button>
        </form>
    );

};

export default Forgot;
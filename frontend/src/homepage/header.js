import React from 'react'
import ourLogo from './ourLogo.jpg'
import './App.css';


function Header() {
    return (
        <div className="p-1 bg-primary"  >
            <img style={{ width: 100 }} src={ourLogo} />
            <span>包您滿意</span>
            <div className="search-container" >
                <input type="text" placeholder="Search.." />
                <button type="submit">
                    <i className="fa fa-search" />
                </button>
                <button>登入/註冊</button>
            </div>
        </div>
    )
}

export default Header
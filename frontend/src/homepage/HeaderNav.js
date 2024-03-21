import React, { useState } from 'react'
import ourLogo from './ourLogo.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function Header() {
    const [color, setColor] = useState('red');
    const [color2, setColor2] = useState('red');

    const handleClick = () => {
        setColor(color === 'red' ? 'blue' : 'red');
    };
    const handleClick2 = () => {
        setColor2(color2 === 'red' ? 'blue' : 'red');
    };
    return (
        <div >
            <div className="p-1 bg-primary" style={{ height: 50 }}  >
                <img style={{ width: 50 }} src={ourLogo} />
                <span>包您滿意</span>
                <div className="search-container" >
                    <input type="text" placeholder="Search.." />
                    <button type="submit">
                        <i className="fa fa-search" />
                    </button>
                    <button>登入/註冊</button>
                </div>
            </div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" >
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item" >
                            <button style={{ backgroundColor: color }} onClick={handleClick} className="nav-link active" href="#">
                                我要接案
                            </button>
                        </li>
                        <li className="nav-item" >
                            <button style={{ backgroundColor: color2 }} onClick={handleClick2} className="nav-link" href="#">
                                我要找人
                            </button>
                        </li>
                    </ul>
                    <div style={{ float: 'right' }}>
                        <button >email</button>
                        <button >發案</button>
                    </div>
                </div>

            </nav>
        </div>


    )
}

export default Header
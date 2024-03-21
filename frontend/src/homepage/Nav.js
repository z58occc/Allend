import React, { useState } from 'react'

function Nav() {
    const [color, setColor] = useState('red');
    const [color2, setColor2] = useState('red');

    const handleClick = () => {
        setColor(color === 'red' ? 'blue' : 'red');
    };
    const handleClick2 = () => {
        setColor2(color2 === 'red' ? 'blue' : 'red');
    };
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item" style={{ backgroundColor: color }} onClick={handleClick}>
                        <a className="nav-link active" href="#">
                            我要接案
                        </a>
                    </li>
                    <li className="nav-item" style={{ backgroundColor: color2 }} onClick={handleClick2}>
                        <a className="nav-link" href="#">
                            我要找人
                        </a>
                    </li>
                </ul>
                <div style={{ float: 'right' }}>
                    <button >email</button>
                    <button >發案</button>
                </div>
            </div>

        </nav>)
}

export default Nav
import React from 'react'
import ourLogo from './ourLogo.jpg'

function Footer() {
    return (
        <div className="mt-5 p-4 bg-dark text-white row" style={{height:75  , fontSize:10}} >
            <span className='col-6' style={{ textAlign: 'left' }}>
                <img style={{ width: 30 }} src={ourLogo} />
                <text >
                     包您滿意
                    <br></br>
                    email:
                </text>
            </span>
            <span className='col-6' >
                關於我們
            </span>
        </div>)
}

export default Footer
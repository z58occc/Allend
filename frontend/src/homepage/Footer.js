import React from 'react'
import ourLogo from '../homepage/ourLogo.jpg';

function Footer() {
    return (
        <div className="mt-5 p-4 bg-dark text-white row" style={{ height: 115, fontSize: 10 }} >
            <span className='col-6' style={{ textAlign: 'left' }}>
                <img style={{ width: 30 }} src={ourLogo} alt='' />
                <text >
                    包您滿意
                    <br></br>
                    email:
                </text>
            </span>
            <span className='col-6' >
                關於我們
                <br></br>
                 <br></br>
                我們的目標是建立一個具有卓越使用者體驗的平台，<br></br>
                讓專業人才可以輕鬆找到合適的項目，同時讓用戶能夠快速且精確地找到最適合的專業人才。<br></br>
                因此取名為「包你滿意」，期許該平台不僅僅是一個服務交換場所，<br></br>
                同時也會是一個促進創新和專業成長的社群。<br></br>
            </span>


        </div>

    )
}

export default Footer
import React from 'react'
import GridComponent from './GridComponent';
import Rating from './Rating';
import LeftVerticalNavbar from './LeftVerticalNavbar';
//會員中心
function RatingPage() {
  const lines = [
    { title: '接案數', number: 5, path: '#home' },
    { title: '結案數', number: 5, path: '#home' },
    { title: '進行中', number: 5, path: '#home' },
  ];

  const line2 = [
    { title: '接案方評價', rating: 5, message: 100 },
    { title: '發案方評價', rating: 4, message: 100 },
  ];

  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2" style={{padding:"20px"}}>
            <LeftVerticalNavbar />
          </div>
          <div className="col-lg-10">
            <div class="row">
              <div class="col-lg-12">
                <GridComponent lines={lines} fontSize="20px" />
              </div>
             
              <div className="col-lg-12">
                <div style={{ width: '100%' }}>
                  <Rating lines={line2} fontSize="20px" />
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RatingPage
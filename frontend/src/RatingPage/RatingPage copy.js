import React from 'react'
import GridComponent from './GridComponent';
import Rating from './Rating';
import LeftVerticalNavbar from './LeftVerticalNavbar';

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
   
   <div className="container">
        <div className="row">
          <div className="col-2">
    <LeftVerticalNavbar/>
    </div>
    <div className="col-10">
            <GridComponent lines={lines} width="400px" fontSize="20px" />
          </div>
          <br></br>
          <div className="col-10">
            <Rating lines={line2} width="1060px" fontSize="20px" />
          </div>
        </div>
      </div>
      </>  
  )
}

export default RatingPage
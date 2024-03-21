import React from 'react'
import GridComponent from './GridComponent';
import Rating from './Rating';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: 'calc(100% - 250px)', marginLeft: '20px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <GridComponent lines={lines} width="400px" fontSize="20px" />

        </div>
        <Rating lines={line2} width="1060px" fontSize="20px" />
      </div>
  )
}

export default RatingPage
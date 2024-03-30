import React from 'react'

function NextPage({ currentPage, totalPages, prevPage, nextPage }) {

  return (
    <div style={{textAlign:'center',marginTop:'10px'}}>
      <button onClick={prevPage} disabled={currentPage === 1}>上一頁</button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>下一頁</button>
    </div>
  )
}

export default NextPage
import React from 'react';
import StarRating from './StarRating';
const Rating = ({ lines, width, fontSize }) => {
  const number = [
    {title: "接案方評價"}, 
    {title: "發案方評價"}
  ]

  const cardStyle = {
    borderRadius: '50px',
    border: '1px solid #ccc',
    padding: '20px',
    width: width || '100%', // 如果未提供width prop，則預設為100%
  
  };

  const textStyle = {
    fontSize: fontSize || '16px', // 如果未提供fontSize prop，則預設為16px
    display: 'flex', // 使用flexbox布局
    justifyContent: 'space-between', // 將內容置於左右兩側
    textAlign: 'center', // 文字置中
  };

  return (
    <>
    
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <div className="card" style={cardStyle}><h2 style={{ textAlign: 'center' }}>評價等級</h2>
            <div className="card-body" style={textStyle}>
              {lines.map((line, index) => (
                <div key={index}>
                  <div>
                    <h5 className="card-title">{number.title}</h5>
                  </div>
                  <div>
                    <div className="card-number">({line[index+1]})</div>
                    <StarRating rating={line[index]} width="300px" fontSize="24px" />
                    <div>({line.message}則評價)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Rating;






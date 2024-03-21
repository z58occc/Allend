import React from 'react';

const StarRating = ({ rating, width, fontSize }) => {
  const starStyle = {
    display: 'inline-block',
    color: '#FFD700', // 星星顏色為金色
    width: width || '100px', // 預設寬度為100px
    fontSize: fontSize || '24px', // 預設字型大小為24px
  };

  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <span key={index}>&#9733;</span> // 填滿的星星
  ));

  const emptyStars = Array.from({ length: 5 - Math.floor(rating) }, (_, index) => (
    <span key={index}>&#9734;</span> // 空星星
  ));

  return (
    <div style={starStyle}>
      {filledStars}
      {emptyStars}
    </div>
  );
};

export default StarRating;

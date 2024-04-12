import React, { useState } from 'react';
import './StarRating1.css'; 


const Star1 = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue) => {
    setRating(starValue);
    setHoverRating(0); 
    onRatingChange(starValue); // 將評分傳遞給外層元件
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={(i <= (hoverRating || rating)) ? 'star filled' : 'star'}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarHover(0)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      <strong>輸入評價：</strong>{renderStars()}
    </div>
  );
};

export default Star1;




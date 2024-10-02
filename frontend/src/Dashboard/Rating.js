import React from "react";
import StarRating from "./StarRating";


const Rating = ({ ratingData, width, fontSize }) => {
  const number = [{ title: "接案方評價" }, { title: "發案方評價" }];

  const cardStyle = {
    borderRadius: "50px",
    border: "1px solid #ccc",
    padding: "20px",
    // 如果未提供width prop，則預設為100%
  };

  const textStyle = {
    fontSize: fontSize || "16px", // 如果未提供fontSize prop，則預設為16px
    display: "flex", // 使用flexbox布局
    justifyContent: "space-between", // 將內容置於左右兩側
    textAlign: "center", // 文字置中
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card" style={cardStyle}>
            <h2 style={{ textAlign: "center" }}>評價等級</h2>
            <div className="card-body" style={textStyle}>
              <div>
                <div>
                  <h5 className="card-title">{number[0].title}</h5>
                </div>
                <div>
                  <div className="card-number">
                    {ratingData[6]?.service_rating}
                  </div>
                  <StarRating
                    rating={ratingData[6]?.service_rating}
                    width="300px"
                    fontSize="24px"
                  />
                  <div>({ratingData[7]?.service_cmt}則評價)</div>
                </div>
              </div>

              <div>
                <div>
                  <h5 className="card-title">{number[1].title}</h5>
                </div>
                <div>
                  <div className="card-number">
                    {ratingData[8]?.demmand_rating}
                  </div>
                  <StarRating
                    rating={ratingData[8]?.demmand_rating}
                    width="300px"
                    fontSize="24px"
                  />
                  <div>({ratingData[9]?.demmand_cmt}則評價)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;

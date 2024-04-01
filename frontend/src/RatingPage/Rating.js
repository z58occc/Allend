import React from "react";
import StarRating from "./StarRating";
const Rating = ({ ratingData, width, fontSize }) => {
  const number = [{ title: "接案方評價" }, { title: "發案方評價" }];
  // const serviceComment = ratingData.slice(6, 8);
  // const demmandComment = ratingData.slice(8);
  // console.log(ratingData[8]);
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
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="card" style={cardStyle}>
              <h2 style={{ textAlign: "center" }}>評價等級</h2>
              <div className="card-body" style={textStyle}>
                {/* <div>
                  <div>
                    <h5 className="card-title">{number[0].title}</h5>
                  </div>
                  <div>
                    <div className="card-number">
                      (
                      {Object.values(ratingData[6]) !== null
                        ? Object.values(ratingData[6])
                        : ""}
                      )
                    </div>
                    <StarRating
                      rating={
                        Object.values(ratingData[6]) !== null
                          ? Object.values(ratingData[6])
                          : ""
                      }
                      width="300px"
                      fontSize="24px"
                    />
                    <div>
                      (
                      {Object.values(ratingData[7]) !== null
                        ? Object.values(ratingData[7])
                        : ""}
                      則評價)
                    </div>
                  </div>
                </div> */}

                {/* <div>
                  <div>
                    <h5 className="card-title">{number[1].title}</h5>
                  </div>
                  <div>
                    <div className="card-number">
                      ({String(Object.values(ratingData[8]))})
                    </div>
                    <StarRating
                      rating={Object.values(ratingData[8])}
                      width="300px"
                      fontSize="24px"
                    />
                    <div>({Object.values(ratingData[9])}則評價)</div>
                  </div>
                </div> */}

                {/* {demmandComment.map((item, index) => (
                  <div key={index}>
                    <div>
                      <h5 className="card-title">{number[1].title}</h5>
                    </div>
                    <div>
                      <div className="card-number">({Object.values(item)})</div>
                      <StarRating
                        rating={Object.values(item)}
                        width="300px"
                        fontSize="24px"
                      />
                      <div>({Object.values(item)}則評價)</div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rating;

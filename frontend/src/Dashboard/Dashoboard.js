import React from "react";

const Dashoboard = ({ data, width, fontSize }) => {
  const goto = [
    { titles: "接案數", path: "/service" },
    { titles: "進行中", path: "/service" },
    { titles: "結案數", path: "/service" },
    { titles: "刊登數", path: "/commit" },
    { titles: "進行中", path: "/commit" },
    { titles: "結案數", path: "/commit" },
  ];
  let takeData = data.slice(0, 3);
  let publishData = data.slice(3, 6);

  const cardStyle = {
    borderRadius: "50px",
    border: "1px solid #ccc",
    padding: "20px",
    width: width || "100%", // 如果未提供width prop，則預設為100%
  };

  const textStyle = {
    fontSize: fontSize || "16px", // 如果未提供fontSize prop，則預設為16px
    textAlign: "center", // 文字置中
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-between">
        <div className="col-5">
          <h2>接案總覽</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body" style={textStyle}>
              <h3>接案</h3>
              {takeData.map((item, index) => (
                <div key={index}>
                  <h5 className="card-title">
                    {goto[index].titles}
                    <a
                      href={goto[index].path}
                      className="card-number"
                      style={{ textDecoration: "none" }}
                    >
                      ({Object.values(item)})
                    </a>
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-5">
          <h2>發案總覽</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body" style={textStyle}>
              <h3>發案</h3>
              {publishData.map((item, index) => (
                <div key={index}>
                  <h5 className="card-title">
                    {goto[index + 3].titles}
                    <a
                      href={goto[index + 3].path}
                      className="card-number"
                      style={{ textDecoration: "none" }}
                    >
                      ({Object.values(item)})
                    </a>
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashoboard;

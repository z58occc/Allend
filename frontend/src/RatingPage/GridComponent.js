import React from 'react';

const GridComponent = ({ lines, width, fontSize }) => {
  const cardStyle = {
    borderRadius: '50px',
    border: '1px solid #ccc',
    padding: '20px',
    width: width || '100%', // 如果未提供width prop，則預設為100%
  };

  const textStyle = {
    fontSize: fontSize || '16px', // 如果未提供fontSize prop，則預設為16px
    textAlign: 'center', // 文字置中
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-between">
        <div className="col-5">
          <h2>接案總覽</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body" style={textStyle}>
              {lines.map((line, index) => (
                <div key={index}>
                  <h5 className="card-title">{line.title}<a href={line.path} className="card-number" style={{ textDecoration: 'none' }}>({line.number})</a></h5>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-5">
        <h2>發案總覽</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body" style={textStyle}>
              {lines.map((line, index) => (
                <div key={index}>
                  <h5 className="card-title">{line.title}<a href={line.path} className="card-number" style={{ textDecoration: 'none' }}>({line.number})</a></h5>
                </div>
              ))}
            </div>
          </div>
        </div>



        
      </div>
    </div>
  );
};

export default GridComponent;





import React from 'react';

const GridComponent = ({ data, width, fontSize }) => {
  const goto = [
    {titles: '接案數', path: '/'},
    {titles: '結案數', path: '/'},
    {titles: '進行中', path: '/'},
    {titles: '刊登數', path: '/'},
    {titles: '結案數', path: '/'},
    {titles: '進行中', path: '/'},
  ]
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
let data1 = data.slice(0,3);
let data2 = data.slice(3,6)
  return (
    <div className="container mt-4">
      <div className="row justify-content-between">
        <div className="col-5">
          <h2>接案總覽</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body" style={textStyle}>
              <h3>接案</h3>
              {data1.map((item, index) => (
                <div key={index}>
                  <h5 className="card-title">{goto[index].titles}<a href={goto[index].path} className="card-number" style={{ textDecoration: 'none' }}>
                    ({item})</a></h5>
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
              {/* {lines.map((line, index) => (
                <div key={index}>
                  <h5 className="card-title">{line.title}<a href={line.path} className="card-number" style={{ textDecoration: 'none' }}>({line.number})</a></h5>
                </div>
              ))} */}
              {data2.map((item, index) => (
                <div key={index}>
                  <h5 className="card-title">{goto[index+3].titles}<a href={goto[index+3].path} className="card-number" style={{ textDecoration: 'none' }}>
                    ({item})</a></h5>
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





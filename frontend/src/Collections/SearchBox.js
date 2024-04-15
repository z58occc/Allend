import React, {  useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 阻止預設提交行為
      handleSubmit(event); // 調用 handleSubmit 函式
    }
  };
  return (
    <MDBCol md="4" className="d-flex">
      <form className="form-inline" >
        <div className="d-flex justify-content-center align-items-center">
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ms-2 w-100" 
          type="text" 
          placeholder="Search" 
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          />
        </div>
      </form>
      <button onClick={handleSubmit}>搜尋</button>
    </MDBCol>
  );
}

export default SearchBox;
import React, {  useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { FaTrashAlt } from "react-icons/fa";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value);
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleReset = (event) =>{
    event.preventDefault();
    onSearch("");
    setSearchTerm("");
  }
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // 阻止預設提交行為
  //     handleSubmit(event); // 調用 handleSubmit 函式
  //   }
  // };
  return (
    <>
    <MDBCol md="4" className="d-flex">
      <form className="form-inline d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ms-2 w-75" 
          type="text" 
          placeholder="Search" 
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          />
          <button onClick={handleReset} className="rounded-end">
            <FaTrashAlt/>
          </button>
      </form>
    </MDBCol>
    </>
  );
}

export default SearchBox;
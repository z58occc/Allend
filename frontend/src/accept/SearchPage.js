import React, {  useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { FaTrashAlt } from "react-icons/fa";
import "./searchpage.css"


const SearchPage = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the input value to the parent component
  };
  const handleReset = (event) => {
    event.preventDefault();
    onSearch("");
    setSearchTerm("");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <MDBCol md="5" className="d-flex" >
      <form style={{marginTop:"10px"}} className="form-inline d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ms-2 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
        />

        <button onClick={handleReset} className="rounded-end">
          <FaTrashAlt />
        </button>
      </form>

    </MDBCol>
  );
}

export default SearchPage;
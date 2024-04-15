import React, {  useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const SearchPage = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the input value to the parent component
  };
  const handleReset = (event) =>{
    event.preventDefault();
    onSearch("");
    setSearchTerm("");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <MDBCol md="4" className="d-flex">
      <form className="form-inline mt-3 mb-3" onSubmit={handleSubmit}>
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" 
        type="text" 
        placeholder="Search" 
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
        />
      </form>
    </MDBCol>
  );
}

export default SearchPage;
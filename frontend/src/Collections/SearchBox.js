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
  return (
    <MDBCol md="4" className="d-flex">
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-items-center">
          <MDBIcon icon="search" />
          <input className="form-control form-control-sm ms-2 w-100" 
          type="text" 
          placeholder="Search" 
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          />
        </div>
      </form>
    </MDBCol>
  );
}

export default SearchBox;
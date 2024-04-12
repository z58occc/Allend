import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBCol, MDBIcon } from "mdbreact";


const SearchPage = () => {
  return (
    <MDBCol md="3">
      <form className="form-inline mt-3 mb-3">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
      </form>
    </MDBCol>
  );
}

export default SearchPage;
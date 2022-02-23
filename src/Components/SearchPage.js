
import React from "react";
import { MDBInput, MDBCol } from "mdbreact";

const SearchPage = ({ setSearchTerm }) => {
    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }
    return (
        <MDBCol md="6">
            <MDBInput onChange={(e) => { handleSearchInput(e) }} hint="Search" type="text" containerClass="mt-0" />
        </MDBCol>
    );
}

export default SearchPage;
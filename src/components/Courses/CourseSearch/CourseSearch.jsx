import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CourseSearch = ({ search }) => {
  const [keyword, SetKeyword] = useState();

  const handleSearch = (value) => {
    SetKeyword(value);
    search(value);
  };
  return (

    <>
      <div className="mt-3 p-0 col-md-6">
        <div id="searchbar" className="d-flex justify-content-between flew-row align-items-center form-div">
          <FontAwesomeIcon icon="search" className="mx-2" />
          <input
            className="form-control"
            type="text"
            placeholder="Rechercher une formation"
            value={keyword}
            onChange={(e) => handleSearch(e.currentTarget.value)}
          />
          <br /><br />
        </div>
      </div>
    </>
  );
};

export default CourseSearch;

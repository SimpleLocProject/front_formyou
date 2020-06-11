import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseSearch = ({ search, catlist, handleSelect }) => {
  const [keyword, SetKeyword] = useState();

  const handleSearch = (value) => {
    SetKeyword(value);
    search(value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mt-4">
          <select
            onChange={(e) => handleSelect(e.target.value)}
            className="form-control form-control-lg"
          >
            <option value="all">Toutes les catégorie</option>
            {catlist.map((cat) => (
              <option value={cat.name} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <div
            id="searchbar"
            className="d-flex justify-content-between flew-row align-items-center form-div"
          >
            <FontAwesomeIcon icon="search" className="mx-2" />
            <input
              className="form-control"
              type="text"
              placeholder="Rechercher une formation"
              value={keyword}
              onChange={(e) => handleSearch(e.currentTarget.value)}
            />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSearch;

import React, { useState } from "react";

const CourseSearch = ({ search }) => {
  const [keyword, SetKeyword] = useState();

  const handleSearch = (value) => {
    SetKeyword(value);
    search(value);
  };
  return (
    <>
      <div className="mt-3 p-0 col-md-6">
        <input
          className="form-control"
          type="text"
          placeholder="Rechercher une formation"
          value={keyword}
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
      </div>
    </>
  );
};

export default CourseSearch;

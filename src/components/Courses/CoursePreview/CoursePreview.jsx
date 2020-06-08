import React from "react";

const CoursePreview = ({ course }) => {
  return (
    <>
      <div className="card col-md-3">
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};
export default CoursePreview;

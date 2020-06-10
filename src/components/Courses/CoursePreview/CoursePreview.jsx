import React from "react";
import { Link } from "react-router-dom";

const CoursePreview = ({ course }) => {
  return (
    <>
      <div className="card col-md-3 m-3">
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          {course.categories.map((cat) => (
            <p>
              <span class="badge badge-info">{cat.name}</span>
            </p>
          ))}
          <Link className="btn btn-primary" to={"/course/" + course.id}>
            Detail
          </Link>
        </div>
      </div>
    </>
  );
};
export default CoursePreview;

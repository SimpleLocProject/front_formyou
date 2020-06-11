import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const CoursePreview = ({ course }) => {
  const ShortID = require("shortid");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <div className="card col-md-3 m-3">
        <div className="card-body">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          {course.categories.map((cat) => (
            <p key={ShortID.generate()}>
              <span className="badge badge-info">{cat.name}</span>
            </p>
          ))}
          {isAuthenticated ? (
            <Link
              className="btn btn-primary"
              to={"/student/course/" + course.id}
            >
              Detail
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/login/">
              Detail
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default CoursePreview;

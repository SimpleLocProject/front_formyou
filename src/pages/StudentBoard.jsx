import React from "react";
import { useSelector } from "react-redux";
import CourseIndex from "./../components/Courses/CourseIndex";
import Calendar from "./../components/Calendar/Calendar";
const StudentBoard = () => {
  const user = useSelector((state) => state.auth.user);
  const { id, email } = user;

  return (
    <div className="container mt-5">
      <h1>Welcome on student board.</h1>
      <p>id : {id}</p>
      <p>mail : {email}</p>
      <CourseIndex />
    </div>
  );
};

export default StudentBoard;

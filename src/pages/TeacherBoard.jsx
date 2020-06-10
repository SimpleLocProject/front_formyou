import React from "react";
import { useSelector } from "react-redux";

const TeacherBoard = () => {
  const user = useSelector(state => state.auth.user);
  const { id, email } = user

  return (
    <div className="container mt-5">
      <h1>Welcome on teacher board.</h1>
      <p>id : {id}</p>
      <p>mail : {email}</p>
    </div>
  )
};

export default TeacherBoard;

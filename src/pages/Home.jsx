import React from "react";
import { useSelector } from "react-redux";
import CourseIndex from "./../components/Courses/CourseIndex";
const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <CourseIndex />
    </>
  );
};

export default Home;

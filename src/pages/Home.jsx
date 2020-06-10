import React from "react";
import CourseIndex from "./../components/Courses/CourseIndex";
import Jumbotron from "./../components/Jumbotron";

const Home = () => {

  return (
    <>
      <Jumbotron />
      <div className="container mt-5">
        <CourseIndex />
      </div>
    </>
  );
};

export default Home;

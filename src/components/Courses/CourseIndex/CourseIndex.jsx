import React, { useState, useEffect } from "react";
import CoursePreview from "./../CoursePreview";
import { fakeCourses } from "./../../../fakecontent/courses";
const CourseIndex = () => {
  const [courselist, SetCourseList] = useState();
  const ShortID = require("shortid");

  useEffect(() => {
    // const fetchCourses = async () => {
    // const API_URL = process.env.REACT_APP_API_URL;
    // const response = await fetch(`${API_URL}/courses`, {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // try {
    //   const courses = await response.json();
    //   SetCourseList(courses);
    // } catch (error) {
    //   console.log(error);
    //   alert("nous ne pouvons pas afficher les cours");
    // }
    //}
    SetCourseList(fakeCourses.courses);
  }, []);

  return (
    <>
      <div className="row">
        {courselist &&
          courselist.map((course) => (
            <CoursePreview key={ShortID.generate()} course={course} />
          ))}
      </div>
    </>
  );
};

export default CourseIndex;

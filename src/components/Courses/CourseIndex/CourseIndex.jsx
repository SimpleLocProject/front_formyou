import React, { useState, useEffect } from "react";
import CoursePreview from "./../CoursePreview";
import { fakeCourses } from "./../../../fakecontent/courses";
import CourseSearch from "./../CourseSearch";
const CourseIndex = () => {
  const [courselist, SetCourseList] = useState();
  const [filteredcourselist, SetFilteredCourseList] = useState();
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

  const search = (value) => {
    const filter = courselist.filter(
      (course) =>
        course.title.includes(value) || course.description.includes(value)
    );
    SetFilteredCourseList(filter);
  };

  let courses;
  filteredcourselist === undefined
    ? (courses = courselist)
    : (courses = filteredcourselist);

  return (
    <>
      <h2>Toutes les formations</h2>
      <CourseSearch search={search} />
      <div className="row mt-3 mb-3">
        {courses &&
          courses.map((course) => (
            <CoursePreview key={ShortID.generate()} course={course} />
          ))}
      </div>
      <h2>Mes formations</h2>
      <div className="row mt-3 mb-3">
        {courselist &&
          courselist.map((course) => (
            <CoursePreview key={ShortID.generate()} course={course} />
          ))}
      </div>
    </>
  );
};

export default CourseIndex;

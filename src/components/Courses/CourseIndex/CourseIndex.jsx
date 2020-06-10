import React, { useState, useEffect } from "react";
import CoursePreview from "./../CoursePreview";
import { fakeCourses } from "./../../../fakecontent/courses";
import CourseSearch from "./../CourseSearch";
import { fetchCourses } from "./../../../service/courseApi";

const CourseIndex = () => {
  const [courselist, SetCourseList] = useState();
  const [filteredcourselist, SetFilteredCourseList] = useState();
  const ShortID = require("shortid");

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCourses();
      SetCourseList(courses);
    };
    getCourses();
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
        {courselist &&
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

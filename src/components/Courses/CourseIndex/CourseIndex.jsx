import React, { useState, useEffect } from "react";
import CoursePreview from "./../CoursePreview";
import { fakeCourses } from "./../../../fakecontent/courses";
import CourseSearch from "./../CourseSearch";
import { fetchCourses } from "./../../../service/courseApi";

const CourseIndex = () => {
  const [courselist, SetCourseList] = useState();
  const [filteredcourselist, SetFilteredCourseList] = useState();
  const [catlist, SetCatList] = useState();

  const ShortID = require("shortid");

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCourses();
      SetCourseList(courses);

      let courseCategories = [];
      courses.forEach((course) => {
        course.categories.forEach((cat) => {
          courseCategories.some((element) => element.id === cat.id)
            ? console.log("cat is already listed")
            : courseCategories.push(cat);
        });
      });
      SetCatList(courseCategories);
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

  const handleSelect = (value) => {
    const select = courselist.filter((course) =>
      course.categories.some((cat) => cat.name === value)
    );
    SetFilteredCourseList(select);
  };

  let courses;
  filteredcourselist === undefined
    ? (courses = courselist)
    : (courses = filteredcourselist);

  return (
    <>
      <h2>Toutes les formations</h2>
      {catlist && (
        <CourseSearch
          handleSelect={handleSelect}
          catlist={catlist}
          search={search}
        />
      )}
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

import React, { useState, useEffect } from "react";
import CoursePreview from "./../CoursePreview";
import CourseSearch from "./../CourseSearch";
import { fetchCourses } from "./../../../service/courseApi";
import { useDispatch } from "react-redux";
import { displayError } from "../../../redux/middlewares/flashMiddleware";

const CourseIndex = () => {
  const [courselist, setCourseList] = useState();
  const [filteredcourselist, setFilteredCourseList] = useState();
  const [catlist, setCatList] = useState();

  const dispatch = useDispatch();

  const ShortID = require("shortid");

  useEffect(() => {
    const getCourses = async () => {
      const courses = await fetchCourses();
      if (!courses) {
        dispatch(displayError("Aucun cours de disponible"));
        return false;
      }
      setCourseList(courses);

      let courseCategories = [];

      courses.forEach((course) => {
        course.categories.forEach((cat) => {
          if (!courseCategories.some((element) => element.id === cat.id)) {
            courseCategories.push(cat);
          }
        });
      });

      setCatList(courseCategories);
    };
    getCourses();
  }, [dispatch]);

  const search = (value) => {
    const filter = courselist.filter(
      (course) =>
        course.title.includes(value) || course.description.includes(value)
    );
    setFilteredCourseList(filter);
  };

  const handleSelect = (value) => {
    const select = courselist.filter((course) =>
      course.categories.some((cat) => cat.name === value)
    );
    setFilteredCourseList(select);
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

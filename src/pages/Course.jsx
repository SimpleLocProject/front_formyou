import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourse } from "./../";
const Course = () => {
  const { course_id } = useParams();

  useEffect(() => {
    const course = fetchCourse(course_id);
  }, []);

  return <>Cours numéro : {course_id}</>;
};

export default Course;

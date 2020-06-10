import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCourse } from "./../service/courseApi";
const Course = () => {
  const { course_id } = useParams();
  const { token } = useSelector((state) => state.auth.token);
  const { sessions, setSessions } = useState();

  useEffect(() => {
    const course = fetchCourse(token, course_id);
  }, []);

  return <>Cours numéro : {course_id}</>;
};

export default Course;

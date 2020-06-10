import React from "react";
import { useParams } from "react-router-dom";

const Course = () => {
  const { course_id } = useParams();

  // const token = Cookies.get("token");
  // useEffect(() => {
  //   const course = fetchCourse(token, course_id);
  // }, []);

  return <>Cours numéro : {course_id}</>;
};

export default Course;

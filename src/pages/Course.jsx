import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCourse } from "./../service/courseApi";
import { useDispatch } from "react-redux";
import { displayError } from "./../redux/middlewares/flashMiddleware";

const Course = () => {
  const { course_id } = useParams();
  const { token } = useSelector((state) => state.auth.token);
  const { sessions, setSessions } = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSessions = async () => {
      const sessions = await fetchCourse(token, course_id);
      if (!sessions) {
        dispatch(displayError("Aucun cours de disponible"));
        return false;
      }
      setSessions(sessions);
    };
  }, []);

  return <>Cours numéro : {course_id}</>;
};

export default Course;

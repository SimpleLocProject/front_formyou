import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "../components/Calendar/Calendar";
import CoursePreview from "../components/Courses/CoursePreview";
import CourseSearch from "../components/Courses/CourseSearch";
import { fetchCourses } from "../service/courseApi";
import { displayError } from "../redux/middlewares/flashMiddleware";
import Jumbotron from "./../components/Layout/Jumbotron";
import { fetchSessions } from "../service/sessionsApi";

const Home = () => {
  const [courselist, setCourseList] = useState();
  const [filteredcourselist, setFilteredCourseList] = useState([]);
  const [catlist, setCatList] = useState();
  const [sessionlist, setSessionList] = useState([]);
  const [filteredsessionlist, setFilteredSessionList] = useState([]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    const getSessions = async () => {
      const loadSessions = await fetchSessions();
      if (!loadSessions) {
        return false
      }
      setSessionList(loadSessions);
    };
    getSessions();
  }, [dispatch])

  const search = (value) => {
    const filter = courselist.filter(
      (course) =>
        course.title.includes(value) || course.description.includes(value)
    );
    setFilteredCourseList(filter);
    setFilteredSessionList([]);
    let sessionselect = [];
    filter.forEach((course) => {
      course.sessions.forEach((session) => {
        sessionselect.push(session);
      });
    });
    setFilteredSessionList(sessionselect);
  };

  const handleSelect = (value) => {
    const select = courselist.filter((course) =>
      course.categories.some((cat) => cat.name === value)
    );
    setFilteredCourseList(select);

    setFilteredSessionList([]);
    let sessionselect = [];
    select.forEach((course) => {
      course.sessions.forEach((session) => {
        sessionselect.push(session);
      });
    });
    setFilteredSessionList(sessionselect);
  };

  let courses;
  filteredcourselist.length <= 0
    ? (courses = courselist)
    : (courses = filteredcourselist);

  let sessions;
  filteredsessionlist.length <= 0
    ? (sessions = sessionlist)
    : (sessions = filteredsessionlist);

  return (
    <>
      <Jumbotron />
      <div className="container my-5 text-center">
        <h2>Toutes les formations</h2>
        {catlist && (
          <CourseSearch
            handleSelect={handleSelect}
            catlist={catlist}
            search={search}
          />
        )}
        <div className="row my-3 mb-3 d-flex justify-content-center">
          {courselist &&
            courses.map((course) => (
              <CoursePreview key={course.id} course={course} />
            ))}
        </div>
        <hr />
        <h2>Calendrier des formations</h2>
        <Calendar sessions={sessionlist} />
        <hr />
      </div>
    </>
  );
};

export default Home;

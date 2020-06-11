import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "../components/Calendar/Calendar";
import CoursePreview from "../components/Courses/CoursePreview";
import CourseSearch from "../components/Courses/CourseSearch";
import { fetchCourses } from "../service/courseApi";
import { displayError } from "../redux/middlewares/flashMiddleware";
import Jumbotron from "./../components/Layout/Jumbotron";

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

      let sessionfetch = [];
      courses.forEach((course) => {
        course.sessions.forEach((session) => {
          sessionfetch.push(session);
        });
      });
      setSessionList(sessionfetch);

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
      <div className="container mt-5">
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
              <CoursePreview key={course.id} course={course} />
            ))}
        </div>
        <Calendar sessions={sessions} />
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCourse } from "./../service/courseApi";
import { useDispatch } from "react-redux";
import { displayError } from "./../redux/middlewares/flashMiddleware";
import SessionLine from "./../components/SessionLine";
const Course = () => {
  const { course_id } = useParams();
  //const { token } = useSelector((state) => state.auth.token);
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSessions = async () => {
      const fetchSessions = await fetchCourse(course_id);
      if (!fetchSessions) {
        dispatch(displayError("Aucun cours de disponible"));
        return false;
      }
      setSessions(fetchSessions);
      console.log(fetchSessions);
    };

    getSessions();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="mt-5">Les sessions de cette formation</h2>
        <table className="mt-5 mb-5 table">
          <thead>
            <tr>
              <th scope="col">Session N°</th>
              <th scope="col">Date de session</th>
              <th scope="col">Places disponibles</th>
              <th scope="col">Salle</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions &&
              sessions.map((session) => (
                <SessionLine key={session.id} session={session} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Course;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSessions } from "../service/sessionsApi";
import { displayError } from "../redux/middlewares/flashMiddleware";
import Calendar from "../components/Calendar/Calendar";

const TeacherBoard = () => {
  const user = useSelector(state => state.auth.user);
  const [sessions, setSessions] = useState([])

  const dispatch = useDispatch()
  const { id, email, first_name, last_name } = user;

  useEffect(() => {
    const getSessions = async () => {
      //fetchUserSessions(user) ready to use, waiting for backend
      const loadSessions = await fetchSessions();
      if (!loadSessions) {
        dispatch(displayError("Aucun cours de disponible"))
        return false
      }
      const sessionsFiltred = loadSessions.filter((session) => session.course.teacher_id === user.id)
      setSessions(sessionsFiltred);
    };
    getSessions();
  }, [dispatch])

  return (
    <>
      <div className="container mt-5">
        <h1>Welcome on teacher board.</h1>
        <p>id : {id}</p>
        <p>prenom : {first_name}</p>
        <p>nom : {last_name}</p>
        <p>mail : {email}</p>
        <Calendar sessions={sessions} />
      </div>
    </>
  )
};

export default TeacherBoard;

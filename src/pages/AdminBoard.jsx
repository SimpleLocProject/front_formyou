import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewCourse } from "../components/Admin/NewCourse";
import NewUsers from "../components/Admin/NewUsers";
import Calendar from "../components/Calendar/Calendar";
import { displayError } from "../redux/middlewares/flashMiddleware";
import { fetchSessions } from "../service/sessionsApi";

const AdminBoard = () => {
  const user = useSelector(state => state.auth.user);
  const [sessions, setSessions] = useState([])

  const { id, email, first_name, last_name } = user;
  const dispatch = useDispatch()


  useEffect(() => {
    const getSessions = async () => {
      const loadSessions = await fetchSessions();
      if (!loadSessions) {
        dispatch(displayError("Aucun cours de disponible"))
        return false
      }
      setSessions(loadSessions);
    };
    getSessions();
  }, [dispatch])

  return (
    <div className="container mt-5">
      <h1>Welcome on admin board.</h1>
      <p>id : {id}</p>
      <p>prenom : {first_name}</p>
      <p>nom : {last_name}</p>
      <p>mail : {email}</p>
      <Calendar sessions={sessions} />
      <NewUsers />
      <NewCourse />
    </div>
  )
};

export default AdminBoard;

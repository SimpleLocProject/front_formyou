import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSessions } from "../service/sessionsApi";
import { displayError } from "../redux/middlewares/flashMiddleware";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";

const TeacherBoard = () => {
  const user = useSelector(state => state.auth.user);
  const [sessions, setSessions] = useState([])
  const { id, email } = user

  const dispatch = useDispatch()

  useEffect(() => {
    const getSessions = async () => {
      const loadSessions = await fetchSessions();
      console.log("zeub", loadSessions)
      if (!loadSessions) {
        dispatch(displayError("Aucun cours de disponible"))
        return false
      }
      setSessions(sessions.concat(loadSessions));
    };
    getSessions();
  }, [dispatch, sessions])

  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  return (
    <div className="container mt-5">
      <h1>Welcome on teacher board.</h1>
      <p>id : {id}</p>
      <p>mail : {email}</p>
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next today",
          center: "Votre agenda",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        dateClick={handleDateClick}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={
          sessions.map((session) => {
            console.log("session", session);

            return { title: session.course_id, date: session.begin_date }
          })}
      />
    </div>
  )
};

export default TeacherBoard;

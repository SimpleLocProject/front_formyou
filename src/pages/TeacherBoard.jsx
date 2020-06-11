import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSessions } from "../service/sessionsApi";
import { displayError } from "../redux/middlewares/flashMiddleware";

import Modal from "../components/Modal";

import $ from "jquery"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";

const TeacherBoard = () => {
  const user = useSelector(state => state.auth.user);
  const [sessions, setSessions] = useState([])
  const [modal, setModal] = useState({
    session_id: "",
    begin_date: "",
    availables_seats: "",
    course_id: "",
    classroom_id: "",
    created_at: "",
    updated_at: "",
  })
  const { id, email } = user

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

  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  const displayEvent = (e) => {
    setModal({
      ...modal,
      session_id: e.event.extendedProps.session_id,
      begin_date: e.event.extendedProps.begin_date,
      availables_seats: e.event.extendedProps.availables_seats,
      course_id: e.event.extendedProps.course_id,
      classroom_id: e.event.extendedProps.classroom_id,
      created_at: e.event.extendedProps.created_at,
      updated_at: e.event.extendedProps.updated_at,
    })
    $(".bd-example-modal-xl").modal()
  }

  return (
    <>
      <Modal course={modal.course_id} seats={modal.availables_seats} date={modal.begin_date} classroom={modal.classroom_id} />
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
              return {
                id: session.id,
                resourceIds: [session.id],
                title: session.course_id,
                date: session.begin_date,
                session_id: session.id,
                begin_date: session.begin_date,
                availables_seats: session.availables_seats,
                course_id: session.course_id,
                classroom_id: session.classroom_id,
                created_at: session.created_at,
                updated_at: session.updated_at,
              }
            })}
          eventClick={(e) => displayEvent(e)}
        />
      </div>
    </>
  )
};

export default TeacherBoard;

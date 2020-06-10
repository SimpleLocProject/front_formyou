import React from "react";
import { useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const TeacherBoard = () => {
  const user = useSelector(state => state.auth.user);
  const { id, email } = user

  return (
    <div className="container mt-5">
      <h1>Welcome on teacher board.</h1>
      <p>id : {id}</p>
      <p>mail : {email}</p>
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
    </div>
  )
};

export default TeacherBoard;

import React, { useState } from "react";

import Modal from "./Modal";

import $ from "jquery"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = ({ sessions }) => {

  const [modal, setModal] = useState({
    session_id: "",
    begin_date: "",
    availables_seats: "",
    course: "",
    classroom: "",
  })

  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  const displayEvent = (e) => {
    setModal({
      ...modal,
      session_id: e.event.extendedProps.session_id,
      begin_date: e.event.extendedProps.begin_date,
      availables_seats: e.event.extendedProps.availables_seats,
      course: e.event.extendedProps.course,
      classroom: e.event.extendedProps.classroom,
    })
    $(".bd-example-modal-xl").modal()
  }

  return (
    <>
      <Modal session={modal.session_id} course={modal.course} seats={modal.availables_seats} date={modal.begin_date} classroom={modal.classroom} />
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
              //display event props on calendar
              id: session.id,
              title: session.course.title,
              date: session.begin_date,
              //additionnal data for modal
              session_id: session.id,
              begin_date: session.begin_date,
              availables_seats: session.availables_seats,
              course: session.course.title,
              classroom: session.classroom_id,
            }
          })}
        eventClick={(e) => displayEvent(e)}
      />
    </>
  )
};

export default Calendar;

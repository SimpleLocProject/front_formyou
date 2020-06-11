import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserSessions } from "../../service/usersessionsApi"
import { displayInfo } from "../../redux/middlewares/flashMiddleware";


const Modal = ({ session, course, seats, date, classroom }) => {
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  const [sessionStudents, setSessionStudents] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const getStudents = async () => {
      const loadUseressions = await getUserSessions();
      if (!loadUseressions) {
        dispatch(displayInfo("Aucun élèves pour cette session de disponible"))
        return false
      }
      const userSessionFiltred = loadUseressions.filter((usersession) => usersession.session_id == session)
      setSessionStudents(userSessionFiltred);
    };
    getStudents();
  }, [session])

  return (
    <>
      <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cours: {course}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>date: {date}</p>
              <p>salle: {classroom}</p>
              <p>place restante: {seats}</p>
              {(isTeacher || isAdmin) && <p>TODO-TEACHER : CRUD note if date inférieur date.today</p>}
              {(isTeacher || isAdmin) &&
                sessionStudents.map((student) => {
                  return (
                    <li key={student.student.id}>{student.student.first_name} {student.student.last_name} || note: {student.note} || email: {student.student.email}</li>
                  )
                })
              }
              {(!isTeacher && !isAdmin) && <p>TODO-STUDENT : s'inscrire s'il reste des places if date sup ou egal date.today OU note if canAccess and a participé and date inférieur date.today </p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
import React from "react";
import { useSelector } from "react-redux";

const Modal = ({ course, seats, date, classroom }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const canAccess = useSelector(state => state.auth.canAccess)
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)

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
              {(isTeacher || isAdmin) && <p>liste des élèves + note (CRUD) if date inférieur date.today</p>}
              {(!isTeacher && !isAdmin) && <p>s'inscrire s'il reste des places if date sup ou egal date.today OU note if canAccess and a participé and date inférieur date.today </p>}
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
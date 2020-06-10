import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserSession,
  destroyUserSession,
} from "./../service/usersessionsApi";
import { displayError } from "../redux/middlewares/flashMiddleware";

const SessionLine = ({ session }) => {
  const [participate, setParticipate] = useState(false);
  const user_id = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const approveParticipation = async () => {
    const response = await createUserSession(session.id, user_id, token);
    if (!response) {
      dispatch(
        displayError("Vous devez être connecter pour vous inscrire à un cours")
      );
      return false;
    }
    setParticipate(!participate);
  };

  const cancelParticipation = async () => {
    const response = await destroyUserSession(session.id, user_id, token);
    if (!response) {
      dispatch(
        displayError("Vous devez être connecter pour vous inscrire à un cours")
      );
      return false;
    }
    setParticipate(!participate);
  };

  return (
    <tr key={session.id}>
      <td>{session.id}</td>
      <td>{session.begin_date}</td>
      <td>{session.availables_seats}</td>
      <td>{session.classroom_id}</td>
      {isAuthenticated && (
        <td>
          {participate ? (
            <button className="btn btn-warning" onClick={cancelParticipation}>
              Annuler
            </button>
          ) : (
            <button className="btn btn-info" onClick={approveParticipation}>
              Participer
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default SessionLine;

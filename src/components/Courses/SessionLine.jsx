import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserSession,
  destroyUserSession,
} from "../../service/usersessionsApi";
import { displayError, displayInfo } from "../../redux/middlewares/flashMiddleware";

const SessionLine = ({ subscribed, session }) => {
  const [participate, setParticipate] = useState(subscribed);
  const [subscriptions, setSubscriptions] = useState(session.usersessions);
  const user_id = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const subscribe = async () => {
    console.log("subscription", subscriptions);
    const response = await createUserSession(session.id, user_id, token);
    if (!response) {
      dispatch(
        displayError("Vous devez être connecter pour vous inscrire à un cours")
      );
      return false;
    }
    dispatch(displayInfo("Vous êtes maintenant inscrit à ce cours et pouvez le retrouver dans votre agenda"))
    setSubscriptions(subscriptions.concat(response));
    setParticipate(!participate);
  };

  const user_session = subscriptions.filter(
    (participation) => participation.student_id === user_id
  );

  const unsubscribe = async () => {
    const response = await destroyUserSession(user_session[0], token);
    if (!response) {
      dispatch(
        displayError("Ce cours a été ajouté à votre agenda")
      );
      return false;
    }
    dispatch(displayInfo("Ce cours a été retiré à votre agenda"))
    setSubscriptions(
      subscriptions.filter(
        (subscription) => subscription.id !== user_session[0].id
      )
    );
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
            <button className="btn btn-warning" onClick={unsubscribe}>
              Annuler
            </button>
          ) : (
              <button className="btn btn-info" onClick={subscribe}>
                Participer
              </button>
            )}
        </td>
      )}
    </tr>
  );
};

export default SessionLine;

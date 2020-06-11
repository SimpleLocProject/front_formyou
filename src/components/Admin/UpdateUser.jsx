import React, { useEffect } from "react";
import { fetchUpdateUser } from "./../../service/UpdateUserApi";
import { useDispatch, useSelector } from "react-redux";
import { displayError, displaySuccess } from "../../redux/middlewares/flashMiddleware";

const UpdateUser = ({ user }) => {

  const token = useSelector(state => state.auth.token);

  const body = JSON.stringify({
    user:
      { can_access: true }
  })

  const dispatch = useDispatch()

  const postUpdateUser = async (token, userId, body) => {
    const updateUser = await fetchUpdateUser(token, userId, body);
    if (!updateUser) {
      dispatch(displayError("L'utilisateur n'a pas été mis à jour"))
      return false
    }
    if(updateUser){
      dispatch(displaySuccess("L'utilisateur a bien été mis à jour"))
    }
  };

  return (
    <>
      <div className="card col-md-4 m-2">
        <div className="card-body">
          <h5 className="card-title">{user.first_name}</h5>
          <h5 className="card-title">{user.last_name}</h5>
          <h5 className="card-title">{user.email}</h5>
          <h5 className="card-title">Admin : {user.is_admin ? "Oui" : "Non"}</h5>
          <h5 className="card-title">Professseur : {user.is_teacher ? "Oui" : "Non"}</h5>
          <h5 className="card-title">Utilisateur validé : {user.can_access ? "Oui" : "Non"}</h5>
          <button onClick={() => postUpdateUser(token, user.id, body)} className="btn btn-success m-2">
            Valider cet utilisateur
          </button>
          <button className="btn btn-danger m-2">
            Supprimer cet utilisateur
          </button>
        </div>
      </div>
    </>
  );
};
export default UpdateUser;

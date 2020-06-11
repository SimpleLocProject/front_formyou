import React, { useState, useEffect } from "react";
import { fetchNewUsers, fetchUpdateUser, fetchDeleteUser } from "../../service/userApi";
import { useDispatch } from "react-redux";
import { displayError, displaySuccess } from "../../redux/middlewares/flashMiddleware";
import { useSelector } from "react-redux";

const NewUsers = () => {
  const [newUsersList, setNewUsersList] = useState();

  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch()

  useEffect(() => {
    getNewUsers();
  }, [dispatch]);

  const getNewUsers = async () => {
    const newUsers = await fetchNewUsers(token);
    if (!newUsers) {
      dispatch(displayError("Aucun nouvel utilisateur à modérer"))
      return false
    }
    setNewUsersList(newUsers);
  };

  const postUpdateUser = async (token, userId) => {
    const body = JSON.stringify({
      user:
        { can_access: true }
    })
    const updateUser = await fetchUpdateUser(token, userId, body);
    if (!updateUser) {
      dispatch(displayError("L'utilisateur n'a pas été validé"))
      return false
    }
    if (updateUser) {
      dispatch(displaySuccess("L'utilisateur a bien été validé"))
      getNewUsers()
    }
  };

  const postDeleteUser = async (token, userId) => {
    const deleteUser = await fetchDeleteUser(token, userId);
    if (!deleteUser) {
      dispatch(displayError("L'utilisateur n'a pas été supprimé"))
      return false
    }
    if (deleteUser) {
      dispatch(displaySuccess("L'utilisateur a bien été supprimé"))
      getNewUsers()
    }
  };

  return (
    <>
      <h2>Liste des utilisateurs à modérer</h2>
      {newUsersList ?
        newUsersList.map((newUser) => (
          <div className="card col-md-4 m-2">
            <div className="card-body">
              <h5 className="card-title">{newUser.first_name}</h5>
              <h5 className="card-title">{newUser.last_name}</h5>
              <h5 className="card-title">{newUser.email}</h5>
              <h5 className="card-title">Admin : {newUser.is_admin ? "Oui" : "Non"}</h5>
              <h5 className="card-title">Professseur : {newUser.is_teacher ? "Oui" : "Non"}</h5>
              <h5 className="card-title">Utilisateur validé : {newUser.can_access ? "Oui" : "Non"}</h5>
              <button onClick={() => postUpdateUser(token, newUser.id)} className="btn btn-success m-2">
                Valider cet utilisateur
          </button>
              <button onClick={() => postDeleteUser(token, newUser.id)} className="btn btn-danger m-2">
                Supprimer cet utilisateur
          </button>
            </div>
          </div>
        )) :
        <p>Aucun utilisateur à modérer</p>}
    </>
  );
};

export default NewUsers;

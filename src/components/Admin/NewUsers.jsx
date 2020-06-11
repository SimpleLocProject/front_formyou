import React, { useState, useEffect } from "react";
import { fetchNewUsers } from "./../../service/newUsersApi";
import { useDispatch } from "react-redux";
import { displayError } from "../../redux/middlewares/flashMiddleware";
import { useSelector } from "react-redux";
import UpdateUser from "./UpdateUser";

const NewUsers = () => {
  const [newUsersList, setNewUsersList] = useState();

  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch()

  useEffect(() => {
    const getNewUsers = async () => {
      const newUsers = await fetchNewUsers(token);
      if (!newUsers) {
        dispatch(displayError("Aucun nouvel utilisateur à modérer"))
        return false
      }
      setNewUsersList(newUsers);
    };
    getNewUsers();
  }, []);

  return (
    <>
      <h2>Liste des utilisateurs à modérer</h2>
      {newUsersList ?
       newUsersList.map((newUser)=> (
       <UpdateUser key={newUser.id} user={newUser}/>
        )) :
        <p>Aucun utilisateur à modérer</p>}
    </>
  );
};

export default NewUsers;

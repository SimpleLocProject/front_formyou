import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchToRegister } from "../redux/middlewares/authMiddleware";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [is_teacher, setIsTeacher] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleStatus = (status) => {
    switch (status) {
      case "Teacher":
        setIsTeacher(true);
        setIsAdmin(false);
        break;
      case "Admin":
        setIsTeacher(false);
        setIsAdmin(true);
        break;
      case "Student":
      default:
        setIsTeacher(false);
        setIsAdmin(false);
        break
    }
  };

  const register = async (e) => {
    const data = {
      user: {
        first_name,
        last_name,
        email,
        password,
        is_teacher,
        is_admin,
        can_access: true,
      },
    };
    e.preventDefault();
    if (await dispatch(fetchToRegister(data))) {
      history.push("/");
    }
  };

  return (
    <div className="container mt-5">
      <div className="offset-md-2">
        <form className="card m-5 p-5 col-md-8 " onSubmit={register}>
          <div className="mb-3 text-center">
            <h2>Créer un compte</h2>
          </div>
          <div className="form-check mb-3">
            <span>Je suis :</span>
            <input
              className="form-check-input ml-4"
              type="radio"
              name="gridRadios"
              id="gridRadios1"
              value="false"
              onChange={(e) => handleStatus("Student")}
            />
            <label className="ml-5 form-check-label" htmlFor="gridRadios1">
              Etudiant
            </label>
            <input
              className="form-check-input ml-4"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="true"
              onChange={(e) => handleStatus("Teacher")}
            />
            <label className="ml-5 form-check-label" htmlFor="gridRadios2">
              Enseignant
            </label>
            <input
              className="form-check-input ml-4"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="true"
              onChange={(e) => handleStatus("Admin")}
            />
            <label className="ml-5 form-check-label" htmlFor="gridRadios2">
              Administrateur
            </label>
          </div>

          <div className="form-group">
            <input
              id="Firstname"
              className="form-control"
              type="text"
              placeholder="Prénom"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              id="Lastname"
              className="form-control"
              type="text"
              placeholder="Nom"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entrez votre email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group text-center">
            <input
              className="btn btn-primary btn-lg"
              type="submit"
              value="Je m'inscris"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

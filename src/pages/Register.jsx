import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchToRegister } from "../redux/middlewares/authMiddleware"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [is_teacher, SetIsTeacher] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const register = async (e) => {
    const data = {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        is_teacher: is_teacher
      }
    }
    e.preventDefault()
    if (await dispatch(fetchToRegister(data))) {
      history.push("/");
    }
  }


  return (
    <div className="offset-md-3">
      <form className="card m-5 p-5 col-md-6 " onSubmit={register}>
        <div className="mb-3 text-center">
          <h2>Créer un compte</h2>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gridRadios"
            id="gridRadios1"
            value="false"
            onChange={(e) => SetIsTeacher(false)}
          />
          <label className="form-check-label" for="gridRadios1">
            Je suis un étudiant
          </label>
          <input
            className="form-check-input ml-4"
            type="radio"
            name="gridRadios"
            id="gridRadios2"
            value="true"
            onChange={(e) => SetIsTeacher(true)}
          />
          <label className="ml-5 form-check-label" for="gridRadios2">
            Je suis un enseignant
          </label>
        </div>

        <div className="form-group">
          <input
            id="Firstname"
            class="form-control"
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
            class="form-control"
            type="text"
            placeholder="Nom"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div class="form-group">
          <input
            type="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Entrez votre email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            class="form-control"
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
  );
};

export default Register;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginSuccess, loginFail } from "../redux/actions/authActions";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const data = {
      user: {
        email: email,
        password: password,
      },
    };

    const response = await fetch(`${API_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const token = await response.headers.get("authorization").split(" ")[1];
      const user = await response.json();
      const userToLog = { token, user };
      dispatch(loginSuccess(userToLog));
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Aucun utilisateur correspondant");
      dispatch(loginFail());
    }
  };

  return (
    <div className="offset-md-3">
      {!isAuthenticated && (
        <>
          <form className="card m-5 p-5 col-md-6 " onSubmit={login}>
            <div className="mb-3 text-center">
              <h3>Se connecter</h3>
            </div>
            <div class="form-group">
              <input
                type="email"
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
        </>
      )}
      {isAuthenticated && (
        <>
          <h1>connexion réussi !</h1>
        </>
      )}
    </div>
  );
};

export default Login;

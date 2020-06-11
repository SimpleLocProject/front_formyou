import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchToLogin } from "../redux/middlewares/authMiddleware";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (e) => {
    const data = {
      user: {
        email: email,
        password: password,
      },
    };
    e.preventDefault();
    if (await dispatch(fetchToLogin(data))) {
      history.push("/");
    }
  };

  return (
    <div className="container mt-5">
      <div className="offset-md-3">
        {!isAuthenticated && (
          <>
            <form className="card m-5 p-5 col-md-6 " onSubmit={login}>
              <div className="mb-3 text-center">
                <h3>Se connecter</h3>
              </div>
              <div className="form-group">
                <input
                  type="email"
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
                  value="Je me connecte"
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
    </div>
  );
};

export default Login;

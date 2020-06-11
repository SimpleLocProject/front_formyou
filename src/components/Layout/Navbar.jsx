import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { logoutSuccess } from '../../redux/actions/authActions'



const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(logoutSuccess())
    history.push("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand ml-2">Form You</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end mr-2" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <li className="nav-item dropdown">
              {!isAuthenticated &&
                <>
                  <button className="link-button nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">S'inscrire / Se connecter</button>
                  <div className="dropdown-menu">
                    <Link to="/signup" className="dropdown-item">S'inscrire</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/login" className="dropdown-item">Se connecter</Link>
                  </div>
                </>}
              {isAuthenticated &&
                <>
                  <button className="link-button nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.email}</button>
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="#" onClick={logout} className="dropdown-item">Se déconnecter</Link>
                  </div>
                </>}
            </li>
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;
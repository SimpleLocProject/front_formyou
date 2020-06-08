import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import { fetchToLoadUser } from './redux/middlewares/authMiddleware';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      console.log(token)
      dispatch(fetchToLoadUser(token))
    }
  }, [dispatch])

  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Switch>
        <div className="container mt-5">
          <Route exact path="/" component={Home} />
          <UnAuthRoute path="/login" component={Login} />
          <UnAuthRoute path="/signup" component={Register} />
          <AuthRoute path="/profile" component={Profile} />
          <Route path="/" component={() => <div>ERREUR 404</div>} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;

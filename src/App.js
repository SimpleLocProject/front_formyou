import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Cookies from "js-cookie";

import { UnAuthRoute, AuthRoute, HomeRoute, AdminRoute, TeacherRoute, StudentRoute } from "./routes/Routes";

import "./App.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { fetchToLoadUser } from './redux/middlewares/authMiddleware';
import FlashMessage from './components/FlashMessage';
import AdminBoard from "./pages/AdminBoard";
import TeacherBoard from "./pages/TeacherBoard";
import StudentBoard from "./pages/StudentBoard";


const App = () => {
  const displayFlash = useSelector(state => state.flash.display)

  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      dispatch(fetchToLoadUser(token))
    }
  }, [dispatch])

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {displayFlash && <FlashMessage />}
      <Navbar />
      <Switch>
        <HomeRoute exact path="/" component={Home} />
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/signup" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
        <AdminRoute path="/admin" component={AdminBoard} />
        <TeacherRoute path="/teacher" component={TeacherBoard} />
        <StudentRoute path="/student" component={StudentBoard} />
        <Route path="*" component={() => <div>ERREUR 404</div>} />
      </Switch>

    </Router>
  );
};

export default App;

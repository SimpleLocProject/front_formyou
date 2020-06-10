import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
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
import Course from "./pages/Course";
import Footer from "./components/Footer";

const App = () => {
  const [loadReady, setLoadReady] = useState(false)
  const user = useSelector((state) => state.auth.user);
  const displayFlash = useSelector((state) => state.flash.display);

  const dispatch = useDispatch();

  useEffect(() => {
    const landing = async () => {
      const token = Cookies.get("token");
      if (!user && token) {
        await dispatch(fetchToLoadUser(token))
      }
      setLoadReady(true)
    }
    landing()
  }, [dispatch, user]);


  return (
    <Router basename={process.env.PUBLIC_URL}>
      {displayFlash && <FlashMessage />}
      <Navbar />
      <Switch>
        {loadReady && <HomeRoute exact path="/" component={Home} />}
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/signup" component={Register} />
        <UnAuthRoute path="/course/:course_id" component={Course} />
        <AuthRoute path="/profile" component={Profile} />
        <AdminRoute path="/admin" component={AdminBoard} />
        <TeacherRoute path="/teacher" component={TeacherBoard} />
        <StudentRoute path="/student" component={StudentBoard} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

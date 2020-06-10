import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const UnAuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
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
  )
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
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
  )
};

export const HomeRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const canAccess = useSelector(state => state.auth.canAccess)
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)

  const roadToHome = (props) => {
    let road
    if (canAccess && isTeacher && isAuthenticated && !isAdmin) {
      console.log("teacher");

      road = <Redirect to={{ pathname: "/teacher" }} />
    } else if (canAccess && isAdmin && isAuthenticated && !isTeacher) {
      console.log("admin");
      road = <Redirect to={{ pathname: "/admin" }} />
    } else if (canAccess && isAuthenticated && !isTeacher && !isAdmin) {
      road = <Redirect to={{ pathname: "/student" }} />
      console.log("student");
    } else {
      road = <Component {...props} />
      console.log("home");
    }
    console.log(road);

    return road
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(roadToHome(props))
        return roadToHome(props)
      }
      }
    />
  )
};

export const TeacherRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const canAccess = useSelector(state => state.auth.canAccess)
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  return (
    <Route
      {...rest}
      render={(props) =>
        canAccess && isTeacher && isAuthenticated && !isAdmin ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  )
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const canAccess = useSelector(state => state.auth.canAccess)
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  return (
    <Route
      {...rest}
      render={(props) =>
        canAccess && isAdmin && isAuthenticated && !isTeacher ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  )
};


export const StudentRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const canAccess = useSelector(state => state.auth.canAccess)
  const isTeacher = useSelector(state => state.auth.isTeacher)
  const isAdmin = useSelector(state => state.auth.isAdmin)
  return (
    <Route
      {...rest}
      render={(props) =>
        canAccess && isAuthenticated && !isTeacher && !isAdmin ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  )
};
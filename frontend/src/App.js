import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/user/userSlice";
import { logout } from "./redux/user/userSlice";
import { initialState } from "./redux/user/userSlice";
import Home from "./pages/user/Home";
import Unauthorised from "./pages/Unauthorised";
import RequireAuth from "./components/RequireAuth";
import Protected from "./pages/Protected";

function App() {
  const dispatch = useDispatch();
  let token = 1;
  useEffect(() => {
    async function initializeToken() {
      if (token) {
        setTimeout(() => {
          dispatch(login({
            user: {
              id: 'id',
              name: 'name',
              surname: 'surname',
              email: 'email',
              role: 'role',
            },
          }))
        }, 2000);
      } else {
        dispatch(logout());
        console.log("no token");
      }
    }
    initializeToken();
  }, [dispatch]);

  // dispatch(initialState());
  const session = useSelector((state) => state.user);
 // const isAuth = useSelector((state) => state.user.isLoggedIn);

  const sessionObject = session ? JSON.parse( JSON.stringify(session)) : null ;
  console.log(sessionObject, 'sessionObject');

  const isAuth = sessionObject ? sessionObject.isLoggedIn : null ;
  console.log(isAuth + "isAuth");
  const role = sessionObject ? sessionObject.user && session.user.user ? session.user.user.role : null : null
  console.log(role, 'role')


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="unauthorised" element={<Unauthorised />} />
          <Route
            element={
              <RequireAuth allowedRoles={[3]} session_role={session?.role} />
            }
          >
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

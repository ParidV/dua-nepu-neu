import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/user/userSlice";
import { logout } from "./redux/user/userSlice";
import { selectUser } from "./redux/user/userSlice";

//Import the pages

function App() {
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:4500/api/user/current", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          dispatch(login(res.data));
        });
    } else {
      dispatch(logout());
      console.log("no token");
    }
  }, []);

  console.log(JSON.stringify(session) + isAuth);

  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        <Link to="/profile">Home</Link>
        <Link
          to="/dd"
          onClick={() => {
            dispatch(logout());
            localStorage.clear();
            console.log("2");
            console.log(JSON.stringify(session) + isAuth);
          }}
        >
          logout
        </Link>
        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="profile" element={<h1>Profile</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

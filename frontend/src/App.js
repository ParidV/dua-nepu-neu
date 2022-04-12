import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  useEffect(() => {
    async function initializeToken() {
      dispatch(initialState());
      if (token) {
        await axios
          .get(`http://localhost:4500/api/user/current`, {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            dispatch(login(res.data));
            setLoading(false);
          });
      } else {
        dispatch(logout());
        setLoading(false);
        console.log("no token");
      }
    }
    initializeToken();
  }, [dispatch]);

  console.log(JSON.stringify(session) + isAuth);
  console.log(session?.role + " XX S");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="login"
            element={session ? <Navigate to="/" /> : <Login />}
          />
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

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
import AdminDashboard from "./pages/admin";
import CategoriesIndex from "./pages/admin/categories";
import EditCategory from "./pages/admin/categories/id";
import NotFound from "./pages/NotFound";
import JobsAdmin from "./pages/admin/jobs";
import CreateCategory from "./pages/admin/categories/create";
import AdminSettings from "./pages/admin/settings/index";
import CompanyDashboard from "./pages/company";
import CompanyJobsIndex from "./pages/company/jobs/index";
import CreateJob from "./pages/company/jobs/create";

function App() {
  const session = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isLoggedIn);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  useEffect(() => {
    try {
      async function initializeToken() {
        dispatch(initialState());
        if (token) {
          await axios
            .get(`${process.env.REACT_APP_API_URL}/user/current`, {
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
    } catch (error) {
      console.log(error);
    }
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
          <Route exact path="/404" element={<NotFound />} />
          <Route
            exact
            path="login"
            element={session ? <Navigate to="/" replace /> : <Login />}
          />
          <Route exact path="unauthorised" element={<Unauthorised />} />
          {/* ADMIN */}
          <Route
            element={
              <RequireAuth allowedRoles={3} session_role={session?.role} />
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/admin/categories/create"
              element={<CreateCategory />}
            />
            <Route path="/admin/categories" element={<CategoriesIndex />} />
            <Route path="/admin/categories/:id" element={<EditCategory />} />
            <Route path="/admin/jobs" element={<JobsAdmin />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
          {/* Company */}
          <Route
            element={
              <RequireAuth allowedRoles={2} session_role={session?.role} />
            }
          >
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/company/jobs" element={<CompanyJobsIndex />} />
            <Route path="/company/jobs/create" element={<CreateJob />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

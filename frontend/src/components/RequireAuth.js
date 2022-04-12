import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const RequireAuth = ({ allowedRoles, session_role }) => {
  const session = useSelector((state) => state.user.user);
  const location = useLocation();

  return session_role === allowedRoles ? (
    <Outlet />
  ) : session ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

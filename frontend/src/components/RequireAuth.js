import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const RequireAuth = ({ allowedRoles, session_role }) => {
  const session = useSelector((state) => state.user.user);
  const location = useLocation();

  console.log(session_role + " ROLE ");

  return session_role?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : session ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

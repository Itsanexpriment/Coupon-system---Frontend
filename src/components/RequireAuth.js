import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const RequireAuth = ({ allowedUserType }) => {
  const {user, isLoading} = useUser();
  const location = useLocation();

  if (isLoading) {
    return <h1>Loading...</h1>
  }

    return (
        user.type === allowedUserType
            ? <Outlet />
            : user.tokens
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
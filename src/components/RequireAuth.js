import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useSpinDelay } from 'spin-delay';
import { InfinitySpin } from 'react-loader-spinner';

const RequireAuth = ({ allowedUserTypes }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  
  const showSpinner = useSpinDelay(isLoading, { delay: 500, minDuration: 300 });

  if (showSpinner) {
    return (<div className="loading-spinner">
      <InfinitySpin
        width='300'
        color="#4fa94d"
      />
    </div>)
  }

  return (
    allowedUserTypes.includes(user.type) ?
      <Outlet />
      : user.isAuthenticated ?
        <Navigate to="/forbidden" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
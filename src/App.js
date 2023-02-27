import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import RequireAuth from './components/RequireAuth';
import UserCoupons from './pages/user-coupons/UserCoupons'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/user-slice';
import axios from './api/axios';
import UserProfile from './pages/profile/UserProfie';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (user.isAuthenticated) {
      axios
        .post("/logout", user.tokens)
        .then(res => dispatch(userActions.logout()))
        .catch(err => console.error(err));
    } else {
      console.error("Can't perform logout when user isn't logged in");
    }
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedUserType={["customer", "company"]} />}>
          <Route path="my-coupons" element={<UserCoupons />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

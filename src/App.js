import { Routes, Route, useNavigate } from 'react-router-dom';
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
import CreateCoupon from './pages/create-coupon/CreateCoupon';
import Forbidden from './pages/forbidden/Forbidden';
import Shop from './pages/shop/Shop';
import Expiring from './pages/expiring/Expiring';
import NotFound from './pages/not-found/NotFound';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user.isAuthenticated) {
      axios
        .post("/logout", user.tokens)
        .catch(err => console.error(err))
        .finally(() => {
          dispatch(userActions.logout());
          navigate("/login");
        });
    } else {
      console.error("Can't perform logout when user isn't logged in");
    }
  }

  const handleSignIn = () => {
    navigate("login");
  }

  return (
    <>
      <Header handleSignIn={handleSignIn} handleLogout={handleLogout} />
      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedUserTypes={["customer", "company"]} />}>
          <Route path="my-coupons" element={<UserCoupons />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route element={<RequireAuth allowedUserTypes={["company"]} />}>
          <Route path="create-coupon" element={<CreateCoupon />} />
        </Route>
        
        <Route element={<RequireAuth allowedUserTypes={["customer"]} />}>
          <Route path="Shop" element={<Shop />} />
          <Route path="expiring-soon" element={<Expiring />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import './App.css';
import Customer from './pages/customer/Customer';
import Company from './pages/company/Company';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/user-slice';
import axios from './api/axios';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  const handleLogout = () => {
    if (!user.isAuthenticated) {
      console.error("Can't perform logout when user isn't logged in");
    }

    axios.post("/logout", user.tokens).then(res => console.log(res)).catch(err => console.error(err));
    dispatch(userActions.logout());
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedUserType={"customer"} />}>
          <Route path="customer" element={<Customer />} />
        </Route>

        <Route element={<RequireAuth allowedUserType={"company"} />}>
          <Route path="company" element={<Company />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

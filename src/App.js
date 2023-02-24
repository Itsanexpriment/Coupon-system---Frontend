import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import './App.css';
import Customer from './pages/customer/Customer';
import Company from './pages/company/Company';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';

const App = () => {
  

  
  return (
    <>
      <Header />
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

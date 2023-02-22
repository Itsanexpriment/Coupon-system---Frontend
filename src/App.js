import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import './App.css';
import Customer from './pages/customer/Customer';
import Company from './pages/company/Company';
import useFetch from './hooks/useFetch';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  const { data, isLoading, error } = useFetch("http://localhost:8080/api/featured");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </>
  );
}

export default App;

import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './Header.css'

const Header = ({ handleLogout }) => {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);

  return (
    <>
      <nav className="nav-menu">
        <Link className="nav-menu-item" to={"/"}>Home</Link>
        <Link className="nav-menu-item" to={"/about"}>About</Link>
        <Link className="nav-menu-item" to={"/contact-us"}>Contact Us</Link>
        {isLoggedIn ?
          <>
            <Link className="nav-menu-item" to={"/my-coupons"}>My Coupons</Link>
            <Link className="nav-menu-item" to={"/profile"}>Profile</Link>
            <button className="header-logout-btn" onClick={handleLogout}>
              <span className="logout-btn-text">Log Out</span>
              <div className="logout-btn-fill"></div>
            </button>
          </>
          :
          <Link className="nav-menu-item" to={"/login"}>Sign in</Link>
        }
      </nav>
      <Outlet />
    </>);
}

export default Header;
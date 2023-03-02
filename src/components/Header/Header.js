import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './Header.css'
import LogoutButton from '../buttons/LogoutButton/LogoutButton';
import SignInButton from '../buttons/SignInButton/SignInButton';
import CouponsDropdown from '../CouponsDropdown/CouponsDropdown';


const Header = ({ handleSignIn, handleLogout }) => {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);

  return (
    <>
      <nav className="nav-menu">
        <Link className="nav-menu-item" to={"/"}>Home</Link>
        <Link className="nav-menu-item" to={"/about"}>About</Link>
        <Link className="nav-menu-item" to={"/contact-us"}>Contact Us</Link>
        {isLoggedIn ?
          <>
            <CouponsDropdown />
            <Link className="nav-menu-item" to={"/profile"}>Profile</Link>
            <LogoutButton handleLogout={handleLogout} />
          </>
          :
          <SignInButton handleSignIn={handleSignIn} />
        }
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
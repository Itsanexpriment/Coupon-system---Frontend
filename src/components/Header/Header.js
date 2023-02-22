import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <>
      <nav className="nav-menu">
          <NavLink className="nav-menu-item" to={"/customer"}>Customer</NavLink>
      </nav>
    </>);
}

export default Header;
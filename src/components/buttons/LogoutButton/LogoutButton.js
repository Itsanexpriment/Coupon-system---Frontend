import './LogoutButton.css'

const LogoutButton = ({handleLogout}) => {
  return (
    <button className="header-logout-btn" onClick={handleLogout}>
      <span className="logout-btn-text">Log Out</span>
      <div className="logout-btn-fill"></div>
    </button>
  );
}

export default LogoutButton;
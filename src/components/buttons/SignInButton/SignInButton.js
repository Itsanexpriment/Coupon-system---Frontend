import './SignInButton.css'

const SignInButton = ({handleSignIn}) => {
  return (
    <button className="header-signin-btn" onClick={handleSignIn}>
      <span className="signin-btn-text">Sign in</span>
      <div className="signin-btn-fill"></div>
    </button>
  );
}

export default SignInButton;
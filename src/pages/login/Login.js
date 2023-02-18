import './Login.css'

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login button pressed");
  }

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action=''>
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type='submit' onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <p className='credits'>
          Created by <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
        </p>
    </>
  );
}

export default Login;
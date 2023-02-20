import axios from 'axios';
import { useState, useRef } from 'react';
import './Login.css'

const Login = () => {

  const [tokens, setTokens] = useState();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    performLogin(credentials);
  }

  const performLogin = (credentials) => {
    axios
      .post("http://localhost:8080/api/login?type=customer", credentials)
      .then(response => setTokens(response.data))
      .catch(err => console.log(err.response.data));
  }

  const handleChangeUserType = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <div className="custom-select">
              <label htmlFor="select-menu">I'm a: </label>
              <select>
                <option value="">Customer</option>
                <option value="">Company</option>
              </select>
              <span className="custom-arrow"></span>
            </div>
            <input type="email" ref={emailRef} placeholder="Email" />
            <input type="password" ref={passwordRef} placeholder="Password" />
            <a>Forgot your password?</a>
            <button className="sign-in-btn" type='submit' onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="sign-up-btn" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
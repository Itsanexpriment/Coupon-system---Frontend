import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { userActions } from '../../store/user-slice';
import { useDispatch } from 'react-redux';
import { errorToast } from '../../toast/toast';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_USER_TYPE = "customer"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userTypeRef = useRef(DEFAULT_USER_TYPE);

  const handleLogin = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length === 0 || password.length === 0) {
      errorToast("Email and password are required");
      return;
    }

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    performLogin(credentials, userTypeRef.current);
  }

  const performLogin = (credentials, userType) => {
    axios
      .post(`http://localhost:8080/api/login?type=${userType}`, credentials)
      .then(response => {

        const userDetails = {
          tokens: response.data,
          type: userTypeRef.current
        }

        dispatch(userActions.login(userDetails))
        navigate(`/${userType}`)
      })
      .catch(err => errorToast("Unable to login"));
  }

  const handleChangeUserType = (event) => {
    event.preventDefault();

    userTypeRef.current = event.target.value;
  }

  return (
    <>
      <div className="login-container">
        <div className="form-container sign-in-container">
          <form>
            <h1 className="sign-in-title">Sign in</h1>
            <div className="custom-select">
              <label htmlFor="select-menu">I'm a: </label>
              <select onChange={handleChangeUserType}>
                <option value="customer">Customer</option>
                <option value="company">Company</option>
              </select>
              <span className="custom-arrow"></span>
            </div>
            <input type="email" ref={emailRef} placeholder="Email" required />
            <input type="password" ref={passwordRef} placeholder="Password" required />
            <a href="#">Forgot your password?</a>
            <button className="sign-in-btn" type='submit' onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="sign-up-btn" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
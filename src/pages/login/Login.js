import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { userActions } from '../../store/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast } from '../../toast/toast';
import 'react-toastify/dist/ReactToastify.css';
import { CUSTOMER, COMPANY } from '../../utils/constants';

const DEFAULT_USER_TYPE = CUSTOMER

const Login = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userTypeRef = useRef(DEFAULT_USER_TYPE);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated])

  const handleLogin = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length === 0 || password.length === 0) {
      errorToast("Email and password are required");
      return;
    }

    const credentials = {
      email,
      password
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

        dispatch(userActions.login(userDetails));
        navigate("/");
      })
      .catch(err => handleError(err));
  }

  const handleChangeUserType = (event) => {
    event.preventDefault();
    userTypeRef.current = event.target.value;
  }

  const handleSignUp = (event) => {
    event.preventDefault();

    errorToast("To be implemented in future release");
  }

  return (
    <>
      <div className="login-container">
        <div className="form-container sign-in-container">
          <form className="login-form">
            <h1 className="sign-in-title">Sign in</h1>
            <div className="custom-select">
              <label htmlFor="select-menu">I'm a:</label>
              <select className="user-type-select" onChange={handleChangeUserType}>
                <option value={CUSTOMER}>Customer</option>
                <option value={COMPANY}>Company</option>
              </select>
              <span className="custom-arrow"></span>
            </div>
            <input type="email" ref={emailRef} placeholder="Email" required />
            <input type="password" ref={passwordRef} placeholder="Password" required />
            <button className="sign-in-btn" type='submit' onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className="sign-up-message">Enter your personal details and start your journey with us</p>
              <button className="sign-up-btn" id="signUp" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function handleError(err) {
  if (!err.response) {
    errorToast("Unable to connect to server, try again later");
    return;
  }

  const response = err.response;
  const status = response.status
  let errorMsg;

  if (status === 500) {
    errorMsg = "An Internal server error has occured, try again later";
  }

  if (status === 401) {
    const errorDetails = response.data.detail;
    if (errorDetails.includes("Bad credentials")) {
      errorMsg = "Email and/or password are incorrect";
    }
  }

  errorToast(errorMsg ? errorMsg : "Something went wrong, try again later");
}

export default Login;
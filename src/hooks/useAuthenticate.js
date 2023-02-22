import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../store/user-slice";
import jwt from "jwt-decode";


const useAuthenticate = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTime = () => {
    return Math.floor(Date.now() / 1000);
  }

  const tokenIsValid = (token) => {
    return token.exp - currentTime() > 0;
  }

  const handleUnAuthenticatedUser = () => {
    const rawTokens = localStorage.getItem("tokens");

    if (rawTokens === null) {

      console.log("We should get here")

      navigate("/login");
      return;
    }

    const tokens = JSON.parse(rawTokens);
    const accessToken = jwt(tokens.accessToken);

    if (tokenIsValid(tokens.accessToken)) {
      dispatch(userActions.setIsAuthenticated(true));
      dispatch(userActions.setTokens(tokens));
      dispatch(userActions.setType("customer")); // TODO - maybe use constant
      return;
    }

    if (tokenIsValid(tokens.refreshToken)) {
      // TODO - change the function's name
    }

    axios
      .post("http://localhost:8080/api/login/refresh-token", tokens)
      .then(response => console.log(response.data))
      .catch(err => console.log(err.response.data));
  }

  const handleUnAuthorizedUser = () => {
    navigate() // TODO - implement
  }

  useEffect(() => {
    if (!user.isAuthenticated) {
      handleUnAuthenticatedUser();
    }

    if (user.type !== "customer") {
      handleUnAuthorizedUser();
    }
  }, [])
}

export default useAuthenticate;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jwt-decode";
import { userActions } from "../store/user-slice";
import axios from "axios";

const currentTime = () => {
  return Math.floor(Date.now() / 1000);
}

const isTokenValid = (token) => {
  return jwt(token).exp - currentTime() > 0;
}

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const tokens = user.tokens;

  useEffect(() => {
    setIsLoading(true);

    if (tokens === null || isTokenValid(tokens.accessToken)) {
      setIsLoading(false);
    } else {
      axios.post("http://localhost:8080/api/login/refresh", tokens)
        .then(response => dispatch(userActions.refreshTokens(response.data)))
        .catch(__ => dispatch(userActions.logout()))
        .finally(() => setIsLoading(false))
    }
  }, [])

  return { user, isLoading };
}

export default useUser;
import axios from "../api/axios";
import jwt from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

const usePrivateGet = (url, onSuccess, onError) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const tokens = user.tokens;

  const performRequest = async (accessToken) => {
    axios
      .get(url, { headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then(onSuccess)
      .catch(onError)
  }

  const request = async () => {
    if (isTokenValid(tokens.accessToken)) {
      performRequest(tokens.accessToken);
    }
    else if (isTokenValid(tokens.refreshToken)) {
      axios
        .post("http://localhost:8080/api/login/refresh", tokens)
        .then(res => {
          dispatch(userActions.refreshTokens(res.data));
          performRequest(res.data.accessToken)
        })
        .catch(onError)
    } else {
      dispatch(userActions.logout())
    }
  }

  return request
}

function isTokenValid(token) {
  return jwt(token).exp - currentTime() > 0;
}

function currentTime() {
  return Math.floor(Date.now() / 1000);
}

export default usePrivateGet;
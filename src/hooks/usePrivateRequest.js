import axios from "../api/axios";
import jwt from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

const usePrivateRequest = (url, method, onSuccess, onError) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const tokens = user.tokens;

  const performRequest = async (accessToken, data) => {
    axios(url, { method, data, headers: { 'Authorization': `Bearer ${accessToken}` } })
      .then(onSuccess)
      .catch(onError)
  }

  const request = async (requestData) => {
    if (isTokenValid(tokens.accessToken)) {
      performRequest(tokens.accessToken, requestData);
    }
    else if (isTokenValid(tokens.refreshToken)) {
      axios
        .post("http://localhost:8080/api/login/refresh", tokens)
        .then(res => {
          dispatch(userActions.refreshTokens(res.data));
          performRequest(res.data.accessToken, requestData);
        })
        .catch(err => onError(err))
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

export default usePrivateRequest;
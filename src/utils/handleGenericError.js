import { errorToast } from "../toast/toast"

function handleGenericError(err) {
  if (!err.response) {
    errorToast("Unable to connect to server, try again later");
    return;
  }

  const response = err.response;
  const status = response.status;
  let errorMsg;

  if (status === 500) {
    errorMsg = "An Internal server error has occured, try again later";
  }

  errorToast(errorMsg ? errorMsg : "Something went wrong, try again later");
}

export default handleGenericError;
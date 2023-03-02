import { errorToast, successToast } from "../toast/toast";
import usePrivateRequest from "./usePrivateRequest";

const useDeleteRequest = () => {
  const deleteRequest = usePrivateRequest(
    "/company/delete",
    "delete",
    __ => successToast("Coupon deleted :) refresh the page to see changes"),
    handleError
  )
  return deleteRequest;
}

function handleError(err) {
  if (err.response) {
    handleServerError(err.response);
  }
  else {
    errorToast("Unable to reach server, try again later");
  }
}

function handleServerError(errResponse) {
  const status = errResponse.status;

  if (status === 500) {
    errorToast("Server error has occured, try again later");
  }
  else if (status === 404) {
    errorToast("Couldn't find requested coupon");
  }
  else {
    errorToast(resolveErrorMessage(errResponse.data.detail));
  }
}

function resolveErrorMessage(serverMsg) {
  return `Unable to delete coupon, ${serverMsg}`;
}

export default useDeleteRequest;
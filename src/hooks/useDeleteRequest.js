import { errorToast, successToast } from "../toast/toast";
import usePrivateRequest from "./usePrivateRequest";

const useDeleteRequest = () => {
  const deleteRequest = usePrivateRequest(
    "/company/delete",
    "delete",
    __ => successToast("Coupon deleted :)"),
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
  //TODO - modify this to match delete errors

  let msg = "Unable to complete purchase, ";

  if (serverMsg.includes("amount")) {
    msg += "coupon is out of stock";
  }
  else if (serverMsg.includes("customer")) {
    msg += "you already own this coupon"
  }
  return msg;
}

export default useDeleteRequest;
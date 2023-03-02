import usePrivateRequest from "./usePrivateRequest";
import { errorToast, successToast } from "../toast/toast";

const useBuyRequest = () => {
  const buyRequest = usePrivateRequest(
    "/customer/purchase",
    "post",
    __ => successToast("Coupon purchased :) refresh the page to see changes"),
    handleError,
  )
  return buyRequest;
}

function handleError(err) {
  if (err.response) {
    handleServerError(err.response);
  } else {
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
  let msg = "Unable to complete purchase, ";

  if (serverMsg.includes("amount")) {
    msg += "coupon is out of stock";
  }
  else if (serverMsg.includes("customer")) {
    msg += "you already own this coupon"
  }
  return msg;
}

export default useBuyRequest;
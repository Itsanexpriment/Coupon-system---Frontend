import { useEffect, useRef, useState } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import EditForm from "../EditForm/EditForm";
import EditInput from "../EditForm/EditInput";
import { errorToast, successToast } from "../../toast/toast";
import handleGenericError from "../../utils/handleGenericError";

const CustomerProfile = () => {
  const [userDetails, setUserDetails] = useState(null);

  const getUserInfo = usePrivateGet(
    "/customer",
    (res) => setUserDetails(res.data),
    handleGenericError
  );
  const postUserInfo = usePrivateRequest(
    "/customer/update",
    "put",
    (__) => successToast("Changes saved :)"),
    handleError
  );

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => { getUserInfo() }, []);
  useEffect(() => {
    if (userDetails) {
      firstNameRef.current = userDetails.firstName;
      lastNameRef.current = userDetails.lastName;
      emailRef.current = userDetails.email;
      passwordRef.current = "";
    }
  }, [userDetails])

  const handleSave = () => {
    const data = {
      uuid: userDetails.uuid,
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
      email: emailRef.current,
      password: passwordRef.current
    }
    postUserInfo(data);
  }

  return (
    <>
      {userDetails &&
        <EditForm onSave={handleSave}>
          <EditInput inputName="First Name" defaultValue={userDetails.firstName} myRef={firstNameRef} />
          <EditInput inputName="Last Name" defaultValue={userDetails.lastName} myRef={lastNameRef} />
          <EditInput inputName="Email" defaultValue={userDetails.email} myRef={emailRef} />
          <EditInput inputName="Edit password" placeholder="Enter new password" myRef={passwordRef} type="password" />
        </EditForm>
      }
    </>
  );
}

function handleError(err) {
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

  if (status === 400) {
    const errorDetails = response.data.detail;
    if (errorDetails.includes("Email")) {
      errorMsg = "Can't update email - the address is already taken";
    } else if (errorDetails.includes("password")) {
      errorMsg = "Password must be at least 8 characters and have at least one upper and lowercase letters and one digit";
    }
  }

  errorToast(errorMsg ? errorMsg : "Something went wrong, try again later");
}

export default CustomerProfile;
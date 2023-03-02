import { useEffect, useState, useRef } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import EditForm from "../EditForm/EditForm";
import EditInput from "../EditForm/EditInput";
import { errorToast, successToast } from "../../toast/toast";
import handleGenericError from "../../utils/handleGenericError";

const CompanyProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const getUserInfo = usePrivateGet(
    "/company",
    (res) => setUserDetails(res.data),
    handleGenericError
  );

  const postUserInfo = usePrivateRequest(
    "/company/update",
    "put",
    (__) => successToast("Changes saved :)"),
    handleError
  );

  const companyNameRef = useRef()
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => { getUserInfo() }, []);
  useEffect(() => {
    if (userDetails) {
      companyNameRef.current = userDetails.name;
      emailRef.current = userDetails.email;
      passwordRef.current = "";
    }
  }, [userDetails])

  const handleSave = () => {
    const data = {
      uuid: userDetails.uuid,
      name: companyNameRef.current,
      email: emailRef.current,
      password: passwordRef.current
    }
    postUserInfo(data);
  }

  return (
    <>
      {userDetails &&
        <EditForm onSave={handleSave}>
          <EditInput inputName="Company Name" defaultValue={userDetails.name} myRef={companyNameRef} />
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
    }
    else if (errorDetails.includes("Name")) {
      errorMsg = "Can't update name - the address is already taken";
    }
    else if (errorDetails.includes("password")) {
      errorMsg = "Password must be at least 8 characters and have at least one upper and lowercase letters and one digit";
    }
  }

  errorToast(errorMsg ? errorMsg : "Something went wrong, try again later");
}

export default CompanyProfile;
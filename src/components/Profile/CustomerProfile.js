import { useEffect, useRef, useState } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import EditForm from "../EditForm/EditForm";
import EditInput from "../EditForm/EditInput";
import { errorToast, successToast } from "../../toast/toast";

const CustomerProfile = () => {

  const [userDetails, setUserDetails] = useState(null);
  const getUserInfo = usePrivateGet(
    "/customer",
    (res) => setUserDetails(res.data),
    (err) => console.error(err)
  );
  const postUserInfo = usePrivateRequest(
    "/customer/update",
    "put",
    (__) => successToast("Changes saved :)"),
    (err) => {
      if (err?.response?.status === 400) {
        errorToast(err.response.data.detail); // TODO change me
      }
    }
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

    console.log(data);
    postUserInfo(data);
  }

  return (<>
    {userDetails &&
      <EditForm onSave={handleSave}>
        <EditInput inputName="First Name" defaultValue={userDetails.firstName} myRef={firstNameRef} />
        <EditInput inputName="Last Name" defaultValue={userDetails.lastName} myRef={lastNameRef} />
        <EditInput inputName="Email" defaultValue={userDetails.email} myRef={emailRef} />
        <EditInput inputName="Edit password" placeholder="Enter new password" myRef={passwordRef} type="password" />
      </EditForm>}
  </>
  );
}

export default CustomerProfile;
import { useEffect, useState, useRef } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import EditForm from "../EditForm/EditForm";
import EditInput from "../EditForm/EditInput";
import { errorToast, successToast } from "../../toast/toast";

const CompanyProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const getUserInfo = usePrivateGet(
    "/company",
    (res) => setUserDetails(res.data),
    (err) => console.error(err) // TODO - toast me baby
  );

  const postUserInfo = usePrivateRequest(
    "/company/update",
    "put",
    (__) => successToast("Changes saved :)"),
    (err) => {
      if (err?.response?.status === 400) {
        const serverMsg = err.response.data.detail;
        let toastMsg = "";
        if (serverMsg.includes("Email")) {
          toastMsg = "Can't update email - the address is already taken";
        } else if (serverMsg.includes("Name")) {
          toastMsg = "Can't update name - the address is already taken";
        }
        errorToast(toastMsg);
      }
    }
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

  return (<>
    {userDetails &&
      <EditForm onSave={handleSave}>
        <EditInput inputName="Company Name" defaultValue={userDetails.name} myRef={companyNameRef} />
        <EditInput inputName="Email" defaultValue={userDetails.email} myRef={emailRef} />
        <EditInput inputName="Edit password" placeholder="Enter new password" myRef={passwordRef} type="password" />
      </EditForm>}
  </>
  );
}

export default CompanyProfile;
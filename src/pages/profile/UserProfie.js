import { useSelector } from "react-redux";
import CompanyProfile from "../../components/Profile/CompanyProfile";
import CustomerProfile from "../../components/Profile/CustomerProfile";

const UserProfile = () => {
  const user = useSelector(state => state.user);
  const userType = user?.type

  return (
    userType === "company" ?
      <CompanyProfile /> :
      <CustomerProfile />);
}

export default UserProfile;
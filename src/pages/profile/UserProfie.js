import { useSelector } from "react-redux";
import CompanyProfile from "../../components/Profile/CompanyProfile";
import CustomerProfile from "../../components/Profile/CustomerProfile";
import NotFound from "../not-found/NotFound";
import { CUSTOMER, COMPANY } from "../../utils/constants";

const UserProfile = () => {
  const userType = useSelector(state => state.user.type);

  return (
    userType === COMPANY ? <CompanyProfile />
      : userType == CUSTOMER ? <CustomerProfile />
        : <NotFound />);
}

export default UserProfile;
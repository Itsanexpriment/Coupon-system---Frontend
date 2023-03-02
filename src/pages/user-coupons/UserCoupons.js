import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import usePrivateGet from '../../hooks/usePrivateGet';
import CardItemList from '../../components/CardItemList/CardItemList';
import handleGenericError from '../../utils/handleGenericError';
import { CUSTOMER, COMPANY } from '../../utils/constants';

const UserCoupons = () => {
  const [data, setData] = useState(null);
  const userType = useSelector(state => state.user.type)

  let urlPath = "";

  if (userType === CUSTOMER) {
    urlPath = "/customer/all/purchased";
  } else if (userType === COMPANY) {
    urlPath = "/company/all";
  }

  const fetchCoupons = usePrivateGet(
    urlPath,
    res => setData(res.data),
    handleGenericError
  )
  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Coupons</h1>
      <CardItemList data={data} enableDelete={userType === COMPANY} />
    </>
  );
}

export default UserCoupons;
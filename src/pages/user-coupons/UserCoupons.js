import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import usePrivateGet from '../../hooks/usePrivateGet';
import { errorToast } from '../../toast/toast';
import CardItemList from '../../components/CardItemList/CardItemList';

const UserCoupons = () => {
  const [data, setData] = useState(null);
  const user = useSelector(state => state.user)

  let urlPath = "";

  if (user.type === "customer") {
    urlPath = "/customer/all/purchased";
  } else if (user.type === "company") {
    urlPath = "/company/all";
  }

  const fetchCoupons = usePrivateGet(
    urlPath,
    res => setData(res.data),
    __ => errorToast("Unable to contact server") // TODO - expand
  )
  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Coupons</h1>
      <CardItemList data={data} />
    </>
  );
}

export default UserCoupons;
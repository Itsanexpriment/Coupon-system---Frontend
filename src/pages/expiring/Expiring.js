import { useState, useEffect } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import CardItemList from "../../components/CardItemList/CardItemList";
import handleGenericError from "../../utils/handleGenericError";

const Expiring = () => {
  const [data, setData] = useState(null);

  const fetchCoupons = usePrivateGet(
    "customer/all/purchased/one-week-from-expiry",
    res => setData(res.data),
    handleGenericError)

  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Hurry up and redeem us!</h1>
      <CardItemList data={data} />
    </>
  )
}

export default Expiring;
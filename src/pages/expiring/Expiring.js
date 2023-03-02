import { useState, useEffect } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import CardItemList from "../../components/CardItemList/CardItemList";
import { errorToast } from "../../toast/toast";

const Expiring = () => {
  const [data, setData] = useState(null);

  const fetchCoupons = usePrivateGet(
    "customer/all/purchased/one-week-from-expiry",
    res => setData(res.data),
    __ => errorToast("Unable to contact server") // TODO - expand
  )
  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Expiring soon</h1>
      <CardItemList data={data} />
    </>
  )
}
 
export default Expiring;
import { useState, useEffect } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import CardItemList from "../../components/CardItemList/CardItemList";
import { errorToast } from "../../toast/toast";

const Shop = () => {
  const [data, setData] = useState(null);

  const fetchCoupons = usePrivateGet(
    "/customer/all/not-purchased",
    res => setData(res.data),
    __ => errorToast("Unable to contact server") // TODO - expand
  )
  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Don't think, just buy</h1>
      <CardItemList data={data} enableBuy />
    </>
  );
}

export default Shop;
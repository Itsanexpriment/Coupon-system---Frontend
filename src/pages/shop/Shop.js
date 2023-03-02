import { useState, useEffect } from "react";
import usePrivateGet from "../../hooks/usePrivateGet";
import CardItemList from "../../components/CardItemList/CardItemList";
import handleGenericError from "../../utils/handleGenericError";

const Shop = () => {
  const [data, setData] = useState(null);

  const fetchCoupons = usePrivateGet(
    "/customer/all/not-purchased",
    res => setData(res.data),
    handleGenericError
  )
  useEffect(() => { fetchCoupons() }, [])

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Don't think, just buy</h1>
      <CardItemList data={data} enableBuy/>
    </>
  );
}

export default Shop;
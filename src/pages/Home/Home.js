import { useState, useEffect } from 'react';
import CardItem from '../../components/CardItem/CardItem';
import './Home.css';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';

const Home = () => {
  const { data, isLoading, error } = useFetch("/home/featured");
  const [coupons, setCoupons] = useState([]);

  const user = useSelector(state => state.user);

  const handleOnBuy = () => {
    console.log(user.type);
  }

  useEffect(() => {
    if (data) {
      const couponCardItems = data.map((c) =>
        <CardItem
          key={c.uuid}
          name={c.title}
          description={c.description}
          price={c.price}
          imageUrl={c.imageUrl}
          handleOnBuy={handleOnBuy}
        />
      )
      setCoupons(couponCardItems);
    }
  }, [data]);

  return (
    <div className="Home">
      <h1 className="home-title">Happy Browsing</h1>
      {coupons}
    </div>
  );
}

export default Home;
import { useSpinDelay } from 'spin-delay';
import { InfinitySpin } from 'react-loader-spinner';
import './Home.css';
import useFetch from '../../hooks/useFetch';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CardItemList from '../../components/CardItemList/CardItemList';
import { errorToast } from '../../toast/toast';

const Home = () => {
  const { data, isLoading, error } = useFetch("/home/featured");
  const showSpinner = useSpinDelay(isLoading, { delay: 1000, minDuration: 400 });

  if (showSpinner) {
    return (<div className="loading-spinner">
      <InfinitySpin
        width='300'
        color="#4fa94d"
      />
    </div>)
  }

  if (error) {
    errorToast("Unable to contact server, try again later");
  }

  return (
    <div className="Home">
      {data &&
        <>
          <h1 className="home-title">This week's most popular coupons: </h1>
          <CardItemList data={data} />
        </>
      }
    </div>
  );
}

export default Home;
import { confirmAlert } from 'react-confirm-alert';
import './BuyButton.css'

const BuyButton = ({ couponUuid, price, handleOnBuy, alert }) => {
  const handleOnBuyWrapper = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Would you like to complete the purchase?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { handleOnBuy(undefined, { coupon: couponUuid }) }
        },
        {
          label: 'No'
        }
      ]
    });
  }

  return (
    <div className="purchase-container">
      <button className="purchase-btn" onClick={handleOnBuyWrapper}>
        <span className="price">{"$" + price}</span>
        <span className="buy">Buy now</span>
      </button>
    </div>
  );
}
export default BuyButton;
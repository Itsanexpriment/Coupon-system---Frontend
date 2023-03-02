import BuyButton from '../buttons/BuyButton/BuyButton';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import './CardItem.css'

const CardItem = ({ coupon,
  enableBuy,
  handleOnBuy,
  enableDelete,
  handleOnDelete,
  alwaysShowMoreInfo = false,
}) => {

  let buttonComponent;

  if (enableBuy) {
    buttonComponent =
      <BuyButton
        couponUuid={coupon.uuid}
        price={coupon.price}
        handleOnBuy={handleOnBuy}
      />
  } else if (enableDelete) {
    buttonComponent =
      <DeleteButton
        couponUuid={coupon.uuid}
        handleOnDelete={handleOnDelete}
      />
  }

  const formatDate = (str) => {
    return str.split("-").reverse().join("/");
  }

  return (
    <>
      <div className="card-container">
        <div className="product-details">
          <h1>{coupon.title}</h1>
          <p className="card-description">{coupon.description}</p>
          {buttonComponent}
        </div>
        <div className="product-image">
          <img src={coupon.imageUrl} alt="" />
          <div className={"info" + (alwaysShowMoreInfo ? " force-show" : "")}>
            <h2>More info:</h2>
            <ul className="info-list">
              <li><strong>Company: </strong>{coupon.company.name}</li>
              <li><strong>Category: </strong>{coupon.category}</li>
              <li><strong>Start Date: </strong>{formatDate(coupon.startDate)}</li>
              <li><strong>End Date: </strong>{formatDate(coupon.endDate)}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardItem;
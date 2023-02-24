import './CardItem.css'
import placeHolderImg from '../../assets/placeholder.jpeg'
import { useSelector } from 'react-redux';

const CardItem = ({ name, company, description, price, expiration, imageUrl, handleOnBuy }) => {
  const user = useSelector(state => state.user);


  return (<>
    <div className="card-container">
      <div className="product-details">
        <h1>{name}</h1>
        <p className="card-description">{description}</p>
        <div className="purchase-container">
          <button className="purchase-btn" onClick={handleOnBuy}>
            <span className="price">{"$" + price}</span>
            <span className="buy">Buy now</span>
          </button>
        </div>
      </div>
      <div className="product-image">
        <img src={imageUrl} />
        <div className="info">
          <h2> Description</h2>
          <ul>
            <li><strong>Height : </strong>5 Ft </li>
            <li><strong>Shade : </strong>Olive green</li>
            <li><strong>Decoration: </strong>balls and bells</li>
            <li><strong>Material: </strong>Eco-Friendly</li>
          </ul>
        </div>
      </div>
    </div>
  </>
  );
}

export default CardItem;
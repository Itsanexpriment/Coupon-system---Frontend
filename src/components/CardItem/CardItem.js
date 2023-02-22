import './CardItem.css'
import placeHolderImg from '../../assets/placeholder.jpeg'

const CardItem = ({name, company, description, price, expiration, imageUrl}) => {

  return (<>
    <div className="card-container">
      <div className="product-details">
        <h1>CHRISTMAS TREE</h1>
        <p className="card-description">" Let's spread the joy , here is Christmas , the most awaited day of the year.Christmas Tree is what one need the most. Here is the correct tree which will enhance your Christmas.</p>
        <div className="purchase-container">
          <button className="purchase-btn">
            <span className="price">$250</span>
            <span className="buy">Buy now</span>
          </button>
        </div>
      </div>
      <div className="product-image">
        <img src={placeHolderImg} alt="name"/>
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
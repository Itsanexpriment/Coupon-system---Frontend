import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="NotFound">
      <article style={{ padding: "100px", textAlign:"center" }}>
        <h1 >Oops!</h1>
        <p className="not-found-text">Page Not Found</p>
        <Link className="redirect-link" to="/" >Visit Our Homepage</Link>
      </article>
    </div>
  )
}

export default NotFound;

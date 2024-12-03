export default function Product_grid(props) {
  return (
    <li className="product-grid item">
      <a href="~" className="product-link">
        <div className="product-imgbox">
          <img className="product-image" src={props.imageUrl} />
        </div>
        <div className="product-info">
          <span>{props.title}</span><br/>
          <span>{props.date}</span>
        </div>
      </a>
    </li>
  );
}

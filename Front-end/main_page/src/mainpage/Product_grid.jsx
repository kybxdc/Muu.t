import "./Product_grid.css"

export default function Product_grid({ musical_title, musical_image, musical_start_date, musical_end_date }) {
  return (
      <a href="~" className="product-link">
        <div className="product-imgbox">
          <img className="product-image" src={musical_image} />
        </div>
        <div className="product-info">
          <span>{musical_title}</span><br/>
          <span>{musical_start_date}~{musical_end_date}</span>
        </div>
      </a>
  );
}

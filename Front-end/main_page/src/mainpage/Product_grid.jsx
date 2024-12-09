import styles from "./Product_grid.module.css";

export default function Product_grid({ musical_title, musical_image, musical_start_date, musical_end_date }) {
  return (
      <a href="~" className={styles.product_link}>
        <div className={styles.product_imgbox}>
          <img className={styles.product_image} src={musical_image} />
        </div>
        <div className={styles.product_imgbox}>
          <span>{musical_title}</span><br/>
          <span>{musical_start_date}~{musical_end_date}</span>
        </div>
      </a>
  );
}

import styles from "./ProductInfoDetail.module.css";

export default function ProductInfoDetail({musical}) {
  return (
    <>
      <div className={styles.product_img_box}>
        <img className={styles.product_image} src={musical.musical_image} />
      </div>
      <div className={styles.product_info_detail}>
        <div className={styles.product_title_box}>
          <h1 className={styles.product_title}>{musical.musical_title}</h1>
        </div>
        <div className={styles.product_description}>
          <ul className={styles.product_desc_list_1}>
            <li className={styles.product_desc_list_item}>
              <span className={styles.product_list_col}>장소</span>
              <div className={styles.product_list_element}>
                {musical.hall_name_tem}
              </div>
            </li>
            <li className={styles.product_desc_list_item}>
              <span className={styles.product_list_col}>관람시간</span>
              <div className={styles.product_list_element}>
                {musical.musical_run_time}
              </div>
            </li>
            <li className={styles.product_desc_list_item}>
              <span className={styles.product_list_col}>기간</span>
              <div className={styles.product_list_element}>
                {musical.musical_start_date}~{musical.musical_end_date}
              </div>
            </li>
            <li className={styles.product_desc_list_item}>
              <span className={styles.product_list_col}>관람등급</span>
              <div className={styles.product_list_element}>
                {musical.musical_age}
              </div>
            </li>
          </ul>
          <ul className={styles.product_desc_list_2}>
            <li className={styles.product_desc_list_item}>
              <span className={styles.product_list_col}>가격</span>
              <div className={styles.product_list_element}>
                {musical.musical_seat_grade_info}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

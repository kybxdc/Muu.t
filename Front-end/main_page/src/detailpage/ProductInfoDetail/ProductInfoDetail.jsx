import styles from "./ProductInfoDetail.module.css";

export default function ProductInfoDetail({ musical }) {
  // String 값을 배열로 변환하는 함수
  const parseSeatGradeInfo = (seatGradeInfo) => {
    if (!seatGradeInfo) return [];
    const pattern = /(\S+석)\s(\d{1,3}(?:,\d{3})*원)/g;
    const result = [];
    let match;

    while ((match = pattern.exec(seatGradeInfo)) !== null) {
      const [_, type, price] = match;
      result.push({ type, price });
    }

    return result;
  };

  // musical_seat_grade_info를 파싱
  const seatGradeList = parseSeatGradeInfo(musical.musical_seat_grade_info);

  const detailsList = [
    { label: "장소", value: musical.hall_name },
    { label: "관람시간", value: musical.musical_run_time },
    {
      label: "기간",
      value: `${musical.musical_start_date} ~ ${musical.musical_end_date}`,
    },
    { label: "관람등급", value: musical.musical_age },
    { label: "가격", value: seatGradeList }, // 변환된 데이터 사용
  ];

  return (
    <>
      <div className={styles.product_img_box}>
        <img className={styles.product_image} src={musical.musical_image} alt={musical.musical_title} />
      </div>
      <div className={styles.product_info_detail}>
        <div className={styles.product_title_box}>
          <h1 className={styles.product_title}>{musical.musical_title}</h1>
        </div>
        <div className={styles.product_description}>
          <ul className={styles.product_desc_list}>
            {detailsList.map((detail, index) => (
              <li className={styles.product_desc_list_item} key={index}>
                <span className={styles.product_list_col}>{detail.label}</span>
                <div className={styles.product_list_element}>
                  {Array.isArray(detail.value) ? (
                    <>
                      {detail.value.map((seat, idx) => (
                        <div key={idx} className={styles.product_price_element} >
                          {seat.type}: {seat.price}
                        </div>
                      ))}
                    </>
                  ) : (
                    detail.value
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

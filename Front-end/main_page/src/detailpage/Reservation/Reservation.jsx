import styles from "./Reservation.module.css";

export default function Reservation() {
  return (
    <div className={styles.reserve_tab}>
      <div className={styles.reserve_date}>
        <h3 className={styles.reserve_head}>관람일</h3>
        <div className={styles.reserve_calendar}></div>
      </div>
      <div className={styles.reserve_time}>
        <h3 className={styles.reserve_head}>회차</h3>
        <div className={styles.reserve_calendar}></div>
      </div>
      <div className={styles.reserve_seat}>
        <h3 className={styles.reserve_head}>예매가능좌석</h3>
        <div className={styles.reserve_calendar}></div>
      </div>
    </div>
  );
}

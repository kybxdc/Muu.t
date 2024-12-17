import styles from "./Reservation.module.css";

export default function Reservation() {
  return (
    <div className={styles.reserve_tab}>
      <div className={styles.reserve_date}>
        <h3 className={styles.reserve_head}>관람일</h3>
        <div className={styles.reserve_calendar_box}>
          <div className={styles.reserve_calendar}>달력이 들어갈 자리...</div>
        </div>
      </div>
      <div className={styles.reserve_time}>
        <h3 className={styles.reserve_head}>회차</h3>
        <div className={styles.reserve_time_tem}>
        <div className={styles.reserve_calendar}>회차 선택이 들어갈 자리...</div>
        </div>
      </div>
      <div className={styles.reserve_seat}>
        <h3 className={styles.reserve_head}>예매가능좌석</h3>
        <div className={styles.reserve_seat_tem}>
        <div className={styles.reserve_calendar}>예매가능좌석이 들어갈 자리...</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import BookingCalendar from "./BookingCalendar/BookingCalendar";
import BookingTime from "./BookingTime/BookingTime";
import BookingSeat from "./BookingSeat/BookingSeat";
import styles from "./Reservation.module.css";

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={styles.reserve_tab}>
      <div className={styles.reserve_date}>
        <h3 className={styles.reserve_head}>관람일</h3>
        <div className={styles.reserve_calendar_box}>
          <BookingCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
      </div>
      <div className={styles.reserve_time}>
        <h3 className={styles.reserve_head}>회차</h3>
        <div className={styles.reserve_time_tem}>
          {/* 선택된 날짜 전달 */}
          <BookingTime selectedDate={selectedDate} />
        </div>
      </div>
      <div className={styles.reserve_seat}>
        <h3 className={styles.reserve_head}>예매가능좌석</h3>
        <div className={styles.reserve_seat_tem}>
          <BookingSeat />
        </div>
      </div>
    </div>
  );
}

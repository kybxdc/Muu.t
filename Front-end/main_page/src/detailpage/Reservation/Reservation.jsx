import { useState, useEffect } from "react";
import BookingCalendar from "./BookingCalendar/BookingCalendar";
import BookingTime from "./BookingTime/BookingTime";
import BookingSeat from "./BookingSeat/BookingSeat";
import styles from "./Reservation.module.css";
import axios from "axios";

export default function Reservation({ musical }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [performances, setPerformances] = useState([]);
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(null); // 선택된 Performance ID

  useEffect(() => {
    if (selectedDate && musical) {
      const requestData = {
        date: selectedDate,
        musicalId: musical.id,
      };

      axios
        .post("http://localhost:9090/setPerformance/BookingTime", requestData)
        .then((response) => {
          setPerformances(response.data); // 받아온 Performance 데이터 설정
        })
        .catch((error) => {
          console.error("Error fetching performance data:", error);
        });
    }
  }, [selectedDate, musical]);

  return (
    <div className={styles.reserve_tab}>
      <div className={styles.reserve_date}>
        <h3 className={styles.reserve_head}>관람일</h3>
        <div className={styles.reserve_calendar_box}>
          <BookingCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            musical={musical}
          />
        </div>
      </div>
      <div className={styles.reserve_time}>
        <h3 className={styles.reserve_head}>회차</h3>
        <div className={styles.reserve_time_tem}>
          <BookingTime
            selectedDate={selectedDate}
            performances={performances}
            onPerformanceSelect={setSelectedPerformanceId} // 선택 이벤트 핸들러 전달
          />
        </div>
      </div>
      <div className={styles.reserve_seat}>
        <h3 className={styles.reserve_head}>예매가능좌석</h3>
        <div className={styles.reserve_seat_tem}>
          <BookingSeat performanceId={selectedPerformanceId} />
        </div>
      </div>
    </div>
  );
}

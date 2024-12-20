import { useState, useEffect } from "react";
import BookingCalendar from "./BookingCalendar/BookingCalendar";
import BookingTime from "./BookingTime/BookingTime";
import BookingSeat from "./BookingSeat/BookingSeat";
import styles from "./Reservation.module.css";
import axios from "axios";

export default function Reservation(props) {
  const [remainSeatCount, setRemainSeatCount] = useState(null);

  useEffect(() => {
    const fetchSeatsCount = async () => {
      if (!props.selectedPerformanceId) return; // Performance ID가 없으면 종료
      console.log("props.selectedPerformanceId == ", props.selectedPerformanceId);
  
      try {
        const response = await fetch(
          `/api/seat/getseatposition/grade/${props.selectedPerformanceId}`
        );
        const response2 = await fetch(
          `/api/reserve/sold/${props.selectedPerformanceId}`
        );
  
        const result = await response.json();
        const result2 = await response2.json();
        let array = result2.map((seat) => seat.id);
        setRemainSeatCount(result.length - array.length);
        console.log("Remaining seats1:", result.length);
        console.log("Remaining seats2:", array.length);
        console.log("Remaining seats:", result.length - array.length);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };
  
    fetchSeatsCount();
  }, [props.selectedPerformanceId]); // selectedPerformanceId가 변경될 때 호출
  

  return (
    <div className={styles.reserve_tab}>
      <div className={styles.reserve_date}>
        <h3 className={styles.reserve_head}>관람일</h3>
        <div className={styles.reserve_calendar_box}>
          <BookingCalendar
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
            musical={props.musical}
            performances={props.performances}
          />
        </div>
      </div>
      <div className={styles.reserve_time}>
        <h3 className={styles.reserve_head}>회차</h3>
        <div className={styles.reserve_time_tem}>
          <BookingTime
            // selectedDate={selectedDate}
            performances={props.performances}
            onPerformanceSelect={props.setSelectedPerformanceId} // 선택 이벤트 핸들러 전달
          />
        </div>
      </div>
      <div className={styles.reserve_seat}>
        <h3 className={styles.reserve_head}>예매가능좌석</h3>
        <div className={styles.reserve_seat_tem}>
          <BookingSeat
            performanceId={props.selectedPerformanceId}
            remainSeatCount={remainSeatCount}
          />
        </div>
      </div>
    </div>
  );
}

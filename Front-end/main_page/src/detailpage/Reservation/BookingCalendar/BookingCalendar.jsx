import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingCalendar.module.css";

export default function BookingCalendar({ selectedDate, setSelectedDate, musical }) {
  return (
    <div>
      <DatePicker
        className={styles.customWrapper}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline // 달력을 항상 표시
        minDate={new Date()} // 오늘 이후의 날짜만 선택 가능
      />
    </div>
  );
}

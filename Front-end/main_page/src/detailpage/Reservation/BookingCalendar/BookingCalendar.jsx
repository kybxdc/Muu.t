import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingCalendar.module.css";

export default function BookingCalendar({ selectedDate, setSelectedDate, musical, performances }) {

  return (
    <div>
      <DatePicker
        locale={ko}
        className={styles.customWrapper}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        minDate={new Date()}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.header}>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={styles.button}
            >
              {"<"}
            </button>
            <span className={styles.text}>
              {date.getFullYear()}년 {date.toLocaleString("default", { month: "long" })}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={styles.button}
            >
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
}

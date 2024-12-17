import styles from "./BookingTime.module.css";

export default function BookingTime({ selectedDate }) {
  return (
    <div>
      <h4>선택된 날짜: {selectedDate ? selectedDate.toLocaleDateString() : "날짜를 선택해주세요"}</h4>
    </div>
  );
}

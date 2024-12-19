import styles from "./BookingTime.module.css";

export default function BookingTime({ selectedDate, performances, onPerformanceSelect }) {
  return (
    <div>
      {performances && performances.length > 0 ? (
        performances.map((performance, index) => (
          <div
            key={index}
            className={styles.performance_start_time}
            onClick={() => onPerformanceSelect(performance.performance_id)} // 선택된 Performance ID 전달
            style={{ cursor: "pointer" }} // 클릭 가능한 UI 표시
          >
            {performance.performance_start_time}
          </div>
        ))
      ) : (
        <p>해당 날짜에 공연이 없습니다.</p>
      )}
    </div>
  );
}

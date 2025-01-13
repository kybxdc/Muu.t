import { useState, useEffect } from "react";

import styles from "./BookingTime.module.css";

export default function BookingTime({ performances, onPerformanceSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 배너의 인덱스
  
  useEffect(() => {
    if (performances.length > 0) {
      onPerformanceSelect(performances[0]?.performance_id); // 기본 회차 설정
    }
  }, [performances]);

  const handleSlideChange = (index) => {
    setCurrentIndex(index); // 인덱스 변경
  };

  return (
    <div className={styles.performance_start_time_dox}>
      {performances && performances.length > 0 ? (
        performances.map((performance, index) => (
          <div
            key={index}
            className={`${styles.performance_start_time} ${
                          currentIndex === index ? styles.active : ""
                        }`}
            onClick={() => {onPerformanceSelect(performance.performance_id), handleSlideChange(index)}} // 선택된 Performance ID 전달
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

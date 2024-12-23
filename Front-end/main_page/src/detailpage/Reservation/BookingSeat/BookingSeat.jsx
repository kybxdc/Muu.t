import styles from "./BookingSeat.module.css";

export default function BookingSeat({ performanceId, remainSeatCount }) {
  return (
    <div className={styles.remainSeatCount}>
      <div className={styles.remainSeatCount_info}>
        <p className={styles.remainSeatCount_info_title}>잔여좌석</p>
        <p>{remainSeatCount}석</p>
      </div>
      <button
        className={`${styles.reserve_button} ${
          remainSeatCount === 0 ? styles.disabled_button : ""
        }`}
        onClick={() => {
          if (remainSeatCount !== 0) {
            window.open(
              `/reservation/${performanceId}/seatview`,
              "팝업창", // 팝업 이름
              "width=2000,height=1000,scrollbars=yes,resizable=yes"
            );
          }
        }}
        disabled={false} // 0일 경우 버튼 비활성화
      >
        예매하기
      </button>
    </div>
  );
}

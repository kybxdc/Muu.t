import styles from "./SidePopup.module.css";

export default function SidePopup() {
  return (
    <div className={styles.side_popup_wrap}>
      <h3>이벤트</h3>
      <div className={styles.side_popup_content}>
        <ul>
          <li>1111</li>
          <li>1111</li>
          <li>1111</li>
        </ul>
      </div>
      <div className={styles.side_popup_footer}></div>
    </div>
  );
}

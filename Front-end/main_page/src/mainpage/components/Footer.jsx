import styles from "./Footer.module.css"
export default function Footer() {
  return (
    <footer className={[styles.mainpage, styles.footer].join(" ")}>
      <div className={[styles.mainpage, styles.footer_info].join(" ")}>
        <p>회사 정보 | 개인정보 처리방침 | 고객센터</p>
        <p>연락처: 1234-5678</p>
      </div>
    </footer>
  );
}

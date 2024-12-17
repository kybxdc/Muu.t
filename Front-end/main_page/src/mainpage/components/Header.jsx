import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import Login from "../../login/Login";
import {handleLogout} from "../../login/Logout.jsx";
import Join from "../../login/Join.jsx";

import styles from "./Header.module.css";

export default function Header({userInfo}) {
  // 로그인 modal 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  // 회원가입 modal 상태
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const navigate = useNavigate();
  const toMainpage = () => {
    // 새로고침 x
    // navigate("/");

    // 새로고침 o
    window.location.href = "/";
  };

  if (!userInfo) {
    return (
      <header
        className={[styles.mainpage, styles.header, styles.width_limit].join(" ")}
      >
        <div className={styles.header_innner}>
          <div className={styles.logo} onClick={toMainpage}>
            <img className={styles.logo_image} src="../src/img/Muut_logo_v2.png" />
          </div>
          <div className={styles.top_left}>
            <button className={styles.top_left_buttons} onClick={openLoginModal}>
              로그인
            </button>
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Login />
            </Modal>
            <button className={styles.top_left_buttons} onClick={openJoinModal}>
              회원가입
            </button>
            <Modal isOpen={isJoinModalOpen} onClose={closeJoinModal}>
              <Join />
            </Modal>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={[styles.mainpage, styles.header, styles.width_limit].join(" ")}
    >
      <div className={styles.header_innner}>
        <div className={styles.logo} onClick={toMainpage}>
          <img className={styles.logo_image} src="../src/img/Muut_logo_v2.png" />
        </div>
        <div className={styles.top_left}>
          <p>{userInfo.customer_id}</p>
          <Link to="/mypage" state={{userInfo}}>
            <button className={styles.top_left_buttons} >
              마이페이지
            </button>
          </Link>
          <button className={styles.top_left_buttons} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

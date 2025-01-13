import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import Login from "../../login/Login";
import {handleLogout} from "../../login/Logout.jsx";
import Join from "../../login/Join.jsx";

import styles from "./Header.module.css";

import Cookies from "js-cookie";


// export default function Header({userInfo}) {
export default function Header() {
  // 로그인 modal 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  // 회원가입 modal 상태
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 쿠키 값을 가져옴
    const id = Cookies.get("customer_id");
    setUserId(id);

    // 쿠키 값이 변경되었을 때 자동 업데이트
    const checkCookie = setInterval(() => {
      const updatedId = Cookies.get("customer_id");
      if (updatedId !== userId) setUserId(updatedId);
    }, 1000);

    return () => clearInterval(checkCookie); // 정리
  }, [userId]);

  // 세션에서 사용자 정보 가져오기
  // const userName = sessionStorage.getItem("customer_name");
  
  const navigate = useNavigate();
  const toMainpage = () => {
    // 새로고침 x
    // navigate("/");

    // 새로고침 o
    window.location.href = "/";
  };

  if (!userId) {
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
          <p>{userId}</p>
          <Link to="/mypage" >
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

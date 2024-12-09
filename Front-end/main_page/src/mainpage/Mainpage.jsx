import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./Mainpage.module.css";

import Modal from "./Modal";
import Login from "../login/Login";
import Join from "../login/Join";

import TopBanner from "./TopBanner";
import Product_grid from "./Product_grid";

function Mainpage() {
  // Musical 데이터 상태
  const [musicals, setMusicals] = useState([]); 
  let musicalCount = musicals.length;

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

  useEffect(() => {
    // Musical 데이터 호출
    axios
      .get("http://localhost:9090/api/musicals")
      .then((response) => {
        setMusicals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching musicals!", error);
      });
  }, []);


  return (
    <div className={styles.App}>
      {/* Header */}
      <header className={[styles.mainpage, styles.header, styles.width_limit].join(" ")}>
        <div className={styles.header_innner}>
          <div className={styles.logo} onClick={toMainpage}>
            <img
              className={styles.logo_image}
              src="./src/img/Muut_logo_v2.png"
            />
          </div>
          <div className={styles.top_left}>
            <button className={styles.top_left_buttons} onClick={openLoginModal}>로그인</button>
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Login />
            </Modal>
            <button className={styles.top_left_buttons} onClick={openJoinModal}>회원가입</button>
            <Modal isOpen={isJoinModalOpen} onClose={closeJoinModal}>
              <Join />
            </Modal>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className={[styles.mainpage, styles.main].join(" ")}>
        {musicalCount > 11 && (
          <TopBanner
            title={musicals[11].musical_title}
            imageUrl={musicals[11].musical_image}
            StartDate={musicals[11].musical_start_date}
            EndDate={musicals[11].musical_end_date}
          />
        )}

        <section
          className={[
            styles.main_section,
            styles.width_limit,
            styles.section1,
          ].join(" ")}
        >
          <ul className={styles.product_grid}>
            {musicals.map((musical, index) => (
              <li
                key={index}
                className={[styles.product_grid, styles.item].join(" ")}
              >
                {/* 나중에 상세페이지로 연결 */}
                <Link to="/mypage">
                  <Product_grid {...musical} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className={[styles.mainpage, styles.footer].join(" ")}>
        <div className={[styles.mainpage, styles.footer_info].join(" ")}>
          <p>회사 정보 | 개인정보 처리방침 | 고객센터</p>
          <p>연락처: 1234-5678</p>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;

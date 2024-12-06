import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Mainpage.module.css";

import Modal from "./Modal";
import Login from "../login/Login";
import Join from "../login/Join";


import Product_grid from "./Product_grid";
import TopBanner from "./TopBanner";

function Mainpage() {
  const [musicals, setMusicals] = useState([]); // Musical 데이터 상태

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const openJoinModal = () => setIsJoinModalOpen(true);
  const closeJoinModal = () => setIsJoinModalOpen(false);

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

  let musicalCount = musicals.length;

  return (
    <div className={styles.App}>
      {/* Header */}
      <header
        className={[styles.mainpage, styles.header, styles.width_limit].join(
          " "
        )}
      >
        <div className={styles.header_innner}>
          <div className={styles.logo}>
            <img
              className={styles.logo_image}
              src="./src/img/Muut_logo_v2.png"
            />
          </div>
          <div className={styles.auth_buttons}>
            <button onClick={openLoginModal}>로그인</button>
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Login />
            </Modal>
            <button onClick={openJoinModal}>회원가입</button>
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
                <Product_grid {...musical} />
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

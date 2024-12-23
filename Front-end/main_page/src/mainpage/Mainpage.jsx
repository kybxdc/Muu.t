import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import styles from "./Mainpage.module.css";

// import Modal from "./Modal";
// import Login from "../login/Login";
// import Join from "../login/Join";

import TopBanner from "./components/TopBanner";
import Product_grid from "./Product_grid";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Mainpage() {
  // Musical 데이터 상태
  const [musicals, setMusicals] = useState([]);

  useEffect(() => {
    // Musical 데이터 호출
    axios
      .get("https://muu-t-1.onrender.com/api/musicals")
      .then((response) => {
        setMusicals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching musicals!", error);
      });
  }, []);

  return (
    <>
      <div className={styles.mainpage_wrap}>
        {/* Header */}
        <Header />

        {/* Main */}
        <main className={[styles.mainpage, styles.main].join(" ")}>
          <TopBanner musicals={musicals} />
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
                  <Link
                    to="/detailpage"
                    state={{
                      musical,
                      defaultDate: new Date(), // 오늘 날짜를 기본 관람일로 설정
                      defaultPerformanceId:
                        musical.performances?.[0]?.id || null, // 첫 번째 회차 ID
                    }}
                  >
                    <Product_grid {...musical} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Mainpage;

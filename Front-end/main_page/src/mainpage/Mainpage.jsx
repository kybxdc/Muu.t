import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import styles from "./Mainpage.module.css";

// import Modal from "./Modal";
// import Login from "../login/Login";
// import Join from "../login/Join";

import TopBanner from "./TopBanner";
import Product_grid from "./Product_grid";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Mainpage() {
  // Musical 데이터 상태
  const [musicals, setMusicals] = useState([]); 
  let musicalCount = musicals.length;

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
      <Header />

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
                <Link to="/detailpage" state={{musical}}>
                  <Product_grid {...musical} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Mainpage;

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "./Detailpage.module.css";

// Header, Footer는 mainpage의 것을 가져와 사용함
import Header from "../mainpage/components/Header";
import Footer from "../mainpage/components/Footer";

export default function Detailpage() {
  const location = useLocation();
  const { musical } = location.state || {};
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main */}
      <main
        className={[styles.detail_main, styles.width_limit].join(" ")}
      >
        <section className={styles.product_info}>
          <div className={styles.product_img_box}>
            <img className={styles.product_image} src={musical.musical_image} />
          </div>
          <div className={styles.product_info_detail}>
            <div className={styles.product_title_box}>
                <h1 className={styles.product_title}>{musical.musical_title}</h1>
            </div>
            <div className={styles.product_description}>
                <ul className={styles.product_desc_list_1}>
                    <li className={styles.product_desc_list_item}>
                        <span className={styles.product_list_col}>장소</span>
                        <div className={styles.product_list_element}>{musical.hall_name_tem}</div>
                    </li>
                    <li className={styles.product_desc_list_item}>
                        <span className={styles.product_list_col}>관람시간</span>
                        <div className={styles.product_list_element}>{musical.musical_run_time}</div>
                    </li>
                    <li className={styles.product_desc_list_item}>
                        <span className={styles.product_list_col}>기간</span>
                        <div className={styles.product_list_element}>{musical.musical_start_date}~{musical.musical_end_date}</div>
                    </li>
                    <li className={styles.product_desc_list_item}>
                        <span className={styles.product_list_col}>관람등급</span>
                        <div className={styles.product_list_element}>{musical.musical_age}</div>
                    </li>
                </ul>
                <ul className={styles.product_desc_list_2}>
                    <li className={styles.product_desc_list_item}>
                        <span className={styles.product_list_col}>가격</span>
                        <div className={styles.product_list_element}>{musical.musical_seat_grade_info}</div>
                    </li>
                </ul>
            </div>
          </div>
        </section>

        <hr/>
        <section className={styles.product_reserve}><h1>예약 부분 미완...</h1></section>
        <hr/>
        <section className={styles.product_tab}><h1>탭 부분 미완...</h1></section>
        <hr/>
        <section className={styles.product_content}></section>
        <section className={styles.product_recommend}></section>
        <section className={styles.product_top_summary}></section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

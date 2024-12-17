import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "./Detailpage.module.css";

// Header, Footer는 mainpage의 것을 가져와 사용함
import Header from "../mainpage/components/Header";
import Footer from "../mainpage/components/Footer";

import ProductInfoDetail from "./ProductInfoDetail/ProductInfoDetail";
import TabButton from "./Tabcontent/TabButton";
import InfoImgs from "./Tabcontent/InfoImgs";
import Review from "./Tabcontent/Review";
import Place from "./Tabcontent/Place";
import Reservation from "./Reservation/Reservation";

export default function Detailpage() {
  const location = useLocation();
  const { musical } = location.state || {};

  const [TabSelect, setTabSelect] = useState("InfoImgs");
  const tabs = [
    { id: "InfoImgs", label: "상세정보" },
    { id: "Review", label: "관람후기" },
    { id: "Place", label: "장소정보" },
  ];

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main */}
      <main className={[styles.detail_main, styles.width_limit].join(" ")} >
        <section className={styles.product_info}>
          <ProductInfoDetail musical={musical}/>
        </section>
        <section className={styles.product_reserve}>
          <Reservation />
        </section>
        <section className={styles.product_tab}>
          {tabs.map((tab) => (
            <TabButton key={tab.id} onSelect={() => setTabSelect(tab.id)} isSelected={TabSelect === tab.id} >
              {tab.label}
            </TabButton>
          ))}
        </section>
        <section className={styles.product_content}>
          {TabSelect === "InfoImgs" && <InfoImgs descImgs={musical.musical_description} />}
          {TabSelect === "Review" && <Review />}
          {TabSelect === "Place" && <Place />}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

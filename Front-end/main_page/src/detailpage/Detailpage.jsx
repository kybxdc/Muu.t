import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
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
  const { musical, defaultDate, defaultPerformanceId } = location.state || {};

  const [performances, setPerformances] = useState([]);

  const removeTimeFromDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
    return newDate;
  };

  // 상태 초기화
  const [selectedDate, setSelectedDate] = useState(
    removeTimeFromDate(defaultDate || new Date())
  ); // 전달된 기본값 사용
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(
    defaultPerformanceId || null
  );

  useEffect(() => {
    if (selectedDate && musical) {
      const requestData = {
        date: selectedDate,
        musicalId: musical.id,
      };

      axios
        .post("https://muu-t-1.onrender.com/setPerformance/BookingTime", requestData)
        .then((response) => {
          setPerformances(response.data); // 받아온 Performance 데이터 설정
        })
        .catch((error) => {
          console.error("Error fetching performance data:", error);
        });
    }
  }, [selectedDate, musical]);

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
      <main className={[styles.detail_main, styles.width_limit].join(" ")}>
        <section className={styles.product_info}>
          <ProductInfoDetail musical={musical} />
        </section>
        <section className={styles.product_reserve}>
          <Reservation
            musical={musical}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            performances={performances}
            setPerformances={setPerformances}
            selectedPerformanceId={selectedPerformanceId}
            setSelectedPerformanceId={setSelectedPerformanceId}
          />
        </section>
        <section className={styles.product_tab}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              onSelect={() => setTabSelect(tab.id)}
              isSelected={TabSelect === tab.id}
            >
              {tab.label}
            </TabButton>
          ))}
        </section>
        <section className={styles.product_content}>
          {TabSelect === "InfoImgs" && (
            <InfoImgs descImgs={musical.musical_description} />
          )}
          {TabSelect === "Review" && <Review />}
          {TabSelect === "Place" && <Place {...musical} />}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

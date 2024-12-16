import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TopBanner.module.css";

export default function TopBanner({ musicals }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 배너의 인덱스
  const [selectedMusicals, setSelectedMusicals] = useState([]);

  // 랜덤으로 5개의 뮤지컬 선택
  useEffect(() => {
    if (musicals.length > 0) {
      const randomIndexes = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * musicals.length)
      );
      setSelectedMusicals(randomIndexes.map((index) => musicals[index]));
    }
  }, [musicals]);

  // 3초마다 인덱스 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === selectedMusicals.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, [selectedMusicals]);

  const currentMusical = selectedMusicals[currentIndex];

  if (!currentMusical) return null;

  return (
    <Link to="/detailpage" state={{ musical:currentMusical }}>
      <div className={[styles.TopBanner, styles.main_div].join(" ")}>
        <div
          className={[styles.TopBanner, styles.background_image].join(" ")}
          style={{ backgroundImage: `url(${currentMusical.musical_image})` }}
        ></div>

        <div className={[styles.TopBanner, styles.content].join(" ")}>
          <div className={[styles.TopBanner, styles.details].join(" ")}>
            <h2>{currentMusical.musical_title}</h2>
            <p>
              {currentMusical.musical_start_date} ~{" "}
              {currentMusical.musical_end_date}
            </p>
          </div>
          <img
            className={[styles.TopBanner, styles.image].join(" ")}
            src={currentMusical.musical_image}
            alt="TopBanner image"
          />
        </div>
      </div>
    </Link>
  );
}

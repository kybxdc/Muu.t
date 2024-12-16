import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./TopBanner.module.css";

export default function TopBanner({ musicals, userInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 배너의 인덱스
  const [selectedMusicals, setSelectedMusicals] = useState([]);
  const slideInterval = useRef(null); // 슬라이드 타이머 참조

  // 랜덤으로 중복되지 않은 7개의 뮤지컬 선택
  useEffect(() => {
    if (musicals.length > 0) {
      const totalMusicals = musicals.length;
      const randomIndexesSet = new Set();

      while (randomIndexesSet.size < Math.min(7, totalMusicals)) {
        randomIndexesSet.add(Math.floor(Math.random() * totalMusicals));
      }

      const randomIndexes = Array.from(randomIndexesSet);
      setSelectedMusicals(randomIndexes.map((index) => musicals[index]));
    }
  }, [musicals]);

  // 슬라이드 자동 변경 함수
  const startSlideInterval = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === selectedMusicals.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초
  };

  // 초기 슬라이드 시작
  useEffect(() => {
    if (selectedMusicals.length > 0) {
      startSlideInterval();
    }
    return () => clearInterval(slideInterval.current); // 컴포넌트 언마운트 시 타이머 제거
  }, [selectedMusicals]);

  // 슬라이드 변경 및 타이머 초기화
  const handleSlideChange = (index) => {
    clearInterval(slideInterval.current); // 기존 타이머 제거
    setCurrentIndex(index); // 인덱스 변경
    startSlideInterval(); // 타이머 다시 시작
  };

  if (selectedMusicals.length === 0) return null;

  return (
    <div className={styles.main_div}>
      {/* 슬라이드 컨테이너 */}
      <div
        className={styles.slide_container}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {selectedMusicals.map((musical, index) => (
          <div key={index} className={styles.slide}>
            {/* 흐린 배경 이미지 */}
            <div
              className={styles.background_image}
              style={{
                backgroundImage: `url(${musical.musical_image})`,
              }}
            ></div>

            {/* 콘텐츠: 설명과 이미지 */}
            <Link
              to="/detailpage"
              state={{ musical, userInfo }}
              className={styles.link}
            >
              <div className={styles.content}>
                <div className={styles.details}>
                  <h2>{musical.musical_title}</h2>
                  <p>
                    {musical.musical_start_date} ~ {musical.musical_end_date}
                  </p>
                </div>
                <img
                  className={styles.image}
                  src={musical.musical_image}
                  alt={`${musical.musical_title} image`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 버튼 추가 */}
      <div className={styles.slide_button_container}>
        {selectedMusicals.map((musical, index) => (
          <div
            key={index}
            className={`${styles.slide_button} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => handleSlideChange(index)} // 버튼 클릭 이벤트
          >
            <img
              className={styles.slide_button_img}
              src={musical.musical_image}
              alt={`${musical.musical_title} thumbnail`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

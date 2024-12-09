import React from "react";
import styles from "./TopBanner.module.css";

function TopBanner({ title, imageUrl, StartDate, EndDate }) {
  return (
    <div className={[styles.TopBanner, styles.main_div].join(" ")}>
      {/* 흐릿한 배경 이미지 */}
      <div
        className={[styles.TopBanner, styles.background_image].join(" ")}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* 텍스트와 이미지 콘텐츠 */}
      <div className={[styles.TopBanner, styles.content].join(" ")}>
        <div className={[styles.TopBanner, styles.details].join(" ")}>
          <h2>{title}</h2>
          <p>{StartDate} ~ {EndDate}</p>
        </div>
        <img
          className={[styles.TopBanner, styles.image].join(" ")}
          src={imageUrl}
          alt="TopBanner image"
        />
      </div>
    </div>
  );
}

function getRandomNumberList(musicalCount) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < 10) {
    const randomNum = Math.floor(Math.random() * (musicalCount + 1)); // 0부터 n까지의 무작위 정수
    uniqueNumbers.add(randomNum); // Set은 중복을 허용하지 않음
  }

  return Array.from(uniqueNumbers); // Set을 배열로 변환
}

export default TopBanner;

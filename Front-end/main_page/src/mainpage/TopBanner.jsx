import React from "react";
import "./TopBanner.css";

function TopBanner({ title, imageUrl, StartDate, EndDate }) {
  return (
    <div className="TopBanner main-div">
      {/* 흐릿한 배경 이미지 */}
      <div
        className="TopBanner background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* 텍스트와 이미지 콘텐츠 */}
      <div className="TopBanner content">
        <div className="TopBanner details">
          <h2>{title}</h2>
          <p>{StartDate} ~ {EndDate}</p>
        </div>
        <img
          className="TopBanner image"
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

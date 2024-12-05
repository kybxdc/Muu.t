import React from "react";

function LogoContainer({ title, imageUrl, StartDate, EndDate }) {
  return (
    <div className="main-div">
      {/* 흐릿한 배경 이미지 */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* 텍스트와 이미지 콘텐츠 */}
      <div className="content">
        <div className="event-details">
          <h2>{title}</h2>
          <p>{StartDate} ~ {EndDate}</p>
        </div>
        <img
          className="event-details-image"
          src={imageUrl}
          alt="Highlighted Event"
        />
      </div>
    </div>
  );
}

function getUniqueRandomNumbers(musicalCount) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < 10) {
    const randomNum = Math.floor(Math.random() * (musicalCount + 1)); // 0부터 n까지의 무작위 정수
    uniqueNumbers.add(randomNum); // Set은 중복을 허용하지 않음
  }

  return Array.from(uniqueNumbers); // Set을 배열로 변환
}

export default LogoContainer;

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

export default LogoContainer;

import React from "react";
import styles from "./InfoImgs.module.css";

export default function InfoImgs({ descImgs }) {
    // DB에서 musical_description이 String 타입으로 전달되기 때문에 JSON으로 변환하기
    const parsedDescImgs =
    typeof descImgs === "string" ? JSON.parse(descImgs) : descImgs;

  return (
    <div className={styles.dIbox}>
      <h1>상세정보</h1>
      {parsedDescImgs.map((m_img, index) => (
        <img className={styles.description_img} key={index} src={m_img} alt={`Description ${index}`} />
      ))}
    </div>
  );
}

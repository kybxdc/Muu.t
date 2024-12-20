import { useEffect } from "react";
import styles from "./Place.module.css";

export default function Place({ hall_name, hall_addr, hall_la, hall_lo }) {
  useEffect(() => {
    // 지도 초기화
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(hall_la, hall_lo), // 위도와 경도
      level: 3, // 확대 레벨
    };
    const map = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(hall_la, hall_lo);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [hall_la, hall_lo]); // 위도와 경도가 변경될 때마다 지도 재렌더링

  return (
    <div className={styles.Place}>
      <div className={styles.Place_detail_box}>
        <p>장소: {hall_name}</p>
        <p>주소: {hall_addr}</p>
      </div>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
}

import { useEffect } from "react";
import styles from "./Place.module.css";

export default function Place() {
  useEffect(() => {
    // 카카오 지도 API 스크립트 로드
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=d29771b6cd552cca9b895a120a4a7b15";
    script.async = true;

    script.onload = () => {
      // 스크립트가 로드된 후에 지도 초기화
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new kakao.maps.Map(container, options);
    };

    document.head.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트를 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.Place}>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

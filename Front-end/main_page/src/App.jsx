import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./App.css";

import Product_grid from "./mainpage_conponent/Product_grid";
import LogoContainer from "./mainpage_conponent/TopBanner";
import Join from "./login/Join";
import Login from "./login/Login";
import MyMain from "./mypage/MyMain";

function App() {
  const [musicals, setMusicals] = useState([]); // Musical 데이터 상태

  useEffect(() => {
    // Musical 데이터 호출
    axios
      .get("http://localhost:9090/api/musicals")
      .then((response) => {
        setMusicals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching musicals!", error);
      });
  }, []);

  let musicalCount = musicals.length; 

  return (
    <div className="App">
      {/* Header */}
      <header className="header width-limit">
        <div className="header-innner">
          <div className="logo">
            <img className="logo-image" src="./src/img/Muut_logo_v2.png" />
          </div>
          <div className="auth-buttons">
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <LogoContainer
          title={musicals[11]?.musical_title}
          imageUrl={musicals[11]?.musical_image}
          StartDate={musicals[11]?.musical_start_date}
          EndDate={musicals[11]?.musical_end_date}
        />

        <section className="main-section width-limit section1">
          <ul className="product-grid ">
            {musicals.map((musical, index) => (
              <li key={index} className="product-grid item">
                <Product_grid {...musical}/>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <p>회사 정보 | 개인정보 처리방침 | 고객센터</p>
          <p>연락처: 1234-5678</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

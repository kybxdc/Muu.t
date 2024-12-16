import "./Reservation.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Reservation() {
  


  return (
    <>
      <div className={`reservation-view-main`}>
        <div className="list-layer">
          <ul className="lists-selected">
            <li className={`list-selected`}>등급/좌석선택</li>
            <li className={`list-selected`}>예매확인</li>
            <li className={`list-selected`}>결제</li>
          </ul>
        </div>

        <div className="view-main">
         
          <div className="reservation-layer">
            <Outlet/>
          </div>

          <nav className="view-nav">
            <div className="nav-contents">
              <div className="contents-head">
                <img src="http://www.kopis.or.kr/upload/pfmPoster/PF_PF250136_240930_134639.gif" className="nav-poster"/>
                <h4>뮤지컬 지킬앤하이드(Jekyll & Hyde)-20주년</h4>
              </div>
              <div className="contents-body">
                <div className="reservation-payment-info">
                  <h4 style={{width: "209px"}}>예매정보</h4>
                  <div className="selected-seat-list">
                  </div>
                </div>
                <p className="contents-lists"><span>일시 <span>2024.12.25(수) 19:00</span></span></p>
                <p className="contents-lists"><span>티켓금액 <span>390,000</span></span></p>
                <p className="contents-lists"><span>예매수수료 <span>6,000</span></span></p>
                <p className="contents-lists"><span>총결제 <span>396,000</span></span></p>
                <p className="contents-lists"><span>취소기한:2024.12.24 11:00</span></p>
                <p className="contents-lists"><span>취소수수료:티켓금액의0~30%</span></p>
              </div>
            </div>


            <div className="reservation-buttons">
              <button className="button rpv-btn">이전</button>
              
              <button className="button rn-btn">다음</button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

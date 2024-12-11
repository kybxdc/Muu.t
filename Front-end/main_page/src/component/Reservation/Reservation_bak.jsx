import "./Reservation.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Reservation({ children , isSeatView=false, locations, handlePayment, performance_id, selectedSeats}) {
  const navigate = useNavigate();

  let otherLocation="";

  useEffect(()=>{
    selectedSeats.sort();
    navigate("",{state:selectedSeats});
  },[selectedSeats])

  function handleNext(){
    if(selectedSeats.length<1){
      alert("좌석을 선택해주세요");
      return;
    }
    if(locations=="seatview"){
      otherLocation="../reserve/"+performance_id;
    }else if(locations=="reserve"){
      otherLocation="../payment/"+performance_id;
    }

    navigate(otherLocation,{state:selectedSeats});
  }

  function handlePrev(){

    if(locations=="reserve"){
      otherLocation="../seatview/"+performance_id;
    }else if(locations=="payment"){
      otherLocation="../reserve/"+performance_id;
    }

    navigate(otherLocation,{state:selectedSeats});
  }

  return (
    <>
      <div className={`reservation-view-main ${!isSeatView&&"not-seat-view"}`}>
        <div className="list-layer">
          <ul className="lists-selected">
            <li className={`list-selected ${locations=="seatview"?"locations":""}`}>등급/좌석선택</li>
            <li className={`list-selected ${locations=="reserve"?"locations":""}`}>예매확인</li>
            <li className={`list-selected ${locations=="payment"?"locations":""}`}>결제</li>
          </ul>
        </div>

        <div className="view-main">
         
          <div className="reservation-layer">
            {children}  
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
                    {selectedSeats.length>0?selectedSeats.map((seat)=>{
                      const row = seat.slice(0,1).charCodeAt(0)-'A'.charCodeAt(0)+1;
                      const col = seat.slice(1,101);

                      return <span className="selected-seats" key={seat}>VIP 석<span>{row}열 {col}행</span></span>
                    }):<span style={{color: "gray",fontSize:"small"}}>선택된 좌석이 없습니다.</span>}
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
              {locations!="seatview"&&
              <button className="button rpv-btn" onClick={handlePrev}>이전</button>}
              
              {locations!="payment"&&
              <button className="button rn-btn" onClick={handleNext}>다음</button>}

              {locations=="payment"&&
              <button className="button rn-btn" onClick={handlePayment}>결제</button>}

            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

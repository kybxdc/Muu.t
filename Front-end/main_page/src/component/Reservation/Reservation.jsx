import "./Reservation.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReservationCtx } from "./reservationContext";
import { useContext, useEffect, useState} from "react";

export default function Reservation() {
  const {reserveInfo, selectedSeats, seats, ticketPrice, isChecked, isChecked2, totalPrice, charge} = useContext(ReservationCtx);
  const navigate = useNavigate();
  const location = useLocation();
  const [curLoc, setCurLoc] = useState();
  const [nextLoc, setNextLoc] = useState();
  const [prevLoc, setPrevLoc] = useState();

  useEffect(()=>{
    if(location.pathname.endsWith("seatview")){
      setCurLoc("seatview")
      setNextLoc("reserve");
      setPrevLoc(undefined);
    }
    if(location.pathname.endsWith("reserve")){
      setCurLoc("reserve")
      setNextLoc("payment");
      setPrevLoc("seatview");
    }
    if(location.pathname.endsWith("payment")){
      setCurLoc("payment")
      setNextLoc(undefined);
      setPrevLoc("reserve");
    }
    if(!location.pathname.endsWith("seatview")){
      if(selectedSeats.length<1){
        navigate("seatview");
      }
    }
  },[location])
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // 브라우저에서 경고 대화 상자를 표시
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className={`reservation-view-main ${curLoc!="seatview"? "not-seat-view":""}`}>
        <div className="list-layer">
          <ul className="lists-selected">
            <li className={`list-selected ${curLoc=="seatview"?"locations":""}`}>등급/좌석선택</li>
            <li className={`list-selected ${curLoc=="reserve"?"locations":""}`}>예매확인</li>
            <li className={`list-selected ${curLoc=="payment"?"locations":""}`}>결제</li>
          </ul>
        </div>

        <div className="view-main">
         
          <div className="reservation-layer">
            <Outlet/>
          </div>

          <nav className="view-nav">
            <div className="nav-contents">
              <div className="contents-head">
                <img src={reserveInfo.poster} className="nav-poster"/>
                <h4>{reserveInfo.title}</h4>
              </div>
              <div className="contents-body">
                <div className="reservation-payment-info">
                  <h4 style={{width: "209px"}}>예매정보</h4>
                  <div className="selected-seat-list">
                  {selectedSeats.length>0?selectedSeats.map((seat)=>{
                      const row = seat.slice(0,1).charCodeAt(0)-'A'.charCodeAt(0)+1;
                      const col = seat.slice(1,101);
                      const findSeat = seats.find(seat2 => seat2.id==seat)
                      return <span className="selected-seats" key={seat}>{findSeat["grade"].grade}<span>{row}열 {col}행</span></span>
                    }):<span style={{color: "gray",fontSize:"small"}}>선택된 좌석이 없습니다.</span>}
                  </div>
                </div>
                <p className="contents-lists"><span>일시 <span>{reserveInfo.date} {reserveInfo.start_time}</span></span></p>
                <p className="contents-lists"><span>티켓금액 <span>{ticketPrice.toLocaleString()}원</span></span></p>
                <p className="contents-lists"><span>예매수수료 <span>{charge.toLocaleString()}원</span></span></p>
                <p className="contents-lists"><span>총결제 <span>{totalPrice.toLocaleString()}원</span></span></p>
              </div>
            </div>


            <div className="reservation-buttons">
              {curLoc!="seatview"&&<button className="button rpv-btn" onClick={()=>{
                navigate(prevLoc)
                }}>이전</button>}
              
              {curLoc!="payment"&&
              <button className="button rn-btn" onClick={()=>navigate(nextLoc)} disabled={
                (curLoc=="reserve"&&(!isChecked||!isChecked2))||(curLoc=="seatview"&&selectedSeats.length<1)
                }>다음</button>}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

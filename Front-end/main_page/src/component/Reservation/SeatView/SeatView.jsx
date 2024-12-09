import Reservation from "../Reservation";
import "./SeatView.css";
import Draggable from "react-draggable";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SeatView() {
  const tempSelectedSeats = useLocation().state || undefined;
  const [seats,setSeats] = useState([]);
  const performance_id = useParams().performance_id;
  const [selectedSeats, setSelectedSeats] = useState(tempSelectedSeats || []);
  const [] = useState();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(`/api/seat/getseatposition/${performance_id}`);
        
        const result = await response.json();
        setSeats(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeats();
  }, [performance_id]);

  function handleSeatClick(e, seatId) {
    if(!selectedSeats.includes(seatId)){
      if(selectedSeats.length>3){
        alert("최대 4개까지 선택 가능합니다.");
        return;
      }
      setSelectedSeats(prevSelect => [...prevSelect, seatId]);
    }else{
      setSelectedSeats(prevSelect => prevSelect.filter((id) => id!=seatId));
    }

  }
  
  return (
    <>
      <Reservation isSeatView={true} locations="seatview" performance_id={performance_id} selectedSeats={selectedSeats}>
        <div className="reservation-info">
          <h4 className="info-title">
            뮤지컬 지킬앤하이드 (Jekvll & Hvde)-20주년
          </h4>
          <p className="info-loc-date">
            블루스퀘어 신한카드홀 | 2025.01.03(금) 19:30
          </p>
        </div>
        <div className="seat-layout">
          <div className="stage-position">
            <h1 id="stage">STAGE</h1>
          </div>
          {/* <div className="seat-view"> */}
          {/* <Draggable> */}
          <div className="seat-container">
            {seats.length>0&&seats.map((seat) => {
              return (
                <div
                  className={selectedSeats.includes(seat.id) ? "selected-seat seat-no-index" : "seat-no-index"}
                  key={seat.id}
                  style={{
                    position: "absolute",
                    left: `${seat.position.x / 1.7 + 3.5}px`,
                    top: `${seat.position.y / 1.7 + 3.5}px`,
                  }}
                  onClick={(e) => handleSeatClick(e, seat.id)}
                >
                </div>
              );
            })}
          </div>
          {/* </Draggable> */}
          {/* </div> */}
        </div>
      </Reservation>
    </>
  );
}

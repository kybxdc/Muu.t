import "./SeatView.css";
import { useContext } from "react";
import { ReservationCtx } from "../reservationContext";

export default function SeatView() {
  const {reserveInfo, seats, selectedSeats, handleSeatClick} = useContext(ReservationCtx);

  return (
    <>
        <div className="reservation-info">
          <h4 className="info-title">
            {reserveInfo.title}
          </h4>
          <p className="info-loc-date">
            {reserveInfo.hall_name} | {reserveInfo.date} {reserveInfo.start_time}
          </p>
        </div>
        <div className="seat-layout">
          <div className="stage-position">
            <h1 id="stage">STAGE</h1>
          </div>
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
        </div>
    </>
  );
}

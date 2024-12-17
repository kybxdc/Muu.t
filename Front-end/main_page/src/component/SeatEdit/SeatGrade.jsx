import { Seat } from "./seatContext";
import SeatEditorGrid from "./SeatEditorGrid";
import { useContext } from "react";

export default function SeatGrade() {
  const {
    seats,
    handleSelectSeats,
    selectedSeats,
    grade,
    price,
    handleChangeGrade,
    handleSubmitGrade,
    handleChangePrice,
  } = useContext(Seat);
  return (
    <>
      <SeatEditorGrid>
        {seats.map((seat) => {
          return (
            <div
              className={
                selectedSeats.includes(seat.id) ? "seat selected-seat" : "seat"
              }
              key={seat.id}
              style={{
                position: "absolute",
                left: `${seat.position.x + 3.5}px`,
                top: `${seat.position.y + 3.5}px`,
              }}
              onClick={(e) => handleSelectSeats(e, seat.id)}
            >
              {seat.id}
            </div>
          );
        })}
        <div
          style={{
            zIndex: "999",
            position: "fixed",
            right: "10px",
            top: "10px",
          }}
        >
          <input type="text" onChange={handleChangeGrade} value={grade} placeholder="등급"/>
          <input type="text" onChange={handleChangePrice} value={price} placeholder="가격"/>
          <button className="button" onClick={handleSubmitGrade} disabled={price&&grade ? false : true}>
            등급적용
          </button>
        </div>
      </SeatEditorGrid>
    </>
  );
}

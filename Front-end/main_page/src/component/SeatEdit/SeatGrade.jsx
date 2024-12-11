import { Seat } from "./seatContext";
import SeatEditorGrid from "./SeatEditorGrid";
import { useContext } from "react";

export default function SeatGrade() {
  const {
    seats,
    handleSelectSeats,
    selectedSeats,
    grade,
    handleChangeGrade,
    handleSubmitGrade,
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
          <input type="text" onChange={handleChangeGrade} value={grade} />
          <button className="button" onClick={handleSubmitGrade}>
            등급적용
          </button>
        </div>
      </SeatEditorGrid>
    </>
  );
}

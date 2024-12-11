import Draggable from "react-draggable";
import "./SeatEdit.css";
import SeatEditorGrid from "./SeatEditorGrid";
import { useContext, useState } from "react";
import { Seat } from "./seatContext";

export default function SeatEdit() {
  const {seats, handleSelectSeats, GRID_SIZE, selectedSeats, setSeats } = useContext(Seat);
  const [prevSeats, setPrevSeats] = useState([]);

  function handleStart(e, seatId) {
    if (!selectedSeats.includes(seatId)) {
      e.preventDefault();
    }
    setPrevSeats(seats);
  }

  function handleDrag(e, data) {
    let deltaX = data.deltaX;
    let deltaY = data.deltaY;

    const updatedSeats = seats.map((seat) => {
      if (selectedSeats.includes(seat.id)) {
        return {
          ...seat,
          position: {
            x: seat.position.x + deltaX,
            y: seat.position.y + deltaY,
          },
        };
      }
      return seat;
    });

    setSeats(updatedSeats);
  }

  function handleStop() {
    if (checkCollision(seats)) {
      setSeats(prevSeats);
    }
  }

  function checkCollision(updatedSeats) {
    const positions = updatedSeats.map(
      (seat) => `${seat.position.x}${seat.position.y}`
    );
    const uniquePositions = new Set(positions);

    return positions.length !== uniquePositions.size;
  }
  
  return (
      <SeatEditorGrid>
        {seats.map((seat) => {
          return (
            <Draggable
              key={seat.id}
              position={seat.position}
              grid={[GRID_SIZE / 2, GRID_SIZE]}
              bounds=".drag-area"
              onStart={(e) => handleStart(e, seat.id)}
              onDrag={handleDrag}
              onStop={handleStop}
            >
              <div
                onClick={(e) => handleSelectSeats(e, seat.id)}
                className={
                  selectedSeats.includes(seat.id)
                    ? "seat selected-seat"
                    : "seat"
                }
              >
                {seat.id}
              </div>
            </Draggable>
          );
        })}
        </SeatEditorGrid>
  );
}

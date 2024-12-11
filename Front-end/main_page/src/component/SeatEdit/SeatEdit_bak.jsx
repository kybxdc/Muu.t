import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./SeatEdit.css";
import { useNavigate, useParams } from "react-router-dom";

export default function SeatEdit() {
  const navigate = useNavigate();
  const hall_id = useParams().hall_id;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [prevSeats, setPrevSeats] = useState([]);
  const [seatData, setSeatData] = useState({});
  const [seats, setSeats] = useState([]);

  const GRID_SIZE = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/seat/getseat/${hall_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSeatData(data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };
    fetchData();
  }, [hall_id]);

  useEffect(() => {
    setSeats(makeSeats);
  }, [seatData]);

  useEffect(() => {
    const handleSelectAll = (e) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        selectAll();
      }
    };
    const handleClearAll = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClearSelect();
      }
    };
    window.addEventListener("keydown", handleSelectAll);
    window.addEventListener("keydown", handleClearAll);
    return () => {
      window.removeEventListener("keydown", handleSelectAll);
      window.removeEventListener("keydown", handleClearAll);
    };
  }, [selectAll, handleClearSelect]);

  function makeSeats() {
    let seatArray = [];

    for (let row in seatData) {
      for (let num = seatData[row][0]; num <= seatData[row][1]; num++) {
        seatArray.push({
          id: `${row}${num}`,
          position: getDefaultPosition(row, num),
        });
      }
    }
    return seatArray;
  }

  function getDefaultPosition(row, num) {
    let rowIndex = row.charCodeAt(0) - "A".charCodeAt(0);
    let x = (num - 1) * GRID_SIZE;
    let y = rowIndex * GRID_SIZE;
    return { x, y };
  }

  function handleSelectSeats(e, seatId) {
    if (e.ctrlKey) {
      if (selectedSeats.includes(seatId)) return;
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
    }
    if (e.altKey) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((id) => id !== seatId)
      );
    }
    if (selectedSeats.length > 0) {
      if (e.shiftKey) {
        let findFirstSeatById = seats.find(
          (seat) => seat.id === selectedSeats[0]
        );
        let firstPosition = findFirstSeatById.position;
        let findLastSeatById = seats.find((seat) => seat.id === seatId);
        let lastPosition = findLastSeatById.position;

        let grid_sizeX = GRID_SIZE;
        let grid_sizeY = GRID_SIZE;

        if (firstPosition.x > lastPosition.x) {
          grid_sizeX = -grid_sizeX;
        }
        if (firstPosition.y > lastPosition.y) {
          grid_sizeY = -grid_sizeY;
        }

        for (
          let py = firstPosition.y;
          grid_sizeY > 0 ? py <= lastPosition.y : py >= lastPosition.y;
          py += grid_sizeY
        ) {
          for (
            let px = firstPosition.x;
            grid_sizeX > 0 ? px <= lastPosition.x : px >= lastPosition.x;
            px += grid_sizeX / 2
          ) {
            let findPositions = seats.find(
              (seat) => seat.position.x == px && seat.position.y == py
            );
            if (findPositions != undefined) {
              setSelectedSeats((prevSelectedSeats) => [
                ...prevSelectedSeats,
                findPositions.id,
              ]);
            }
          }
        }
      }
    }
  }

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

  function handleRowSelect(e, row) {
    for (let num = seatData[row][0]; num <= seatData[row][1]; num++) {
      let id = `${row}${num}`;
      if (!selectedSeats.includes(id)) {
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, id]);
      }
    }
  }

  function handleClearSelect() {
    setSelectedSeats([]);
  }

  function selectAll() {
    seats.map((seat) => {
      if (!selectedSeats.includes(seat.id))
        setSelectedSeats((prevSelectedSeats) => [
          ...prevSelectedSeats,
          seat.id,
        ]);
    });
  }

  const save_seats = async () => {
    console.log(JSON.stringify(seats));
    try{
      const response = await fetch(`/api/seat/saveposition/${hall_id}`,{
        method: "POST",
       headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(seats),
      });
      if(!response.ok){
        throw new Error("서버 요청 실패!");
      }
      const result = await response.text();
      console.log("서버 응답 : " + result);
      window.location.href=`/reservation/seatview/`+hall_id; // 테스트로 hall_id를 넣은 seatview로 보내는데, 저장 후에는 저장 완료 페이지 혹은 alert을 띄울 예정
    }catch(error){
      console.log("에러발생 : "+error);
    }
  }

  return (
    <>
      <div className="stage-position">
        <h1 id="stage">STAGE</h1>
      </div>
      <div className="drag-area">
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
        <div className="selectRowButton">
          {Object.keys(seatData).map((row) => (
            <button
              key={row}
              className="button row-button"
              onClick={(e) => handleRowSelect(e, row)}
            >
              {row} 그룹선택
            </button>
          ))}
          {selectedSeats.length < 1 ? (
            <button className="button select-all-button" onClick={selectAll}>
              전체 선택
            </button>
          ) : (
            <button
              className="button select-clear-button"
              onClick={handleClearSelect}
            >
              전체 해제
            </button>
          )}
        </div>
        <div>
          <button className="save-button" type="button" onClick={save_seats}>
            저장
          </button>
        </div>
      </div>
    </>
  );
}

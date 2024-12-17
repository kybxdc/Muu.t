import { createContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const ReservationCtx = createContext({
  reserveInfo: {},
  seats: [],
  selectedSeats: [],
  ticketPrice: 0,
  isChecked: true,
  isChecked2: true,
  totalPrice: 0,
  charge: 0,
  handleSeatClick: () => {},
  setIsChecked: () => {},
  setIsChecked2: () => {},
});

export default function ReservationProvider({ children }) {
  const performance_id = useParams().performance_id;
  const [reserveInfo, setReserveInfo] = useState({});
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const totalPrice = useRef();
  const charge = useRef(); // 수수료

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`/api/reserve/info/${performance_id}`);
        const result = await response.json();
        setReserveInfo(result);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `/api/seat/getseatposition/grade/${performance_id}`
        );

        const result = await response.json();
        setSeats(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeats();
  }, []);

  function handleSeatClick(e, seatId) {
    let findSeat = seats.find((seat) => seat.id == seatId);
    if (!selectedSeats.includes(seatId)) {
      if (selectedSeats.length > 3) {
        alert("최대 4개까지 선택 가능합니다.");
        return;
      }
      setSelectedSeats((prevSelect) => [...prevSelect, seatId].sort());
      setTicketPrice(
        (prevPrice) =>{ 
            const price = Number(prevPrice) + Number(findSeat.grade.price);
            charge.current = (price*0.03).toLocaleString();
            totalPrice.current = (price+Number(price*0.03)).toLocaleString();
            return price;
        }
      );
    } else {
      setSelectedSeats((prevSelect) => prevSelect.filter((id) => id != seatId));
      setTicketPrice(
        (prevPrice) => {
            const price = Number(prevPrice) - Number(findSeat.grade.price)
            charge.current = (price*0.03).toLocaleString();
            totalPrice.current = (price+Number(price*0.03)).toLocaleString();
            return price;
        }
      );
      charge.current = (ticketPrice*0.03).toLocaleString();
      totalPrice.current = (ticketPrice+charge.current).toLocaleString();
    }
  }

  const reserveCtx = {
    reserveInfo: reserveInfo,
    seats: seats,
    selectedSeats: selectedSeats,
    ticketPrice: ticketPrice,
    isChecked: isChecked,
    isChecked2: isChecked2,
    totalPrice: totalPrice.current,
    charge: charge.current,
    setIsChecked: setIsChecked,
    setIsChecked2: setIsChecked2,
    handleSeatClick: handleSeatClick,
  };

  return (
    <ReservationCtx.Provider value={reserveCtx}>
      {children}
    </ReservationCtx.Provider>
  );
}

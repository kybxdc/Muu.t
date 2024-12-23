import { createContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export const ReservationCtx = createContext({
  reserveInfo: {},
  seats: [],
  selectedSeats: [],
  ticketPrice: 0,
  isChecked: true,
  isChecked2: true,
  totalPrice: 0,
  charge: 0,
  customer: {},
  performance_id: 0,
  soldSeats: [],
  handleSeatClick: () => {},
  setIsChecked: () => {},
  setIsChecked2: () => {},
  handleBeforeUnload: ()=>{},
});

export default function ReservationProvider({ children }) {
  const performance_id = useParams().performance_id;
  const [reserveInfo, setReserveInfo] = useState({});
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [customer, setCustomer] = useState({});
  const [soldSeats, setSoldSeats] = useState([]);
  const totalPrice = useRef(Math.floor(ticketPrice + Number(ticketPrice * 0.03)));
  const charge = useRef(Math.floor(ticketPrice * 0.03)); // 수수료
  const handleBeforeUnload = useRef((e)=>{
    e.preventDefault();
    e.returnValue = "";
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`https://muu-t.onrender.com/api/reserve/info/${performance_id}`);
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
          `https://muu-t.onrender.com/api/seat/getseatposition/grade/${performance_id}`
        );
        if (!response.ok) {
          alert("좌석이 없습니다. 관리자에게 문의하세요.");
          window.close();
        }
        const result = await response.json();
        setSeats(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeats();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://muu-t.onrender.com/api/reserve/${Cookies.get("customer_id")}`
      );
      if(!response.ok){
        alert("로그인 후 이용가능합니다.");
        window.close();
      }
      const result = await response.json();
      setCustomer(result);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSoldSeats = async () => {
      try {
        const response = await fetch(`https://muu-t.onrender.com/api/reserve/sold/${performance_id}`);
        const result = await response.json();
        let array =result.map(seat=>seat.id);
        setSoldSeats(array);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSoldSeats();
  }, []);

  function handleSeatClick(e, seatId) {
    let findSeat = seats.find((seat) => seat.id == seatId);
    if (!selectedSeats.includes(seatId)) {
      if (selectedSeats.length > 3) {
        alert("최대 4개까지 선택 가능합니다.");
        return;
      }
      setSelectedSeats((prevSelect) => {
        const seats = [...prevSelect, seatId].sort();
        return seats;
      });
      setTicketPrice((prevPrice) => {
        const price = Number(prevPrice) + Number(findSeat.grade.price);
        charge.current = Math.floor(price * 0.03);
        totalPrice.current = Math.floor(price + Number(price * 0.03));
        return price;
      });
    } else {
      setSelectedSeats((prevSelect) => {
        const seats = prevSelect.filter((id) => id != seatId);
        return seats;
      });
      setTicketPrice((prevPrice) => {
        const price = Number(prevPrice) - Number(findSeat.grade.price);
        charge.current = Math.floor(price * 0.03);
        totalPrice.current = Math.floor(price + Number(price * 0.03));
        return price;
      });
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
    customer: customer,
    performance_id: performance_id,
    soldSeats: soldSeats,
    setIsChecked: setIsChecked,
    setIsChecked2: setIsChecked2,
    handleSeatClick: handleSeatClick,
    handleBeforeUnload: handleBeforeUnload.current,
  };

  return (
    <ReservationCtx.Provider value={reserveCtx}>
      {children}
    </ReservationCtx.Provider>
  );
}

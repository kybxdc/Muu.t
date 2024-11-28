import { useState } from "react";
import { Reservs } from "./Reservs.js"
import './MyReserv.css'

export default function MyReserv() {

const [selectedReserve, setSelectedReserve] = useState("PreReservs"); // [저장공간,저장공간용Setter함수]
const [activeColumn, setActiveColumn] = useState("PreReservs");

const today = new Date().toISOString().split('T')[0];
// 지난 예약
const pastReservs = Reservs.filter(res => res.date < today);
// 앞으로의 예약
const PreReservs = Reservs.filter(res => res.date >= today);

function handleSelect(selectedButton) {
    setSelectedReserve(selectedButton);
    setActiveColumn(selectedButton);
}

let reserveContent;


if (selectedReserve === "PreReservs") {
    reserveContent = PreReservs.map((reserv) => (
      <tr key={reserv.index}>
        <td><img src={reserv.img} style={{ width: '80px' }} /></td>
        <td>{reserv.title}</td>
        <td>{reserv.date}</td>
        <td><button className="detail">상세</button> <button>취소</button></td>
      </tr>
    ));
  } else if (selectedReserve === "pastReservs") {
    reserveContent = pastReservs.map((reserv) => (
      <tr key={reserv.id}>
        <td><img src={reserv.img} style={{ width: '80px' }} /></td>
        <td>{reserv.title}</td>
        <td>{reserv.date}</td>
        <td><button className="detail">상세</button></td>
      </tr>
    ));
  }
    return(
        <>
    <main className="content">
    <h2>예매내역 확인/취소 화면입니다</h2>
        <br/>
        <br/>
        <table>
          <thead>
        <tr>
            <th colSpan='2' onClick={() => {handleSelect("PreReservs");}} className={activeColumn === "PreReservs" ? "active" : ""}>아직 관람하지 않은 공연이예요</th>
            <th colSpan='2' onClick={() => {handleSelect("pastReservs");}} className={activeColumn === "pastReservs" ? "active" : ""}>이미 관람한 공연이예요</th>
        </tr>
        </thead>
        <tbody>
        {reserveContent}
        </tbody>
        </table>
        </main>
        </>
    )
}
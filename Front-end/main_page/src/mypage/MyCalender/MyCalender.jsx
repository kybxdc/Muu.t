import React, { useEffect, useState } from 'react';
import './MyCalender.css';
import axios from 'axios';

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // 월 이름 배열
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // 해당 월의 일수를 반환
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 현재 월의 첫째 날의 요일 인덱스
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // 이전 달로 이동
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 다음 달로 이동
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 렌더링 데이터 생성
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = Array.from({ length: firstDay }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  
  //예약 내역 받아오기
  const [reserveList, setReserveList] = useState([]);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:9090/mypage/reserve').then((response) => {
      setReserveList(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, []);

 // 예약된 날짜와 이미지 매핑
 const reserveDates = reserveList.reduce((acc, reserv) => {
  const reserveDate = new Date(reserv.performance_date);
  if (
    reserveDate.getFullYear() === currentYear &&
    reserveDate.getMonth() === currentMonth
  ) {
    acc[reserveDate.getDate()] = reserv.musical_image;
  }
  return acc;
}, {});


  return (
    <div className="calendar">
      <header className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </header>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
            {day && (
              <>
               <div className="image-container">
          {reserveDates[day] && (
            <img
              src={reserveDates[day]} // 매핑된 이미지 URL
              alt="예약한 뮤지컬 포스터"
              className="reserve-image"
            />
          )}
          <span className={`day-number-overlay ${reserveDates[day] ? 'reserved-day' : ''}`}>{day}</span>
         </div>
         </>
          )}
      </div>
      ))}
    </div>
    </div>
  );
}
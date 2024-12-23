import { useEffect, useState } from 'react';
import classes from '../MyReservDetail.module.css/';
import axios from 'axios';
export default function ReservInfoDetail({id}){
    const reservation_num = id;
    const [reservation, setReservation] = useState([]);
    const [Seats, setSeats] = useState([]);
    const cancelDate = new Date(reservation.performance_date); // 예약 날짜
    cancelDate.setDate(cancelDate.getDate() - 3);

        useEffect(() => {
        axios.defaults.withCredentials = true;
         axios.get(`https://muu-t-1.onrender.com/mypage/reserve/showInfo/${reservation_num}`).then((response) => {
                setReservation(response.data);
                  })
                  .catch((error) => {
                    console.error("There was an error!", error);
                  });
              }, [reservation_num]);

        useEffect(()=>{
            const fetchReserveSeats = async ()=>{
                try{
                    const response = await fetch(`https://muu-t-1.onrender.com/api/reserve/getReserveSeats/${reservation_num}`);
                    const data = await response.json();
                    setSeats(data);
                }catch(e){
                    console.log("There was an error!", e);
                }
            }

            fetchReserveSeats();
        }, []);

    return(
        <>
         <section className={classes.Musical_detail}>
                    <h2>예매내역</h2>
                    <table>
                        <tr className={classes.info}>
                            <td className={classes.info}>예매번호</td>
                            <td colspan="3" className={classes.info1}>{reservation_num}</td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석등급</td>
                            {Seats.map((Seats, id) => (
                                <td key={id}>{Seats.grade}</td>))}
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석번호</td>
                            {Seats.map((Seats, id) => (
                                <td key={id}>{Seats.id}</td>))}
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>결제가격</td>
                            <td colspan="3" className={classes.info1}>{reservation.payment_amount}</td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소여부</td>
                            <td colspan="3" className={classes.info1}>{cancelDate && new Date(cancelDate) < new Date() ? '취소 불가' : '취소 가능'}</td>
                        </tr>
                        <tr className={classes.info} style={{marginTop:'3%'}}>
                            <td className={classes.info}>취소가능일</td>
                            <td colspan="3" className={classes.info1}>{cancelDate.toLocaleDateString()}</td>
                        </tr>
                        <tr className={classes.info} style={{marginTop:'3%'}}>
                            <td colspan="3" className={classes.info1} style={{color:'#ccc'}}>(취소는 공연 3일 전까지만 가능합니다.)</td>
                        </tr>
                    </table>
                </section>
        </>
    )
}

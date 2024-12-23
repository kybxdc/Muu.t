import { useEffect, useState } from 'react';
import classes from '../MyReservDetail.module.css/';
import axios from 'axios';
export default function ReservInfo({id}){
    const reservation_num = id;
    const [reservation, setReservation] = useState([]);
    useEffect(() => {
      axios.defaults.withCredentials = true;
      axios.get(`https://muu-t-1.onrender.com/mypage/reserve/showInfo/${reservation_num}`).then((response) => {
        setReservation(response.data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }, []);
    return(
        <>
          <section className={classes.Musical_detail}>
                            <h2>예매정보</h2>
                            <table>
                                <tr className={classes.info}>
                                    <td className={classes.info}>예매번호</td>
                                    <td className={classes.info1}>{reservation_num}</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>제목</td>
                                    <td className={classes.info1}>{reservation.musical_title}</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>공연장</td>
                                    <td className={classes.info1}>{reservation.hall_name}</td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>관람일시</td>
                                    <td className={classes.info1}>{new Date(reservation.performance_date).toLocaleDateString()} {reservation.performance_start_time}</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>예매일</td>
                                    <td className={classes.info1}>{new Date(reservation.reservation_date).toLocaleDateString()}</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>결제수단</td>
                                    <td className={classes.info1}>네이버페이</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>예매자</td>
                                    <td className={classes.info1}>{reservation.customer_name}</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>티켓수령</td>
                                    <td className={classes.info1} style={{color:'#fa2828'}}>현장수령</td>
                                </tr> 
                                <tr className={classes.info}>
                                    <td className={classes.info}>현재상태</td>
                                    <td className={classes.info1}>예매완료</td>
                                </tr> 
                            </table>
                        </section>
        </>
    )
}

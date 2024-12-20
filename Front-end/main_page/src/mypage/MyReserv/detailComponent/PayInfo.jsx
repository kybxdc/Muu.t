import { useEffect, useState } from 'react';
import classes from '../MyReservDetail.module.css/';
import axios from 'axios';
export default function PayInfo({id}){
    const reservation_num = id;
    const [reservation, setReservation] = useState([]);
    const [Seats, setSeats] = useState([]);

    useEffect(()=>{
         const fetchReserveSeats = async ()=>{
             try{
                 const response = await fetch(`/api/reserve/getReserveSeats/${reservation_num}`);
                const data = await response.json();
                    setSeats(data);
                }catch(e){
                    console.log("There was an error!", e);
                }
            }
         fetchReserveSeats();
     })

     useEffect(() => {
             axios.defaults.withCredentials = true;
              axios.get(`http://localhost:9090/mypage/reserve/showInfo/${reservation_num}`).then((response) => {
                     setReservation(response.data);
                       })
                       .catch((error) => {
                         console.error("There was an error!", error);
                       });
                   }, [reservation_num]);

    return(
        <>
         <section className={classes.Musical_detail}>
                            <h2>결제정보</h2>
                            <table>
                                <tr className={classes.info}>
                                    <td className={classes.info}>티켓금액</td>
                                    <td className={classes.info1}>
                                        {Seats.map((Seats, id) => (
                                <td key={id}>{Seats.grade} {Seats.price}</td>))}</td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>예매수수료</td>
                                    <td className={classes.info1}>티켓 금액의 3%</td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>할인적용</td>
                                    <td className={classes.info1}>0</td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>총결제금액</td>
                                    <td className={classes.info1}>{reservation.payment_amount}</td>
                                </tr>
                            </table>
                        </section>
        </>
    )
}
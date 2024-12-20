import { useEffect, useState } from 'react';
import classes from '../MyReservDetail.module.css/';
import axios from 'axios';
export default function ReservInfoDetail({id}){
    const reservation_num = id;
    const [reservation, setReservation] = useState([]);
        useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:9090/mypage/reserve/showDetail/${reservation_num}`).then((response) => {
            setReservation(response.data);
            }).catch((error) => {
                console.error("There was an error!", error);
            });
        }, []);
    return(
        <>
         <section className={classes.Musical_detail}>
                    <h2>예매내역</h2>
                    <table>
                        <tr className={classes.info}>
                            <td className={classes.info}>예매번호</td>
                            <td className={classes.info1}>{reservation_num}</td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석등급</td>
                            <td className={classes.info1}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석번호</td>
                            <td className={classes.info1}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>결제가격</td>
                            <td className={classes.info1}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소여부</td>
                            <td className={classes.info1}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소가능일</td>
                            <td className={classes.info1}></td>
                        </tr>
                    </table>
                </section>
        </>
    )
}

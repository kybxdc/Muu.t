import { useEffect, useState } from "react";
import classes from './MyReserv.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyReserv({ showReserve }) {
const navigate = useNavigate();
const [selectedReserve, setSelectedReserve] = useState("PreReservs");
const [activeColumn, setActiveColumn] = useState("PreReservs");
const [reserveList, setReserveList] = useState();

const today = new Date().toISOString().split('T')[0];
// 지난 예약
const pastReservs = reserveList?.filter(reserv=>reserv.performance_date < today)||[];
// 앞으로의 예약
const PreReservs = reserveList?.filter(reserv => reserv.performance_date >= today)||[];

function handleSelect(selectedButton) {
    setSelectedReserve(selectedButton);
    setActiveColumn(selectedButton);
}

useEffect(() => {
  axios.defaults.withCredentials = true;
  axios.get('https://muu-t-1.onrender.com/mypage/reserve').then((response) => {
    setReserveList(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  let myreserv = [];
  
if (selectedReserve === "PreReservs") {
  if(PreReservs.length > 0) {
    myreserv = PreReservs.map((reserv) => {
      const musical = {
        title: reserv.musical_title,  // 예시: reserv.musical_title → musical.title
        image: reserv.musical_image,  // 예시: reserv.musical_image → musical.image
      };
      return(
        <tr className={classes.reserveTb} key={reserv.reservation_num}>
          <td className={classes.reserveTb}><img src={reserv.musical_image} style={{ width: '80px' }} onClick={()=>{navigate(`/detailpage`, { state: { musical }})}}/></td>
          <td className={classes.reserveTb} onClick={()=>{navigate(`/detailpage`, { state: { musical }})}}>{reserv.musical_title}</td>
          <td className={classes.reserveTb}>{new Date(reserv.performance_date).toLocaleDateString()} {reserv.performance_start_time}</td>
          <td className={classes.reserveTb}><button className={classes.Musical_detail} onClick={()=>showReserve(reserv.reservation_num)}>상세</button> <button className={classes.cancel}>취소</button></td>
        </tr>)
    })
    }else{
      myreserv = <tr><td className={classes.reserveTb} colSpan="4">아직 예매내역이 없습니다</td></tr>
    };
  } else if (selectedReserve === "pastReservs") {
    if(pastReservs.length > 0){
      myreserv = pastReservs.map((reserv) => {
        const musical = {
          title: reserv.musical_title,  // 예시: reserv.musical_title → musical.title
          image: reserv.musical_image,  // 예시: reserv.musical_image → musical.image
        };
        return(
          <tr className={classes.reserveTb} key={reserv.reservation_num}>
          <td className={classes.reserveTb}><img src={reserv.musical_image} style={{ width: '80px' }} onClick={()=>{{navigate(`/detailpage`, { state: { musical }})}}}></img></td>
          <td className={classes.reserveTb} onClick={()=>{{navigate(`/detailpage`, { state: { musical }})}}}>{reserv.musical_title}</td>
          <td className={classes.reserveTb}>{new Date(reserv.performance_date).toLocaleDateString()} {reserv.performance_start_time}</td>
            <td className={classes.reserveTb}><button className={classes.Musical_detail} onClick={()=>showReserve(reserv.reservation_num)}>상세</button></td>
          </tr>)
      })
    }else{
        myreserv = <tr><td className={classes.reserveTb} colSpan="4">아직 예매내역이 없습니다</td></tr>
    };
  }

    return(
        <>
    <main className="content" style={{marginTop:'5%', marginBottom:'20%'}}>
    <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>예매내역 확인/취소 화면입니다</h2>
        <br/>
        <br/>
        <table className={classes.reserve}>
          <thead>
        <tr>
            <th colSpan='2' onClick={() => {handleSelect("PreReservs");}} className={activeColumn === "PreReservs" ? classes.active : classes.reserveTh}>아직 관람하지 않은 공연이예요</th>
            <th colSpan='2' onClick={() => {handleSelect("pastReservs");}} className={activeColumn === "pastReservs" ? classes.active : classes.reserveTh}>이미 관람한 공연이예요</th>
        </tr>
        </thead>
        <tbody>
        {myreserv}
        </tbody>
        </table>
        </main>
        </>
    )
}
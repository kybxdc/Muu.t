import { useEffect, useState } from 'react';
import classes from './AdminHall.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminHall(){
    const navigate = useNavigate();
    const [hallList, setHallList] = useState([]);
        useEffect(() => {
          axios.defaults.withCredentials = true;
          axios.get('http://localhost:9090/admin/hallList').then((response) => {
            setHallList(response.data);
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }, []);

    return(
        <div className={classes.customerMain}>
            <main>
                <h2>공연장 목록</h2>
            <table className={classes.member}>
                <thead>
                    <tr>
                        <th className={classes.info}>공연장 번호</th>
                        <th className={classes.info}>공연장 이름</th>
                        <th className={classes.info}>좌석 배치</th>
                    </tr>
                </thead>
                <tbody>
                    {hallList.sort((a, b) => a.id - b.id).map((hall, id) => (
                    <tr key={id}>
                        <td className={classes.info}>{hall.id}</td>
                        <td className={classes.info}>{hall.hall_name}</td>
                        <td><button className={classes.input_btn} onClick={()=>{navigate(`../seatinfo/${hall.id}`)}}>설정</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </main>
        </div>
    )
}
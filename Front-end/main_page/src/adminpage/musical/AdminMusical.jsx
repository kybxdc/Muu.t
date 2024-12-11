import {useState, useEffect} from 'react';
import classes from './AdminMusical.module.css';
import axios from 'axios';

export default function AdminMusical(){

    const [musicalList, setMusicalList] = useState([]);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:9090/member/customer').then((response) => {
            setMusicalList(response.data);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }, []);


    return(
        <div>
        <main>
            <h2>진행 중인 공연</h2> <h2>종료 된 공연</h2>
        <table className={classes.musical}>
            <thead>
                <tr>
                    <th className={classes.info}>공연 번호</th>
                    <th className={classes.info}>공연 제목</th>
                    <th className={classes.info}>지역</th>
                    <th className={classes.info}>상세 정보</th>
                </tr>
            </thead>
            <tbody>
            {musicalList.sort((a, b) => b.musical_id - a.musical_id) // musical_id 역순으로 정렬
            .map((musical, musical_id) => (
                <tr key={musical_id}>
                    <td className={classes.info}>{musical.musical_id}</td>
                    <td className={classes.info}>{musical.musical_title}</td>
                    <td className={classes.info}>{musical.musical_area}</td>
                    <td className={classes.info}><button>입력</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        </main>
    </div>
    )
}
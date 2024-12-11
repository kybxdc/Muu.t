import { useEffect, useState } from 'react';
import classes from './AdminCustomer.module.css'
import axios from 'axios';

export default function AdminCustomer(){

    const [memberList, setMemberList] = useState([]);
        useEffect(() => {
          axios.defaults.withCredentials = true;
          axios.get('http://localhost:9090/member/customer').then((response) => {
            setMemberList(response.data);
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }, []);

    return(
        <div>
            <main>
                <h2>회원 목록</h2>
            <table className={classes.member}>
                <thead>
                    <tr>
                        <th className={classes.info}>회원 번호</th>
                        <th className={classes.info}>아이디</th>
                        <th className={classes.info}>이름</th>
                        <th className={classes.info}>회원등급</th>
                        <th className={classes.info}>현재상태</th>
                        <th className={classes.info}>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.sort((a, b) => b.customer_num - a.customer_num) // customer_id 역순으로 정렬
                            .map((member, customer_num) => (
                    <tr key={customer_num}>
                        <td className={classes.info}>{member.customer_num}</td>
                        <td className={classes.info}>{member.customer_id}</td>
                        <td className={classes.info}>{member?.customer_name||'null'}</td>
                        <td className={classes.info}>{member?.grade||'null'}</td>
                        <td className={classes.info}>{member.customer_status}</td>
                        <td className={classes.info}><button>보기</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </main>
        </div>
    )
}
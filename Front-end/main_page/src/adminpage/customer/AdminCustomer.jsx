import { useEffect, useState } from 'react';
import classes from './AdminCustomer.module.css'
import axios from 'axios';
import CustomerModal from './CustomerModal';
import Modal from '../../mainpage/Modal';

export default function AdminCustomer(){

    
    //상세정보 입력용 modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMember, setSelectedMember] = useState([]);
   
    const openModal = (id) => {
        setSelectedId(id); // 선택된 ID 저장
        const member = memberList.find((m) => m.customer_num === id);
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null); // 선택된 ID 초기화
        setSelectedMember(null);
        setIsModalOpen(false);
    };

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
        <div className={classes.customerMain}>
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
                        <td className={classes.info}>{member?.grade?.customer_grade||'null'}</td>
                        <td className={classes.info}>{member.customer_status}</td>
                        <td><button className={classes.input_btn} onClick={()=>openModal(customer_num)}>보기</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </main>
             {/* Modal 열기 전에 selectedMember가 정의된 후 렌더링 */}
             <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedMember ? (
                    <CustomerModal id={selectedId} member={selectedMember} />
                ) : (
                    <div>로딩 중...</div> // selectedMember가 null일 때 로딩 표시
                )}
            </Modal>
        </div>
    )
}
import {useState, useEffect} from 'react';
import classes from './AdminMusical.module.css';
import axios from 'axios';
import Modal from "../../mainpage/Modal";
import MusicalModal from './MusicalModal';

export default function AdminMusical(){

    //상세정보 입력용 modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [musicalList, setMusicalList] = useState([]);
    
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:9090/admin/showList').then((response) => {
            setMusicalList(response.data);
            console.log(response.data)
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }, []);

    const openModal = (id) => {
        setSelectedId(id); // 선택된 ID 저장
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedId(null); // 선택된 ID 초기화
        setIsModalOpen(false);
    };

    return(
        <div>
        <main className={classes.AdminMain}>
            <h2>진행 중인 공연의 회차정보를 입력하세요</h2>
        <table className={classes.musical}>
            <thead>
                <tr>
                    <th className={classes.info}>공연 번호</th>
                    <th className={classes.info}>공연 제목</th>
                    <th className={classes.info}>지역</th>
                    <th className={classes.info}>공연 시작일</th>
                    <th className={classes.info}>공연 종료일</th>
                    <th className={classes.info}>상세 정보</th>
                </tr>
            </thead>
            <tbody>
            {musicalList.sort((a, b) => b.id - a.id) // musical_id 역순으로 정렬
            .map((musical, id) => (
                <tr key={id}>
                    <td className={classes.info}>{musical.id}</td>
                    <td className={classes.info}>{musical.musical_title}</td>
                    <td className={classes.info}>{musical.musical_area}</td>
                    <td className={classes.info}>{musical.musical_start_date}</td>
                    <td className={classes.info}>{musical.musical_end_date}</td>
                    <td className={classes.info}><button className={classes.input_btn} onClick={()=>openModal(musical.id)}>입력</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        </main>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <MusicalModal id={selectedId}/>
                    </Modal>
    </div>
    )
}
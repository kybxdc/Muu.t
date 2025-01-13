import { useEffect, useState } from "react";
import classes from './MusicalDetail.module.css'
import axios from "axios";
import DetailModal from "./DetailModal";
import Modal from "../../mainpage/Modal";

export default function MusicaDetail(){
      const [selectedMusical, setSelectedMusical] = useState();
      const [showMusical, setShowMusical] = useState([]);
      const [musicalList, setMusicalList] = useState([]);

      function handleSelect(e) {
        setSelectedMusical(e.target.value); // 선택한 메뉴 상태 업데이트
      }

          //정보수정용 modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDetail, setselectedDetail] = useState([]);
   
    const openModal = (id) => {
        const show = showMusical.find((m) => m.id === id);
        setselectedDetail(show);
        console.log(show);
        
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setselectedDetail(null); // 선택된 ID 초기화
        setIsModalOpen(false);
    };

      useEffect(() => {
          axios.defaults.withCredentials = true;
          axios.get('http://localhost:9090/admin/showList').then((response) => {
              setMusicalList(response.data);
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
          }, []);

    useEffect(() => {
        if (selectedMusical) {
            // 선택된 제목에 해당하는 id 찾기
                 
            if (selectedMusical) {
                axios.defaults.withCredentials = true;
                axios.get(`http://localhost:9090/admin/showList/${selectedMusical}`).then((response) => {
                    setShowMusical(response.data);
                    })
                .catch((error) => {
                 console.error("There was an error!", error);
                });
            }}}, [selectedMusical]);// selectedMusical 값이 바뀔 때마다 실행
     
    return(
         <div className={classes.DetailMain}>
            <h2>등록한 공연을 확인하실 수 있습니다.</h2>
            <select onChange={handleSelect} className={classes.input_btn}>
            {musicalList.map((musical) => (
                    <option key={musical.id} value={musical.id}> {musical.musical_title}</option>
                ))}
                </select>
            <br/><br/>
            <table className={classes.musical}>
            <thead>
                <tr>
                    <th className={classes.info}>회차 번호</th>
                    <th className={classes.info}>공연 번호</th>
                    <th className={classes.info}>공연 날짜</th>
                    <th className={classes.info}>공연 시간</th>
                    <th className={classes.info}>수정</th>
                </tr>
            </thead>
            <tbody>
            {showMusical.sort((a, b) => new Date(a.performance_date)-new Date(b.performance_date)).map((showMusical, id) => (
                <tr key={id}>
                    <td className={classes.info}>{showMusical.id}</td>
                    <td className={classes.info}>{selectedMusical}</td>
                    <td className={classes.info}>  {new Date(showMusical.performance_date).toLocaleDateString()}</td>
                    <td className={classes.info}>{showMusical.performance_start_time}</td>
                    <td className={classes.info}><button className={classes.input_btn} onClick={()=>openModal(showMusical.id)}>수정</button></td>
                </tr>
            ))}
            </tbody>
        </table> 

        <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <DetailModal showMusical={selectedDetail} />
                    </Modal>
    </div>
    )
}
import { useEffect, useState } from "react";
import classes from './MusicalDetail.module.css'
import axios from "axios";

export default function MusicaDetail(){
    const [selectedMusical, setSelectedMusical] = useState();
    function handleSelect(e) {
        setSelectedMusical(e.target.value); // 선택한 메뉴 상태 업데이트
      }
      const [showMusical, setShowMusical] = useState([]);
      const [musicalList, setMusicalList] = useState([]);
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
            const selectedMusicalId = musicalList.find(
              (musical) => musical.musical_title === selectedMusical
            )?.id;
      
            if (selectedMusicalId) {
                axios.defaults.withCredentials = true;
                axios.get(`http://localhost:9090/admin/showList/${id}`).then((response) => {
                    setShowMusical(response.data);
                    })
                .catch((error) => {
                 console.error("There was an error!", error);
                });
            }}}, [selectedMusical]);// selectedMusical 값이 바뀔 때마다 실행
     
    return(
         <div>
            <h2>등록한 공연을 확인하실 수 있습니다.</h2>
            <select onChange={handleSelect}>
            {musicalList.map((musical) => (
                    <option key={musical.id} value={musical.id}> {musical.musical_title}</option>
                ))}
                </select>
            
            <table className={classes.musical}>
            <thead>
                <tr>
                    <th className={classes.info}>회차 번호</th>
                    <th className={classes.info}>공연 제목</th>
                    <th className={classes.info}>지역</th>
                    <th className={classes.info}>공연 날짜</th>
                    <th className={classes.info}>공연 시간</th>
                    <th className={classes.info}>수정</th>
                </tr>
            </thead>
            <tbody>
            {showMusical.sort((a, b) => b.id - a.id) // musical_id 역순으로 정렬
            .map((musical, id) => (
                <tr key={id}>
                    <td className={classes.info}>{showMusical.id}</td>
                    <td className={classes.info}>{showMusical.musical_title}</td>
                    <td className={classes.info}>{showMusical.performance_date}</td>
                    <td className={classes.info}>{showMusical.musical_start_date}</td>
                    <td className={classes.info}>{showMusical.performance_start_time}</td>
                    <td className={classes.info}><button className={classes.input_btn} onClick={()=>openModal(musical.id)}>수정</button></td>
                </tr>
            ))}
            </tbody>
        </table> 
                </div>
    )
}
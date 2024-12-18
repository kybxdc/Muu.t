import { useState } from 'react';
import classes from './MusicalModal.module.css';
import axios from 'axios';

export default function DetailModal({ showMusical, selectedMusical }){
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        newDate: new Date(showMusical.performance_date).toISOString().split('T')[0],
        newTime:showMusical.performance_start_time,
      });
      const [performance, setPerformance] = useState();

        function handleEditClick(){
               setIsEditing((editing)=>!editing);
           }
           function handleChange(event){
              const { name, value } = event.target;
              setFormData((prevData) => ({
                  ...prevData,
                  [name]: value,
                }));
              }
      
          function handleUpdate(){
            const updatedData = {
              id: showMusical.id,
              performance_date: formData.newDate,
              performance_start_time: formData.newTime,
            };
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:9090/mypage/update', updatedData)
              .then((response) => {
                alert('정보 변경이 완료되었습니다.')
                setPerformance(response.data);  // 서버에서 반환된 최신 데이터를 사용
                setIsEditing(false);  // 수정 완료 후 편집 상태 종료
              })
              .catch((error) => {
                console.error("Error updating data:", error);
              });
          };


    return(
        <>
            <form className={classes.detailMain}>

                 <tr className={classes.info}>
                            <td className={classes.info1}>회차 번호</td>
                            <td className={classes.info}>
                            {showMusical.id}</td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info1}>공연 번호</td>
                            <td className={classes.info}>
                            {selectedMusical}</td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>공연 날짜
                            </td>
                            <td className={classes.info}>
                              {isEditing ? (
                                <input
                                className={classes.input_btn}
                                  type="date"
                                  name="newDate"
                                  required
                                  value={formData.newDate}
                                  onChange={handleChange}
                                />
                              ) : (
                                <span>{new Date(showMusical.performance_date).toLocaleDateString()}</span>
                              )}
                            </td>
                          </tr>
                          <tr className={classes.info}>
                            <td className={classes.info}> 공연시간</td>
                            <td className={classes.info}>
                              {isEditing ? (
                                <input
                                className={classes.input_btn}
                                  type="text"
                                  name="newTime"
                                  required
                                  value={formData.newTime}
                                  onChange={handleChange}
                                />
                              ) : (
                                <span>{showMusical.performance_start_time}</span>
                              )}
                            </td>
                          </tr>

                <button onClick={isEditing ? handleUpdate : handleEditClick} className={isEditing ? classes.changePassword : classes.submit_btn}> {isEditing ? '수정완료' : '공연정보수정'}</button>
            </form>
        </>
    )
}
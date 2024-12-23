import axios from 'axios';
import classes from './MyInfo.module.css'
import { useState, useEffect } from 'react';

export default function MyInfo({grade, memberId, name, password, phone, addr}) {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        newName: name,
        newPassword: password,
        newPhone: phone,
        newAddr: addr,
      });

      const [member, setMember] = useState(null);
      useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('https://muu-t.onrender.com/mypage/customer').then((response) => {
              setMember(response.data);
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }, []);
      


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
        customer_id: member.customer_id,  // 기존의 customer_id
        customer_name: formData.newName,
        customer_pw: formData.newPassword,
        customer_phone: formData.newPhone,
        customer_address: formData.newAddr,
      };
      axios.defaults.withCredentials = true;
      axios.post('https://muu-t.onrender.com/mypage/update', updatedData)
        .then((response) => {
          alert('정보 변경이 완료되었습니다.')
          setMember(response.data);  // 서버에서 반환된 최신 데이터를 사용
          setIsEditing(false);  // 수정 완료 후 편집 상태 종료
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    };
    
    return(
        <div>
         <main style={{marginTop:'5%', marginBottom:'20%'}}>
        <h2 style={{ marginLeft: '20px'}}>회원정보수정</h2>
        <p style={{ marginLeft: '20px'}}>회원님은 
          <span style={{color:"#fa2828"}}><strong> '{member?.grade?.customer_grade || 'null'}' </strong></span>등급입니다</p>

        <tr className={classes.info}>
            <td className={classes.info1}>아이디</td>
            <td className={classes.info}>
            {member?.customer_id|| 'null'}</td>
        </tr>
        <tr className={classes.info}>
            <td className={classes.info1}>이름</td>
            <td className={classes.info}>
            {isEditing ? (
             <input
             className={classes.info_input}
             type="text"
             name="newName"
             required
             value={formData.newName}
             onChange={handleChange}
           />
         ) : (
           <span>{formData.newName}</span>
         )}</td>
        </tr>
        <tr className={classes.info}>
            <td className={classes.info1}>비밀번호</td>
            <td className={classes.info}>
              {isEditing ? (
                <input
                className={classes.info_input}
                  type="password"
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              ) : (
                <span>*****</span>
              )}
            </td>
          </tr>
          <tr className={classes.info}>
            <td className={classes.info1}> 연락처</td>
            <td className={classes.info}>
              {isEditing ? (
                <input
                className={classes.info_input}
                  type="text"
                  name="newPhone"
                  required
                  value={formData.newPhone}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.newPhone}</span>
              )}
            </td>
          </tr>
          <tr className={classes.info}>
            <td className={classes.info1}>주소</td>
            <td className={classes.info}>
              {isEditing ? (
                <input
                  className={classes.info_input}
                  type="text"
                  name="newAddr"
                  required
                  value={formData.newAddr}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.newAddr}</span>
              )}
            </td>
          </tr>
      <button onClick={isEditing ? handleUpdate : handleEditClick} className={isEditing ? classes.changePassword : classes.submit_btn}> {isEditing ? '수정완료' : '회원정보수정'}
      </button>
    </main>
    </div>
  );
}
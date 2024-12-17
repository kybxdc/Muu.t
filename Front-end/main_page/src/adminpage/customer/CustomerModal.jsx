import classes from './CustomerModal.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CustomerModal({ customer_num, memberList }) {
    const selectedMember = memberList.find(member => member.customer_num === customer_num);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        newId: selectedMember.customer_id,
        newName: selectedMember.customer_name,
        newPassword: selectedMember.customer_password,
        newPhone: selectedMember.customer_phone,
        newAddr: selectedMember.customer_address,
        newStatus: selectedMember.customer_status,
         newGrade: {
        customer_grade: selectedMember.grade.customer_grade,  // 키: 값 형식으로 수정
        discount_rate: selectedMember.grade.discount_rate      // 키: 값 형식으로 수정
    }
      });

      function handleUpdate(){
        const updatedData = {
          customer_num: customer_num, // 기존의 customer_num
          customer_id: formData.newId,  
          customer_name: formData.newName,
          customer_pw: formData.newPassword,
          customer_phone: formData.newPhone,
          customer_address: formData.newAddr,
          customer_status : formData.newStatus,
          grade : { customer_grade : formData.newGrade.customer_grade,
            discount_rate : formData.newGrade.discount_rate,
          }
        };
        useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:9090/admin/update', updatedData)
          .then((response) => {
            setMember(response.data);  // 서버에서 반환된 최신 데이터를 사용
            setIsEditing(false);  // 수정 완료 후 편집 상태 종료
            alert('정보 변경이 완료되었습니다.')
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          })}
      ,[]);}

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


    return(
        <>
        <div className={classes.width_limit}>
        <main style={{marginTop:'5%', marginBottom:'20%'}}>
             <h2 style={{ marginLeft: '20px'}}>회원정보수정</h2>
            <tr className={classes.info}>
           <td className={classes.info1}>아이디</td>
           <td className={classes.info}>
           {isEditing ? (
            <input
            className={classes.info_input}
            type="text"
            name="newName"
            required
            value={formData.newId}
            onChange={handleChange}
          />
        ) : (
          <span>{formData.newId}</span>
        )}</td>
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
         <tr className={classes.info}>
           <td className={classes.info1}>상태</td>
           <td className={classes.info}>
             {isEditing ? (
               <input
                 className={classes.info_input}
                 type="text"
                 name="newStatus"
                 required
                 value={formData.newStatus}
                 onChange={handleChange}
               />
             ) : (
               <span>{formData.newStatus}</span>
             )}
           </td>
         </tr>
         <tr className={classes.info}>
           <td className={classes.info1}>등급</td>
           <td className={classes.info}>
             {isEditing ? (
               <input
                 className={classes.info_input} type="text" name="newGrade.customer_grade"
                 required value={formData.newGrade.customer_grade} onChange={handleChange}/>
             ) : (
               <span>{formData.newGrade.customer_grade}</span>
             )}
           </td>
         </tr>
     <button onClick={isEditing ? handleUpdate : handleEditClick} className={isEditing ? classes.changePassword : classes.submit_btn}> {isEditing ? '수정완료' : '회원정보수정'}
     </button>
   </main>
   </div>
        </>
    )
}
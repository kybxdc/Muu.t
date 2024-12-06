import axios from 'axios';
import './Myinfo.css'
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
        axios.get('http://localhost:9090/mypage/customer').then((response) => {
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
      axios.post('http://localhost:9090/mypage/update', updatedData)
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
        <>
         <main className="content">
        <h2>회원정보수정</h2>
        <p>회원님은 '{member?.customer_grade || 'null'}'등급입니다</p>

        <tr>
            <td>아이디</td>
            {member?.customer_id|| 'null'}
        </tr>
        <tr>
            <td>회원이름</td>
            {isEditing ? (
             <input
             type="text"
             name="newName"
             required
             value={formData.newName}
             onChange={handleChange}
           />
         ) : (
           <span>{formData.newName}</span>
         )}
        </tr>
        <tr>
            <td>비밀번호</td>
            <td>
              {isEditing ? (
                <input
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
          <tr>
            <td>연락처</td>
            <td>
              {isEditing ? (
                <input
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
          <tr>
            <td>주소</td>
            <td>
              {isEditing ? (
                <input
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
      <button onClick={isEditing ? handleUpdate : handleEditClick}>
        {isEditing ? '수정완료' : '회원정보수정'}
      </button>
    </main>
  </>
  );
}
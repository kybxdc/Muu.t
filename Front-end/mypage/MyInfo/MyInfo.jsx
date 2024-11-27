import { Member } from '../MemberInfo';
import './Myinfo.css'
import { useState } from 'react';

export default function MyInfo({grade, memberId, name, password, phone, addr}) {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: password,
        newPhone: phone,
        newAddr: addr,
      });


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
         <main className="content">
        <h2>회원정보수정</h2>
        <p>회원님은 '{grade}'등급입니다</p>

        <tr>
            <td>아이디</td>
            {memberId}
        </tr>
        <tr>
            <td>회원이름</td>
            {name}
        </tr>
        <tr>
            <td>비밀번호</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.newPassword}</span>
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
      <button onClick={handleEditClick}>
        {isEditing ? '수정완료' : '회원정보수정'}
      </button>
    </main>
  </>
  );
}
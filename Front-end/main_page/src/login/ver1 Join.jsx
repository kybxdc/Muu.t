import { useState } from "react";
import './Join.css'


export default function Join() {
     const [id, setId] = useState(''); // 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
  
    const handleIdChange = (e) => {
      setId(e.target.value); // 아이디 입력값 상태 업데이트
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value); // 비밀번호 입력값 상태 업데이트
    };
  
    return (
      <>
        <header>
          <img src="../muut.png" witdh="300px" height="300px" ></img>
        </header>
        <div>
          <h2>회원 정보를 입력해 주세요</h2>
          <p>이메일 주소를 아이디로 사용할게요.</p>
          <input type='text' value={id} placeholder='아이디'  onChange={handleIdChange}/><br/>
          <input type='text' value={password} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className="join">회원가입</button>
        </div>
  
      </>
    )
  }
  
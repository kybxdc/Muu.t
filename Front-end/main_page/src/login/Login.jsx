import { useState } from "react";
import "./Login.css";


export default function Login() {
    const [id, setId] = useState(''); // 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
  
    const handleIdChange = (e) => {
      setId(e.target.value); // 아이디 입력값 상태 업데이트
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value); // 비밀번호 입력값 상태 업데이트
    };

    // function joinUs(e)
    // }
  
    return (
      <>
        <header>
          <img src="../muut.png" witdh="300px" height="300px" ></img>
        </header>
        <div>
          <input type='text' value={id} placeholder='아이디'  onChange={handleIdChange}/><br/>
          <input type='text' value={password} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className="login">로그인</button>
          <hr/>
          <button className="join" /*onClick={joinUs}*/>회원가입</button>
          <p><span>아이디찾기</span> | <span>비밀번호찾기</span></p>
        </div>
  
      </>
    )
  }
  
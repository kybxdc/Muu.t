import { useState } from "react";
import {Link} from 'react-router-dom';
import "./Login.css";


export default function Login() {
    const [customerId, setCustomerId] = useState(''); // 아이디 상태
    const [customerPw, setCustomerPw] = useState(''); // 비밀번호 상태
  
    const handleIdChange = (e) => {
      setCustomerId(e.target.value); // 아이디 입력값 상태 업데이트
    };
  
    const handlePasswordChange = (e) => {
      setCustomerPw(e.target.value); // 비밀번호 입력값 상태 업데이트
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:9090/member/login',
          {customerId: customerId, customerPw: customerPw})
          .then((res) =>{
            if (res.data.email === undefined || res.data.email === null) {
              console.log("======================", res.data.msg);
              alert("ID, 혹은 비밀번호가 일치하지 않습니다.");
            } else if (res.data.email === inputId) {
              // id, pw 모두 일치 userId = userId1, msg = undefined
              console.log("======================", "로그인 성공");
              sessionStorage.setItem("customerId", customerId); 
              sessionStorage.setItem("customerName", res.data.customerName); 
            }
        })
      } catch (error) {
        console.log('회원가입 에러: ' + error);
      }
      // 작업 완료 되면 페이지 이동(새로고침)
      document.location.href = "/";
    };
    return (
      <>
        <header>
          <img src="../muut.png" witdh="300px" height="300px" ></img>
        </header>
        <div>
          <input type='text' value={customerId} placeholder='아이디(아이디는 이메일형식입니다)'  onChange={handleIdChange}/><br/>
          <input type='text' value={customerPw} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className="login" onClick={handleSubmit}>로그인</button>
          <hr/>
          <button className="join"><a href="/Join.jsx">회원가입</a></button>
          <p><span>아이디찾기</span> | <span>비밀번호찾기</span></p>
        </div>
  
      </>
    )
  }
  
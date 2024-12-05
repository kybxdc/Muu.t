import { useState } from "react";
import {Link} from 'react-router-dom';
import "./Login.css";
import axios from "axios";


export default function Login() {
    const [customer_id, setCustomer_id] = useState(''); // 아이디 상태
    const [customer_pw, setCustomer_pw] = useState(''); // 비밀번호 상태
  
    const handleIdChange = (e) => {
      setCustomer_id(e.target.value); // 아이디 입력값 상태 업데이트
    };
  
    const handlePasswordChange = (e) => {
      setCustomer_pw(e.target.value); // 비밀번호 입력값 상태 업데이트
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:9090/member/login',
          {customer_id: customer_id, customer_pw: customer_pw})
          .then((res) =>{
            if (res.data.customer_id === undefined || res.data.customer_pw === null) {
              console.log("======================", res.data.msg);
              alert("ID, 혹은 비밀번호가 일치하지 않습니다.");
            } else if (res.data.customer_id === customer_id) {
              // id, pw 모두 일치 userId = userId1, msg = undefined
              console.log("======================", "로그인 성공");
              sessionStorage.setItem("customer_id", customer_id); 
              sessionStorage.setItem("customerName", res.data.customerName); 
              alert("환영합니다. "+sessionStorage.getItem("customerName"));
            }
        })
      } catch (error) {
        alert('회원가입 에러: ' + error);
      }
      // 작업 완료 되면 페이지 이동(새로고침)
      document.location.href = "/";
    };
    return (
      <>
        <header>
          <img src="../igm/Muut_logo.png" witdh="300px" height="300px" ></img>
        </header>
        <div>
          <input type='text' value={customer_id} placeholder='아이디(아이디는 이메일형식입니다)'  onChange={handleIdChange}/><br/>
          <input type='text' value={customer_pw} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className="login" onClick={handleSubmit}>로그인</button>
          <hr/>
          <button className="join"><a href="/Join">회원가입</a></button>
          <p><span>아이디찾기</span> | <span>비밀번호찾기</span></p>
        </div>
  
      </>
    )
  }
  
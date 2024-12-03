import { useState } from "react";
import './Join.css'
import axios from "axios";


export default function Join() {
  const [customerId, setCustomer_id] = useState(''); // 아이디 상태
  const [customerPw, setCustomer_pw] = useState(''); // 비밀번호 상태
  
    const handleIdChange = (e) => {
      setCustomer_id(e.target.value); // 아이디 입력값 상태 업데이트
    };
  
    const handlePasswordChange = (e) => {
      setCustomer_pw(e.target.value); // 비밀번호 입력값 상태 업데이트
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {customerId, customerPw};
    try {
      await axios.post('http://localhost:9090/member/join', user);
      alert('Muu.t의 회원이 되어주셔서 감사합니다!');
      console.log(customerPw);
      console.log(customerId)
      window.location.href = '/';
    } catch (error) {
      console.log('회원가입 에러: ' + error);
    }
  };

    return (
      <>
        <header>
          <img src="../img/Muut_logo.png" witdh="300px" height="300px" ></img>
        </header>
        <div>
          <h2>회원 정보를 입력해 주세요</h2>
          <p>이메일 주소를 아이디로 사용할게요.</p>
          <form onSubmit={handleSubmit}>
          <input type='text' value={customerId} placeholder='아이디(이메일 형식으로 입력해주세요)'  onChange={handleIdChange}/><br/>
          <input type='text' value={customerPw} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className="join" type="submit">회원가입</button>
          </form>
        </div>
  
      </>
    )
  }
  
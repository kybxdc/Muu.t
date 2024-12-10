import { useState } from "react";
import styles from "./Join.module.css";
import axios from "axios";
import Login from "./Login";


export default function Join() {
  const [currentView, setCurrentView] = useState("Join");
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
    const user = {customer_id, customer_pw};
    try {
      await axios.post('http://localhost:9090/member/join', user);
      alert('Muu.t의 회원이 되어주셔서 감사합니다!');
      console.log(customer_pw);
      console.log(customer_id)
      window.location.href = '/';
    } catch (error) {
      console.log('회원가입 에러: ' + error);
    }
  };

    return (
      <div className={styles.joinMain}>
         {currentView === "Join" && (
      <>
        <header>
          <img src="./src/img/Muut_logo.png" witdh="300px" height="300px" ></img>
        </header>
        <div className={styles.joinMain}>
          <h2>회원 정보를 입력해 주세요</h2>
          <p>이메일 주소를 아이디로 사용할게요.</p>
          <form onSubmit={handleSubmit} className={styles.joinMain}>
            <div><input type='text' className={styles.join_input} value={customer_id} placeholder='아이디(이메일 형식으로 입력해주세요)'  onChange={handleIdChange}/></div>
            <div><input type='password' className={styles.join_input} value={customer_pw} placeholder='비밀번호' onChange={handlePasswordChange}/></div>
            <button className={styles.join_btn} type="submit">회원가입</button>
          </form>
          <hr/>
          <button className={styles.login_btn} onClick={() => setCurrentView("Login")}>로그인</button>
        </div>
        </>
         )}
         {currentView === "Login" && <Login />}
      </div>
    )
  }
  
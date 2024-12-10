import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import Join from "./Join";


export default function Login() {
    const [currentView, setCurrentView] = useState("Login");
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
      if(!customer_id || !customer_pw){
        alert("ID와 비밀번호를 입력해주세요.");
        return;
      } else{
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
                    sessionStorage.setItem("customer_name", res.data.customer_name); 

                    if(sessionStorage.getItem("customer_name") == 'null'){
                      alert(`현재 회원정보가 등록되어있지 않습니다. 회원정보를 입력해주세요`);
                    }
                    else {alert("환영합니다. "+sessionStorage.getItem("customer_name"))};
                  }
              })
         } catch (error) {
             alert('회원가입 에러: ' + error);
        }                                     
      // 작업 완료 되면 페이지 이동(새로고침)
      document.location.href = "/";
    }};

    return (
      <div className={styles.loginMain}>
        {currentView === "Login" && (
          <>
        <header>
          <img src="./src/img/Muut_logo.png" witdh="300px" height="300px" ></img>
        </header>
        <div className={styles.loginMain}>
          <input type='text' className={styles.login_input} value={customer_id} placeholder='아이디(아이디는 이메일형식입니다)'  onChange={handleIdChange}/><br/>
          <input type='password' className={styles.login_input} value={customer_pw} placeholder='비밀번호' onChange={handlePasswordChange}/><br/>
          <button className={styles.login_btn} onClick={handleSubmit}>로그인</button>
          <hr/>
          <button className={styles.join_btn} onClick={() => setCurrentView("Join")}>회원가입</button>
          <p><span>아이디찾기</span> | <span>비밀번호찾기</span></p>
        </div>
        </> )}
        {currentView === "Join" && <Join />}
      </div>
    )
  }
  
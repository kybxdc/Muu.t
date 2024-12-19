import { useState } from "react";
import styles from "./Join.module.css";
import axios from "axios";
import Login from "./Login";


export default function Join() {
  const [currentView, setCurrentView] = useState("Join");
  const [customer_id, setCustomer_id] = useState(''); // 아이디 상태
  const [customer_pw, setCustomer_pw] = useState(''); // 비밀번호 상태
  const [customer_pw2, setCustomer_pw2] = useState(''); // 비밀번호 상태
  const [pw_check, setPw_check] = useState("none"); // 비밀번호 확인용

// const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
// const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지
    
const handleIdChange = (e) => {
      setCustomer_id(e.target.value); // 아이디 입력값 상태 업데이트
      idCheckHandler(e.target.value);
    };
  
const idCheckHandler = async (id) => {
  try{
    const responseData = await idDuplicateCheck(id)
    if (responseData) {
      setIdError('사용 가능한 아이디입니다.');
      setIsIdCheck(true);
      setIsIdAvailable(true);
      return true;
    } else {
      setIdError('이미 사용중인 아이디입니다.');
      setIsIdAvailable(false);
      return false;
    }
  } catch (error) {
    alert('서버 오류입니다. 관리자에게 문의하세요.');
    console.error(error);
    return false;
  }
}

    const handlePasswordChange = (e) => {
      setCustomer_pw(e.target.value); // 비밀번호 입력값 상태 업데이트
    };

    const handlePasswordCheck = (e) => {
      setCustomer_pw2(e.target.value); // 비밀번호 입력값 상태 업데이트
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {customer_id, customer_pw};
    // if(!isIdCheck){
    //   return;
    // }
    if (customer_pw != customer_pw2){
      setPw_check("block");
      return;
    }else{
    try {
      setPw_check("none");
      await axios.post('http://localhost:9090/member/join', user);
      alert('Muu.t의 회원이 되어주셔서 감사합니다!');
      console.log(customer_pw);
      console.log(customer_id)
      window.location.href = '/';
    } catch (error) {
      console.log('회원가입 에러: ' + error);
    }
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
            <div><input type='email' className={styles.join_input} value={customer_id} placeholder='아이디(이메일 형식으로 입력해주세요)'
                    required onChange={handleIdChange}/></div>
                      {/* <p className={isIdAvailable ? 'idAvailable' : ''}></p> */}
            <div><input type='password' className={styles.join_input} value={customer_pw} placeholder='비밀번호(6자~15자, 영어대소문자, 특수문자포함)'
                    required minLength='6' maxLength='15' onChange={handlePasswordChange}/></div>
            <div><input type='password' className={styles.join_input} value={customer_pw2} placeholder='비밀번호를 다시 한 번 입력해주세요.'
                    required minLength='6' maxLength='15' onChange={handlePasswordCheck}/></div>
                    <p className={styles.pw_check} style={{display: pw_check}}>비밀번호가 동일하지 않습니다.</p>
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
  
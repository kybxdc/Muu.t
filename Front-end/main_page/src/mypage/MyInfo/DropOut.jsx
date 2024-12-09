import axios from 'axios';
import classes from './DropOut.module.css'

function handleDropout(){
    if(window.confirm("버튼을 누르면 취소하실 수 없습니다. 정말로 탈퇴하시겠습니까?")){
        //탈퇴처리하기
        axios.defaults.withCredentials = true;
        try {
          axios.get('http://localhost:9090/member/dropout');
          alert('그동안 이용해주셔서 감사합니다.');
          window.location.href = '/';
        } catch (error) {
          console.log('회원 탈퇴 에러: ' + error);
        }
      };
    }

export default function DropOut() {
    return(
        <>
        <main className={classes.content}>
        <div>
        <h2>Muu.t를 탈퇴하시는 경우</h2>
        <h2>기존의 예매내역은 모두 삭제됩니다.</h2>
        </div><br/>
        <div>
        <p style={{ marginLeft: '20px', marginTop: '20px' }}>또한 동일한 회원정보로는 가입하실 수 없습니다.</p>
        </div><br/>
        <div>
        <button className={classes.dropout_btn} onClick={handleDropout}>탈퇴하기</button>
        </div>
        
        </main>
        </>
    )
}
import './Myinfo.css'
import {createBrowserRouter} from 'react-router-dom';

export default function UpdateInfo() {
    return(
        <>
         <main className="content">
        <h2>회원정보수정</h2>
        <p>회원님은 '등급'이십니다</p>

        <tr>
            <td>아이디</td>
            <td>메일주소</td>
        </tr>
        <tr>
            <td>비밀번호</td>
            <td><button className='changePassword'>변경</button></td>
        </tr>
        <tr>
            <td>연락처</td>
            <td>휴대폰번호</td><td><button className='changeNumber'>변경</button></td>
        </tr>
        <tr>
            <td>주소</td>
            <td>***</td><td><button className='changeAddr'>변경</button></td>
        </tr>

        <button>수정완료</button>
        </main>
        </>
    )
}
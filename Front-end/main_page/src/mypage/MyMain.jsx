import { useState, useEffect, styles} from 'react';
import './MyMain.css';
import MyCalander from './MyCalender/MyCalender';
import MyInfo from './MyInfo/MyInfo';
import MyReserv from './MyReserv/MyReserv';
import DropOut from './MyInfo/DropOut';
import MyAccount from './MyInfo/MyAccount';
import GradeInfo from './GradeInfo';
import axios from 'axios';

export default function MyMain() {
    const [selectedMenu, setSelectedMenu] = useState();
    function handleSelect(menu) {
        setSelectedMenu(menu); // 선택한 메뉴 상태 업데이트
      }

    const [member, setMember] = useState();
    useEffect(() => {
      axios.defaults.withCredentials = true;
      axios.get('http://localhost:9090/mypage/customer').then((response) => {
            setMember(response.data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }, []);
    
    
      
    let mainmenu; 
    if (selectedMenu === 'GradeInfo') {
        mainmenu = <GradeInfo />;
    } else if (selectedMenu === 'MyCalander') {
        mainmenu = <MyCalander />;
    } else if (selectedMenu === 'MyInfo') {
        mainmenu = (<MyInfo 
          grade={member?.customer_grade || 'null'}
          memberId={member.customer_id}
          name={member?.customer_name || 'null'}
          password={member?.customer_pw|| 'null'}
          phone={member?.customer_phone || 'null'}
          addr={member?.customer_address || 'null'}
        />);
    } else if (selectedMenu === 'MyReserv'){
        mainmenu = <MyReserv />;
    }else if (selectedMenu === 'MyAccount'){
        mainmenu = <MyAccount />;
    }else if (selectedMenu === 'DropOut'){
        mainmenu = <DropOut />;
    }else {
        mainmenu = (
            <main className="content">
                <h2>안녕하세요 [{member?.customer_name||'null'}] 님</h2>
                        <div className="user-info">
                            <p>회원님은 <strong>{member?.customer_grade || 'null'}</strong>등급입니다.</p>
                            <p>아이디: <strong>{member?.customer_id|| 'null'}</strong></p>
                            <p>이름: <strong>{member?.customer_name || 'null'}</strong></p>
                            <p>비밀번호: *****</p>
                            <p>최근 예약 내역 : 뮤지컬 상세 페이지로 연결</p>
                            <button className="submit-btn" onClick={() => {handleSelect("MyInfo")}}>회원정보수정</button>
                        </div>
            </main>
        );
    }
    return (
        <>
      <nav className="top-navbar">
      <div className="logo" onClick={() => setSelectedMenu(null)}>마이페이지</div>
      <div className="top-menu">
      <div className="menu-item" id="GradeInfo"><a onClick={() => {handleSelect("GradeInfo")}}>회원등급</a></div>
      <div className="menu-item" id="MyCalander"><a onClick={() => {handleSelect("MyCalander")}}>마이캘린더</a></div>
      <div className="menu-item" id="MyInfo"><a onClick={() => {handleSelect("MyInfo")}}>회원정보수정</a></div>
      </div>
      </nav>
      <div className="container">
      <aside className="sidebar">
      <ul>
          <li>
          <div>예약관리</div></li>
          <ul className="submenu">
              <li><a onClick={() => {handleSelect("MyReserv")}}>예매내역확인/취소</a></li>
              <li><a onClick={() => {handleSelect("MyCalander")}}>마이캘린더</a></li>
          </ul>
          <li><div>회원정보관리</div></li>
          <ul className="submenu">
              <li><a onClick={() => {handleSelect("MyAccount")}}>환불계좌관리</a></li>
              <li><a onClick={() => {handleSelect("MyInfo")}}>회원정보수정</a></li>
              <li><a onClick={() => {handleSelect("DropOut")}}>회원탈퇴</a></li>
          </ul>
      </ul>
      </aside>
      {mainmenu}  
      </div>
      </>
  )
}
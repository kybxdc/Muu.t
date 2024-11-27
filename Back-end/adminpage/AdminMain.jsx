import { useState } from 'react';
import './AdminMain.css';

export default function AdminMain() {
    const [selectedMenu, setSelectedMenu] = useState();
    function handleSelect(menu) {
        setSelectedMenu(menu); // 선택한 메뉴 상태 업데이트
      }
      let adminmenu;
     
      if (selectedMenu === 'GradeInfo') {
        adminmenu = <GradeInfo />;
      } else {
        adminmenu = (
            <main className="content">
                <h2>안녕하세요 관리자[이름] 님</h2>
                        <div className="user-info">
                            <p>이 페이지에서는 공연 관리와 공연장 관리, 회원관리가 가능합니다.</p>
                        </div>
            </main>
        );
    }
    return (
        <>
      <nav className="top-navbar">
      <div className="logo" onClick={() => setSelectedMenu(null)}> 관리자 페이지 </div>
      <div className="top-menu">
      <div className="menu-item" id="GradeInfo"><a onClick={() => {handleSelect("GradeInfo")}}>공연등록</a></div>
      <div className="menu-item" id="MyCalander"><a onClick={() => {handleSelect("MyCalander")}}>공연장등록</a></div>
      <div className="menu-item" id="MyInfo"><a onClick={() => {handleSelect("MyInfo")}}>회원관리</a></div>
      </div>
      </nav>
      <div className="container">
      <aside className="sidebar">
      <ul>
          <li>
          <div>공연 관리</div></li>
          <ul className="submenu">
              <li><a onClick={() => {handleSelect("MyReserv")}}>공연 등록</a></li>
              <li><a onClick={() => {handleSelect("MyCalander")}}>공연 수정</a></li>
          </ul>
          <li><div>공연장 관리</div></li>
          <ul className="submenu">
              <li><a onClick={() => {handleSelect("MyAccount")}}>공연장 등록</a></li>
              <li><a onClick={() => {handleSelect("MyInfo")}}>공연장 수정</a></li>
          </ul>
          <li><div>회원 관리</div></li>
          <ul className="submenu">
              <li><a onClick={() => {handleSelect("MyAccount")}}>일반 회원 관리</a></li>
              <li><a onClick={() => {handleSelect("MyInfo")}}>내 정보 관리</a></li>
          </ul>
      </ul>
      </aside>
      {adminmenu}  
      </div>
    </>
  )
}
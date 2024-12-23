import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import classes from './MyMain.module.css';
import MyCalander from './MyCalender/MyCalender';
import MyInfo from './MyInfo/MyInfo';
import MyReserv from './MyReserv/MyReserv';
import DropOut from './MyInfo/DropOut';
import MyAccount from './MyInfo/MyAccount';
import GradeInfo from './GradeInfo';
import axios from 'axios';
import Header from "../mainpage/components/Header";
import Footer from "../mainpage/components/Footer";
import handleLogout from '../login/Logout';
import MyReservDetail from './MyReserv/MyReservDetail';

export default function MyMain() {
  const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState();
    const [selectedReserv, setSelectedReserv] = useState();
    function handleSelect(menu) {
        setSelectedMenu(menu); // 선택한 메뉴 상태 업데이트
      }

      const showReserve = (reservation_num) => {
        setSelectedMenu('MyReservDetail'); // 메뉴 변경
        setSelectedReserv(reservation_num); // reserv.num 저장
      };

    const [member, setMember] = useState();
    useEffect(() => {
      axios.defaults.withCredentials = true;
      axios.get('https://muu-t-1.onrender.com/mypage/customer').then((response) => {
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
        mainmenu = <MyCalander  showReserve={showReserve} />;
    } else if (selectedMenu === 'MyInfo') {
        mainmenu = (<MyInfo 
          grade={member?.grade?.customer_grade || 'null'}
          memberId={member?.customer_id || 'null'}
          name={member?.customer_name || 'null'}
          password={member?.customer_pw|| 'null'}
          phone={member?.customer_phone || 'null'}
          addr={member?.customer_address || 'null'}
        />);
    } else if (selectedMenu === 'MyReserv'){
        mainmenu = <MyReserv showReserve={showReserve} />;
    } else if (selectedMenu === 'MyReservDetail') {
      mainmenu = <MyReservDetail reservation_num={selectedReserv}/>;
    }else if (selectedMenu === 'MyAccount'){
        mainmenu = <MyAccount />;
    }else if (selectedMenu === 'DropOut'){
        mainmenu = <DropOut />;
    }else {
        mainmenu = (
            <main className={classes.content}>
                <h2>안녕하세요 [{member?.customer_name||'null'}] 님</h2>
                        <div className={classes.user_info}>
                            <p>회원님은 
                            <span style={{cursor: "pointer", color:"#fa2828"}} onClick={()=>{handleSelect("GradeInfo")}}><strong> {member?.grade?.customer_grade || 'null'} </strong></span>등급입니다.</p>
                            <p>아이디: <strong>{member?.customer_id|| 'null'}</strong></p>
                            <p>이름: <strong>{member?.customer_name || 'null'}</strong></p>
                            <p>비밀번호: *****</p>
                            <button className={classes.submit_btn} onClick={() => {handleSelect("MyInfo")}}>회원정보수정</button>
                        </div>
            </main>
        );
    }
    return (
        <>
        {/* <Header userInfo={userInfo}/> */}
        <Header />
        <div>
      <nav className={classes.top_navbar}>
      <div className={classes.logo} onClick={() => setSelectedMenu(null)}>마이페이지</div>
      <div className={classes.menu_item} id="GradeInfo"><a onClick={() => {handleSelect("GradeInfo")}}>회원등급</a></div>
      <div className={classes.menu_item} id="MyCalander"><a onClick={() => {handleSelect("MyCalander")}}>마이캘린더</a></div>
      <div className={classes.menu_item} id="MyInfo"><a onClick={() => {handleSelect("MyInfo")}}>회원정보수정</a></div>
      {member?.grade?.customer_grade === 'ADMIN' && (
      <div className={classes.menu_item} id="goAdmin"><a onClick={() => {navigate("/admin/main")}}>관리자페이지</a></div>)}
      </nav>
      <div className={classes.container}>
        <aside className={classes.sidebar}>
            <ul>
                <li>
                <div style={{ fontWeight: 'bold' }}>예약관리</div></li>
                <ul className={classes.submenu}>
                    <li><a className={classes.submenu} onClick={() => {handleSelect("MyReserv")}}>예매내역확인/취소</a></li>
                    <li><a className={classes.submenu} onClick={() => {handleSelect("MyCalander")}}>마이캘린더</a></li>
                </ul>
                <li><div style={{ fontWeight: 'bold' }}>회원정보관리</div></li>
                <ul className={classes.submenu}>
                    <li><a className={classes.submenu} onClick={() => {handleSelect("MyAccount")}}>환불계좌관리</a></li>
                    <li><a className={classes.submenu} onClick={() => {handleSelect("MyInfo")}}>회원정보수정</a></li>
                    <li><a className={classes.submenu} onClick={() => {handleSelect("DropOut")}}>회원탈퇴</a></li>
                    <li><a className={classes.submenu} style={{color:'#fa2828'}} onClick={handleLogout}>로그아웃</a></li>
                </ul>
            </ul>
        </aside>
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        {mainmenu}  
        </div>
      </div>
      </div>
      <Footer />
      </>
  )
}
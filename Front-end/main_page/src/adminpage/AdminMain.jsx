import { useEffect, useState } from 'react';
import classes from './AdminMain.module.css'
import Footer from '../mainpage/components/Footer';
import Header from '../mainpage/components/Header';
import axios from 'axios';
import MyInfo from '../mypage/MyInfo/MyInfo';
import AdminMusical from './musical/AdminMusical';
import AdminCustomer from './customer/AdminCustomer';
import MusicaDetail from './musical/MusicalDetail';
import { handleLogout } from '../login/Logout';
import AdminHall from './hall/AdminHall';

export default function AdminMain() {
    const [selectedMenu, setSelectedMenu] = useState();
    function handleSelect(menu) {
        setSelectedMenu(menu); // 선택한 메뉴 상태 업데이트
      }
      let adminmenu;

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
     
    if (selectedMenu === 'AdminMusical') {
        adminmenu = <AdminMusical />;
    } else if (selectedMenu === 'MusicaDetail') {
        adminmenu = <MusicaDetail />;
    } else if (selectedMenu === 'AdminCustomer') {
        adminmenu = <AdminCustomer />;
    } else if (selectedMenu === 'AdminHall') {
        adminmenu = <AdminHall />;
    } else if (selectedMenu === 'MyInfo') {
        adminmenu = (<MyInfo 
          grade={member?.grade?.customer_grade || 'null'}
          memberId={member.customer_id}
          name={member?.customer_name || 'null'}
          password={member?.customer_pw|| 'null'}
          phone={member?.customer_phone || 'null'}
          addr={member?.customer_address || 'null'}
        />);
    }  else {
        adminmenu = (
            <main className={classes.content}>
                <h2>안녕하세요 관리자<strong> [{member?.customer_name || 'null'}] </strong> 님</h2>
                        <div className={classes.user_info}>
                            <p>이 페이지에서는 공연 관리와 공연장 관리,</p>
                            <p>회원관리가 가능합니다.</p>
                        </div>
            </main>
        );
    }
    return (
        <>
          <Header />
          <div>
            <nav className={classes.top_navbar}>
                <div className={classes.logo} onClick={() => setSelectedMenu(null)}> 관리자 페이지 </div>
                <div className={classes.top_menu}>
                <div className={classes.menu_item} id="AdminMusical"><a onClick={() => {handleSelect("AdminMusical")}}>공연 관리</a></div>
                <div className={classes.menu_item} id="AdminHall"><a onClick={() => {handleSelect("AdminHall")}}>공연장 정보 관리</a></div>
                <div className={classes.menu_item} id="AdminCustomer"><a onClick={() => {handleSelect("AdminCustomer")}}>회원 관리</a></div>
                </div>
            </nav>
            <div className={classes.container}>
                <aside className={classes.sidebar}>
                    <ul>
                        <li>
                        <div>공연 관리</div></li>
                        <ul className={classes.submenu}>
                            <li><a onClick={() => {handleSelect("AdminMusical")}}>공연 정보 관리</a></li>
                            <li><a onClick={() => {handleSelect("MusicaDetail")}}>공연 상세 조회</a></li>
                            <li><a onClick={() => {handleSelect("AdminHall")}}>공연장 정보 관리</a></li>
                        </ul>
                        <li><div>회원 관리</div></li>
                        <ul className={classes.submenu}>
                            <li><a onClick={() => {handleSelect("AdminCustomer")}}>일반 회원 관리</a></li>
                            <li><a onClick={() => {handleSelect("MyInfo")}}>내 정보 관리</a></li>
                            <li><a style={{color:'#fa2828'}} onClick={handleLogout}>로그아웃</a></li>
                        </ul>
                    </ul>
                </aside>
                {adminmenu}  
                </div>
            </div>
    <Footer />
    </>
  )
}
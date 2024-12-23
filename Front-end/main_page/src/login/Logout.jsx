import axios from "axios";
export const handleLogout = () => {
    axios.get('https://muu-t-1.onrender.com/member/logout', { withCredentials: true }) // 로그아웃 API 호출
    .then(() => {
      sessionStorage.clear(); // 세션 스토리지 초기화
      window.location.href = '/';
      console.log('로그아웃 성공')
    })
    .catch((error) => {
      console.error('로그아웃 요청 중 오류가 발생했습니다:', error);
      alert('로그아웃에 실패했습니다.');
    });
}

export default handleLogout;
import React, { Children } from "react";
import { Navigate} from "react-router-dom";

const ProtectedRoute =({Children})=>{
    const user = currentUser; //현재 접속유저
    if(user === null) {
        alert("로그인이 필요한 서비스입니다.")
        return <Navigate to ="../login"/>; //로그인페이지로 이동
       }
    return Children; // 자식컴포넌트로 이동
}

export default ProtectedRoute // 추후 마이페이지 위아래에 씌워줘야함
                // 이런식으로 path:"mypage" element:(<ProtectedRoute><MyMain /></ProtectedRoute>)
import React from "react";
import { Navigate} from "react-router-dom";
import Cookies from "js-cookie";


const ProtectedRoute =({children})=>{
    const user = Cookies.get("customer_id")
    if(user === null) {
        alert("로그인이 필요한 서비스입니다.")
        return <Navigate to ="/"/>; //메인페이지로 이동
       }
    return children; // 자식컴포넌트로 이동
}

export default ProtectedRoute

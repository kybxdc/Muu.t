import { useNavigate } from "react-router-dom"


export default function PaymentSuc(){
    const navigate = useNavigate()
    return <>
        <div>
             <p>결제 성공!</p>
             <button onClick={()=>{navigate("/")}}>메인페이지로</button>
        </div>
    </>
}
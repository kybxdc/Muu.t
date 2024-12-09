import Reservation from "../Reservation";
import { useParams, useLocation } from "react-router-dom";

export default function Payment(){
    const performance_id = useParams().performance_id;
    const selectedSeats = useLocation().state || {};

    var oPay = Naver.Pay.create({
        "mode" : "development",
        "clientId": "HN3GGCMDdTgGUfl0kFCo",
        "chainId": "ZW5xd1JZNSt4dWt"
   });

   function handlePayment(){
    oPay.open({
        "merchantPayKey": "20241129DEFAXm",
        "productName": "뮤지컬 지킬앤하이드(Jekvll & Hvde)-20주년",
        "productCount": "1",
        "totalPayAmount": "120000",
        "taxScopeAmount": "120000",
        "taxExScopeAmount": "0",
        "returnUrl": "https://developers.pay.naver.com/user/sand-box/payment"
      });
   }

    return (
        <Reservation locations="payment" handlePayment={handlePayment} performance_id={performance_id} selectedSeats={selectedSeats}>
            <input type="button" id="naverPayBtn" value="네이버페이 결제 버튼"
                onClick={handlePayment}></input>
        </Reservation>
    );
}
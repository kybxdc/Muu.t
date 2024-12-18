import { useContext, useEffect, useState } from "react";
import { ReservationCtx } from "../reservationContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const {reserveInfo, totalPrice, customer, selectedSeats, performance_id} = useContext(ReservationCtx);
    const [UUID, setUUID] = useState();
    const navigate = useNavigate();
      
    useEffect(()=>{
      const fetchUUID = async () => {
        try{
          const response = await fetch("/api/reserve/uuid");
          setUUID(await response.text())
        }catch(e){
          console.log(e);
        }
      }
      fetchUUID();
    },[])

  var oPay = Naver.Pay.create({
    mode: "development",
    clientId: "HN3GGCMDdTgGUfl0kFCo",
    chainId: "ZW5xd1JZNSt4dWt",
    openType: "popup",
    onAuthorize: function(oData){
      if(oData.resultCode==="Success"){
        const paySuc = async () => {
          try{
            const response = await fetch("/api/reserve/save",{
              method: "POST",
              headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "customer": `${customer.customer_email}`,
                "payment_amount": `${totalPrice}`,
                "seat_num": JSON.stringify(selectedSeats),
                "performance": `${performance_id}`,
              })
            })
            if(response.ok){
              navigate("/paymentsuc")
            }else{
              alert("실패")
            }
          }catch(e){
            console.log(e);
          }
        }
        paySuc();
      }else{
        alert("결제 실패");
      }
    }
  });

  function handlePayment() {
    oPay.open({
      merchantPayKey: `${UUID}`,
      productName: `${reserveInfo.title}`,
      productCount: "1",
      totalPayAmount: `${totalPrice}`,
      taxScopeAmount: `${totalPrice}`,
      taxExScopeAmount: "0",
      returnUrl: "callback",
    });
  }
  return (
    <input
      type="button"
      id="naverPayBtn"
      value="네이버페이 결제 버튼"
      onClick={handlePayment}
    ></input>
  );
}

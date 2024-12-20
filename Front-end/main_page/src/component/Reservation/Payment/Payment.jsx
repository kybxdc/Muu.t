import { useContext, useEffect, useState } from "react";
import { ReservationCtx } from "../reservationContext";

export default function Payment() {
    const {reserveInfo, totalPrice, customer, selectedSeats, performance_id, handleBeforeUnload, seats} = useContext(ReservationCtx);
    const [UUID, setUUID] = useState();
      
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

    let reserveSeats = seats.filter(seat=>selectedSeats.includes(seat.id))
                            .map(seat=>({id:seat.id, grade:seat.grade.grade, price:seat.grade.price}));

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
                "seat_num": JSON.stringify(reserveSeats),
                "performance": `${performance_id}`,
              })
            })
            if(response.ok){
              alert("결제가 성공하였습니다!");
              window.removeEventListener("beforeunload",handleBeforeUnload);
              window.close();
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

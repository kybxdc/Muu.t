import { useContext } from "react";
import { ReservationCtx } from "../reservationContext";

export default function Payment() {
    const {reserveInfo, totalPrice} = useContext(ReservationCtx);

  var oPay = Naver.Pay.create({
    mode: "development",
    clientId: "HN3GGCMDdTgGUfl0kFCo",
    chainId: "ZW5xd1JZNSt4dWt",
  });

  function handlePayment() {
    oPay.open({
      merchantPayKey: "20241129DEFAXm",
      productName: `${reserveInfo.title}`,
      productCount: "1",
      totalPayAmount: `${totalPrice}`,
      taxScopeAmount: `${totalPrice}`,
      taxExScopeAmount: "0",
      returnUrl: "https://developers.pay.naver.com/user/sand-box/payment",
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

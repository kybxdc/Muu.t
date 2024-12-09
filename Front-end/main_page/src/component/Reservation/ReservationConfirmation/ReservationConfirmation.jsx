import Reservation from "../Reservation";
import "./ReservationConfirmation.css";
import Table from "../../Util/Table/Table";
import Input from "../../Util/Input/Input";
import Checkbox from "../../Util/Checkbox/Checkbox";
import { useParams, useLocation } from "react-router-dom";

export default function ReservationConfirmation() {
  const performance_id = useParams().performance_id;
  const selectedSeats = useLocation().state || {};
  return (
    <Reservation locations="reserve" performance_id={performance_id} selectedSeats={selectedSeats}>
      <div className="confirmation-main">
        <Table
          titleName={"주문자 정보"}
          th1={
            <>
              이름 <span className="asterisk">*</span>
            </>
          }
          td1={"홍길동"}
          th2={
            <>
              휴대폰 번호 <span className="asterisk">*</span>
            </>
          }
          td2={
            <div className="input-block">
              <Input type="text" defaultValue="01012341234" />
            </div>
          }
          th3="이메일"
          td3={
            <div className="input-block">
              <Input type="email" defaultValue="myEmail@gmail.com" />
            </div>
          }
        />
        <div>
          <Table
            titleName={"예매자 확인"}
            td1={
              <Checkbox
                labelText={
                  "주문자 확인 및 예매처리를 위해 개인정보를 수집하며, 이용목적 달성 이후 파기합니다."
                }
                id = "checkbox1"
              />
            }
            td3={
              <Checkbox
                labelText={
                  "개인정보 제3자 제공에 동의합니다.(고객응대 및 관람정보안내 등을 위함)"
                }
                id = "checkbox2"
              />
            }
          />
        </div>
      </div>
    </Reservation>
  );
}

import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { Seat } from "./seatContext";

const GradeModal = forwardRef(function GradeModal({}, ref) {
  const dialog = useRef();
  const {gradeSeats} = useContext(Seat);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog}>
      <div>좌석등급 적용상태</div>
      <div>
        {gradeSeats.map(seat=><p key={seat.id}>
            <span style={{marginRight:"20px"}}>좌석:{seat.id}</span>
            <span style={{marginRight:"20px"}}>등급:{seat.grade.grade}</span>
            <span style={{marginRight:"20px"}}>가격:{seat.grade.price}</span>
        </p>)}
      </div>
      <form method="dialog">
        <button className="button">닫기</button>
      </form>
    </dialog>
  );
});

export default GradeModal;

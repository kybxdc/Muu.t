import { Link } from "react-router-dom";

import styles from "./BookingSeat.module.css";

export default function BookingSeat({performanceId}) {
  return (
    <div>
      {/* <Link to={`/reservation/${performanceId}/seatview`}> */}
        <button onClick={()=>{window.open(`/reservation/${performanceId}/seatview`,"팝업창",                // 팝업 이름
  "width=1800,height=1000,scrollbars=yes,resizable=yes" )}}>예매</button>
      {/* </Link> */}
    </div>
  );
}

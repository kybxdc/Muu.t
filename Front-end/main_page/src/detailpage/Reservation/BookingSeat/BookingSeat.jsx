import { Link } from "react-router-dom";

import styles from "./BookingSeat.module.css";

export default function BookingSeat({performanceId}) {
  return (
    <div>
      <Link to={`/reservation/${performanceId}`}>
        <button>예매</button>
      </Link>
    </div>
  );
}

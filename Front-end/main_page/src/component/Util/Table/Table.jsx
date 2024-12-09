export default function Table({ titleName, th1, td1, th2, td2, th3, td3 }) {
  return (
    <>
      <div className="title-box">
        <h4 className="title">{titleName}</h4>
      </div>
      <table className="user-info-table">
        <tbody>
          <tr className="tr-border-bottom tr-weight">
            {th1&&<th>{th1}</th>}
            {td1&&<td>{td1}</td>}
            {th2&&<th>{th2}</th>}
            {td2&&<td>{td2}</td>}
          </tr>
          <tr className="tr-weight">
            {th3&&<th>{th3}</th>}
            {td3&&<td>{td3}</td>}
          </tr>
        </tbody>
      </table>
    </>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SeatInfo() {
  const [cols, setCols] = useState("");
  const [colObject, setColObject] = useState({});

  const navigate = useNavigate();

  const hall_id = useParams().hall_id;

  useEffect(()=>{
    if(!/^\d+$/.test(hall_id)){
      navigate("/");
    }
  },[hall_id, navigate])

  function makeRow(e) {
    e.preventDefault();
    let tempObject = {};
    for (let i = "A".charCodeAt(0); i <= cols.charCodeAt(0); i++) {
      if(colObject[String.fromCharCode(i)]==undefined){
        tempObject[String.fromCharCode(i)] = [null, null];
      }else{
        tempObject[String.fromCharCode(i)] = colObject[String.fromCharCode(i)];
      }
    }
    setColObject(tempObject);
  }

  function handleColChange(e) {
    if (e.target.value.length > 1) {
      return;
    }
    let value = e.target.value.toUpperCase();
    if ((value >= "A".charAt(0) && value <= "Z".charAt(0)) || value == "") {
      setCols(value);
    } else {
      alert("영문자를 입력해 주세요");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let nullCheck = false;

    Object.keys(colObject).map((col) => {
      if (colObject[col][0] == null || colObject[col][1] == null) {
        nullCheck = true;
        alert(col+"열의 값을 입력해주세요");
        return;
      }
      if(colObject[col][0]>=colObject[col][1]){
        nullCheck = true;
        alert(col+": 시작 번호가 끝 번호보다 작거나 같습니다.");
        return;
      }
    });

    const transferJson = {};
    transferJson[hall_id] = colObject
    console.log(JSON.stringify(transferJson));

    if (!nullCheck) {
      try {
        const response = await fetch("/api/seat/seatinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transferJson),
        });
        if (!response.ok) {
          throw new Error("서버 요청 실패");
        }

        const result = await response.text();
        console.log("서버 응답: ", result);
        window.location.href = "../seatedit/"+hall_id;
      } catch (error) {
        console.error("에러 발생: ", error);
      }
    }
  };

  return (
    <>
      <h1>관리자 페이지(좌석 정보 입력)</h1>
      <label>
        마지막 열 : &nbsp;
        <input
          type="text"
          name="cols"
          value={cols}
          onChange={handleColChange}
        />
      </label>
      {Object.keys(colObject).length > 0 && <div>행의 개수</div>}
      {Object.keys(colObject).length > 0 &&
        Object.keys(colObject).map((col) => (
          <div key={`col${col}`}>
            <label>
              {col}
              <input
                type="text"
                onChange={(e) => {
                  if (
                    e.target.value < 0 ||
                    e.target.value > 99 ||
                    isNaN(e.target.value)
                  ) {
                    alert("0~99 사이의 숫자를 입력하세요");
                    e.target.value = "";
                    colObject[col][0] = null;
                    return;
                  }
                  colObject[col][0] = Number(e.target.value);
                }}
                placeholder="시작 번호"
              />
              <input
                type="text"
                onChange={(e) => {
                  if (
                    e.target.value < 0 ||
                    e.target.value > 99 ||
                    isNaN(e.target.value)
                  ) {
                    alert("0~99 사이의 숫자를 입력하세요");
                    e.target.value = "";
                    colObject[col][1] = null;
                    return;
                  }
                  colObject[col][1] = Number(e.target.value);
                }}
                placeholder="끝 번호"
              />
            </label>
            <button onClick={()=>{console.log(colObject[col])}} hidden={true}>테스트를 위한 버튼</button>
          </div>
        ))}

      <button
        type="submit"
        disabled={colObject["A"] ? false : true}
        onClick={handleSubmit}
      >
        전송
      </button>
      <button onClick={makeRow}>열 입력</button>
    </>
  );
}

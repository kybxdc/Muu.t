import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Input from "../Util/Input/Input";
import infoClasses from './SeatInfo.module.css'

export default function SeatInfo() {
  const [cols, setCols] = useState("");
  const [colObject, setColObject] = useState({});
  const [hallName, setHallName] = useState("");

  const navigate = useNavigate();

  const hall_id = useParams().hall_id;

  useEffect(() => {
    if (!/^\d+$/.test(hall_id)) {
      navigate("/");
    }
    (async function () {
      try {
        const response = await fetch(`https://muu-t.onrender.com/api/seat/hall/${hall_id}`);

        if (response.ok) {
          setHallName(await response.text());
        } else {
          alert("불러오기 실패");
          navigate("/admin/main");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  function makeRow(e) {
    e.preventDefault();
    let tempObject = {};
    for (let i = "A".charCodeAt(0); i <= cols.charCodeAt(0); i++) {
      if (colObject[String.fromCharCode(i)] == undefined) {
        tempObject[String.fromCharCode(i)] = [null, null];
      } else {
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
        alert(col + "열의 값을 입력해주세요");
        return;
      }
      if (colObject[col][0] >= colObject[col][1]) {
        nullCheck = true;
        alert(col + ": 시작 번호가 끝 번호보다 작거나 같습니다.");
        return;
      }
    });

    const transferJson = {};
    transferJson[hall_id] = colObject;
    console.log(JSON.stringify(transferJson));

    if (!nullCheck) {
      try {
        const response = await fetch("https://muu-t.onrender.com/api/seat/seatinfo", {
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
        window.location.href = "../seatedit/" + hall_id;
      } catch (error) {
        console.error("에러 발생: ", error);
      }
    }
  };

  return (
    <>
    <div className={infoClasses.info_body}>
      <h1>{hallName}(좌석 정보 입력)</h1>
      <div>
        <label className={infoClasses.col_input}>
          마지막 열 : &nbsp;
          <Input
            type="text"
            name="cols"
            value={cols}
            onChange={handleColChange}
          />
        </label>
        {Object.keys(colObject).length > 0 && <div style={{marginBottom:"11px"}}>번호 입력</div>}
        {Object.keys(colObject).length > 0 &&
          Object.keys(colObject).map((col) => (
            <div key={`col${col}`} className={infoClasses.row_input_div}>
              <label>
                {col}
                <input
                  className={infoClasses.row_input}
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
            </div>
          ))}
        <button
          type="button"
          disabled={colObject["A"] ? false : true}
          onClick={handleSubmit}
          className="button"
        >
          전송
        </button>
        <button onClick={makeRow} className="button">
          열 입력
        </button>
        <Link to={"../main"} className={infoClasses.link_admin}>관리자 메뉴로 이동</Link>
      </div>
    </div>
    </>
  );
}

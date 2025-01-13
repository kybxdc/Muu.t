import classes from './GradeInfo.module.css';
export default function GradeInfo() {
    return(
    <div style={{ margin: '20px' , marginBottom :'20%'}}>
        <div className={classes.gradeInfo_container}>
            <h2>
                Muu.t의 우수고객은 최근 6개월의 실적(예매 확정 건)을<br />
                기준으로 매월 10일에 등급이 부여됩니다.
            </h2>
            <div className={classes.gradeInfo}>
                [ 우수고객 등급 선정 기준 안내 ]
                <br />
                • VVIP - 예매 20건 이상, 결제 150만원 이상
                <br />
                • VIP - 예매 10건 이상, 결제 80만원 이상
                <br />
                • FAMILY - 예매 3건 이상, 결제 30만원 이상
            </div>
            <div className={classes.gradeInfo}>
                [ 우수고객 등급 조정 안내 ]
                <br />
                • Muu.t의 우수고객은 최근 6개월 구매 실적을 기준으로 하며,<br />
                할인적용금액, 수수료 결제 금액은 제외됩니다.
                <br />
                • 구매횟수 조건과 주문금액 조건을 모두 충족해야 합니다.
                <br />
                • 최근 6개월의 주문 실적 중 우수회원 등급에 따른 주문 금액과<br />
                주문 건수를 모두 충족할 경우 등급이 상향 조정됩니다.
                <br />
                • 주문금액 조건과 주문 건수 조건이 현재 등급에<br />
                하나라도 충족되지 않을 경우 하향 조정됩니다.
            </div>
            <div className={classes.gradeInfo}>
                [ 우수고객 등급 및 혜택 안내 ]
                <br />
                • VVIP - 우수회원 15% 추가 할인
                <br />
                • VIP - 우수회원 10% 추가 할인
                <br />
                • FAMILY - 우수회원 5% 추가 할인
            </div>
        </div>
    </div>
    );
}
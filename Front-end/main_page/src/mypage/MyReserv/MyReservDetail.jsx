// import { useLocation } from "react-router-dom";
import classes from './MyReservDetail.module.css/';

export default function MyReservDetail(){

    // const location = useLocation();
    // const { reserv } = location.state || {};

    return(
    <>
        <div>
            <main className={classes.Musical_detail} >
                <section className={classes.Musical_detail}>
                    <h2>예매정보</h2>
                    <table>
                    <tr className={classes.info}>
                            <td className={classes.info}>제목</td>
                            <td className={classes.info}></td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>공연장</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>관람일시</td>
                            <td className={classes.info}></td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>예매일</td>
                            <td className={classes.info}></td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>결제수단</td>
                            <td className={classes.info}></td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>예매자</td>
                            <td className={classes.info}></td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>티켓수령</td>
                            <td className={classes.info} style={{color:'#fa2828'}}>현장수령</td>
                        </tr> 
                        <tr className={classes.info}>
                            <td className={classes.info}>현재상태</td>
                            <td className={classes.info}></td>
                        </tr> 
                    </table>
                </section>
                <section className={classes.Musical_detail}>
                    <h2>예매내역</h2>
                    <table>
                        <tr className={classes.info}>
                            <td className={classes.info}>예매번호</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석등급</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>좌석번호</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>결제가격</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소여부</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소가능일</td>
                            <td className={classes.info}></td>
                        </tr>
                    </table>
                </section>
                <section className={classes.Musical_detail}>
                    <h2>결제정보</h2>
                    <table>
                        <tr className={classes.info}>
                            <td className={classes.info}>티켓금액</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>예매수수료</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>할인적용</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>총결제금액</td>
                            <td className={classes.info}></td>
                        </tr>
                    </table>
                </section>
                <section className={classes.Musical_detail}>
                    <h2>유의사항</h2>
                    <table>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소 마감시간</td>
                            <td className={classes.info}></td>
                        </tr>
                        <tr className={classes.info}>
                            <td className={classes.info}>취소수수료</td>
                            <td className={classes.info} style={{color : '#bbb'}}>
                                <div >
                            예매수수료는 예매일 이후 취소시에는 환불되지 않습니다.<br/><br/>
                            동일 상품에 대해서 날짜, 시간, 좌석, 가격 등급, 결제 등의 일부 변경을 원하시는 경우, 기존 예매 건을 취소하시고 재예매 하셔야 합니다. 단, 취소 시점에 따라 예매수수료가 환불 되지 않으며,취소수수료가 부과될 수 있습니다.<br/>
                            (할인선택은 재예매 시점에 적용되는 할인률로만 적용 가능합니다.)<br/><br/>
                            이미 배송이 시작된 티켓의 경우 인터넷 및 전화로 취소할 수 없습니다. 반드시 취소마감 시간 이전에 티켓이 인터파크 고객센터로 반송되어야 취소가능하며, 취소수수료는 도착일자 기준으로 부과됩니다.<br/>
                            (* 단, 배송료는 환불되지 않으며 일괄배송 상품의 경우 취소에 대한 자세한 문의는 고객센터로 문의해주시기 바랍니다.)<br/><br/>
                            예매취소시점과 해당 카드사의 환불 처리기준에 따라 취소금액의 환급방법과 환급일은 다소 차이가 있을 수 있습니다. 예매 취소 시 최초 결제 동일카드로 예매 시점에 따라 취소 수수료와 배송료를 재승인합니다. 신한카드 포인트로 결제하신 경우, 포인트(5천포인트이상시)에서 먼저 재승인을 하고, 차액만 카드에서 승인합니다.<br/><br/>
                            티켓 부분 취소 시 할부 결제는 티켓 예매 시점으로 적용됩니다. (무이자할부 행사기간이 지날 경우 혜택받지 못하실 수 있으니 유의하시기 바랍니다)<br/><br/>
                            휴대폰결제로 예매하신 분은 휴대폰결제 이용료가 수수료에 함께 부과됩니다. 예매취소시는 환원됩니다.<br/><br/>
                            </div></td>
                        </tr>
                    </table>
                </section>
            </main>
        </div>
    </>
    )
}
import classes from '../MyReservDetail.module.css/';
export default function PayInfo({id}){
    const reservation_num = id;
    return(
        <>
         <section className={classes.Musical_detail}>
                            <h2>결제정보</h2>
                            <table>
                                <tr className={classes.info}>
                                    <td className={classes.info}>티켓금액</td>
                                    <td className={classes.info1}></td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>예매수수료</td>
                                    <td className={classes.info1}></td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>할인적용</td>
                                    <td className={classes.info1}></td>
                                </tr>
                                <tr className={classes.info}>
                                    <td className={classes.info}>총결제금액</td>
                                    <td className={classes.info1}></td>
                                </tr>
                            </table>
                        </section>
        </>
    )
}
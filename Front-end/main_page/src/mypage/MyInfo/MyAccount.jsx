import classes from './MyAccount.module.css';

export default function MyAccount() {
    return(
        <>
        <main className="Account">
        <br/><h2>환불 받을 계좌를 입력해주세요</h2>
        <br/>
        <form>
            <input type="text" placeholder="은행명"></input>
            <input type="text" placeholder="계좌번호(-없이 숫자만 입력해주세요)"></input>
            <br/><br/><br/>
            <p><button className={classes.account_btn}>계좌등록</button></p>
        </form>
        </main>
        </>
    )
}
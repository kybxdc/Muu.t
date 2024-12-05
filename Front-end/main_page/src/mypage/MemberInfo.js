import axios from "axios";

const MYPAGE = "http://localhost:9090/mypage/customer";
export default class MemberService{
    getMember(){
        return axios.get(MYPAGE);
    }
}
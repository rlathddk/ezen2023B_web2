import axios from "axios";

 // 로그아웃 함수
 export default function Logout(props){
    const logOut = () =>{
        axios.get('/member/logout/get.do')
        .then((r)=>{
            console.log(r);
            if(r.data){
                alert('로그아웃 성공');
                window.location.href="/";
            }else{
                alert('로그아웃 실패')
            }
        })
    }
    logOut();
 }
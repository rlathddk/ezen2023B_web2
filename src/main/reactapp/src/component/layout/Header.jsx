import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { LoginInfoContext } from "../Index";

export default function Header(props){
    
    // - provider 컴포넌트의 value 호출
    const{loginInfo, setLoginInfo} = useContext(LoginInfoContext)

    // 컴포넌트 생성시 axios 실행해서 로그인 회원정보 호출
    // 1. 컴포넌트가 실행될 때 1번 axios 요청 보내서 회원정보 가져온다
    useEffect(()=>{
        axios.get('/member/login/info/get.do')
        .then(r => {console.log(r);
            setLoginInfo(r.data); // 현재 로그인정보를 state 담는다
        })
        .catch(e=>{console.log(e)})
    }, []);

    // 2. 로그아웃
    const onLogOut = ()=>{
        axios.get('/member/logout/get.do')
        .then((r)=>{
            console.log(r);
            if(r.data){
                alert('로그아웃 성공');
                window.location.href="/member/login";
            }else{
                alert('로그아웃 실패');
            }
        })
        setLoginInfo('');
    }
        
    return(<>
        <div>
            {loginInfo && <span>{loginInfo.memail}님 안녕하세요.</span>}
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/member/signup">회원가입</Link></li>
                <li><Link to="/member/login">로그인</Link></li>
                <li><button onClick={onLogOut} type="button" >로그아웃</button></li>
                <li><a href="/board/BoardWrite">글쓰기</a></li>
                <li><a href="/board/BoardList">전체글보기</a></li>
                <li><a href="/Chat/Chatting">채팅방</a></li>
            </ul>
        </div>
    </>)
}
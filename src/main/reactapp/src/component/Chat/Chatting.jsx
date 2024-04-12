import { useContext, useEffect, useRef, useState } from "react";
import { LoginInfoContext } from "../Index";
import styles from './Chatting.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Chatting(props){

    // 1. 해당 컴포넌트가 렌더링 될 때 소켓은 재랜더링 방지 useRef
        // useRef(초기값) : {current : 값}
        // - 컴포넌트가 랜더링시 참조값을 고정할 수 있다.
    let clientSocket = useRef(null);

    if(!clientSocket.current){
        
        // ============ (클라이언트) 웹소켓 구현 ============= //
            // 1. new WebSocket(서버소켓 url); // 비동기
        clientSocket.current = new WebSocket('ws://192.168.17.33:8080/Chat');
        // 확인
        console.log(clientSocket);
            // 2. 각 메소드 정의
                // - 1. 클라이언트소켓이 close 되었을 때 콜백함수 정의
        clientSocket.current.onclose = (e)=>{console.log('소켓 닫힘');}
                // - 2. 클라이언트소켓이 error 발생했을 때 콜백함수 정의(*error 이미 발생했고)
        clientSocket.current.onerror = (e) =>{console.log('소켓 에러');}
                // - 3. 클라이언트소켓이 message 받았을 때 콜백함수 정의
        clientSocket.current.onmessage = (e) => {console.log(e);
            msgList.push(JSON.parse(e.data)); // 받은 state 저장
            setMsgList([...msgList]);
        }
                // - 4. 클라이언트소켓이 open 발생했을 때 콜백함수 정의
        clientSocket.current.onopen = (e) => {console.log('서버소켓연결성공');}

    }



    const {loginInfo} =  useContext(LoginInfoContext);



        // 현재날짜 시간
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;






    const onSend = (e) => { 
        let info = {
            msg : msgInput,                 // 작성된 내용
            fromMname : loginInfo.mname,  // 현재 로그인 작성자
            formattedDate : formattedDate,
            type : 'msg'
        }
        // 3. 연결된 서버소켓에게 메시지 보내기 
            // send() : 데이터 타입 : 텍스트 (HTTP 프로토콜)
                // JSON -> 문자 : JSON.stringify(js객체) // 문자 <- JSO : JSON.parse(문자열)
        clientSocket.current.send(JSON.stringify (info)); // 입력받은 데이터를 서버소켓에게 보내기
        e.preventDefault(); // 이벤트 일어나는 거 막는거
        setMsgInput('');

    }
    
    // - 채팅 내용 입력창
    const [msgInput, setMsgInput] = useState('');
    // - 채팅창의 내용물들 
    const [msgList, setMsgList] = useState([]);
    // - 채팅 내용 입력창에서 엔터를 했을 때 / ctrl+엔터 했을 때
    const activeEnter = (e) =>{
        console.log(e);
        // 1. ctrl + 엔터 했을 때
        if(e.keyCode == 13 && e.ctrlKey){
            setMsgInput(msgInput + '\n'); return;
        }
        // 2. 엔터 했을 때
        if(e.keyCode == 13){ // keyCode는 정해져있는 거 13번 = 엔터
            onSend(e); return;
        }  
    }

    // - 스크롤 자동으로 최하단으로 내리기
    useEffect(()=>{
        let chatcont = document.querySelector('.chatcont')
        console.log(chatcont.scroll)
        console.log(chatcont.scrollTop) // 스크롤 하단은 지원x 
        console.log(chatcont.scrollHeight) // 스크롤 전체 높이길이 (본문이 길어졌기 때문에)
        // 2. 
        chatcont.scrollTop = chatcont.scrollHeight; // 상단 위치를 최하단으로 이동
    })
    
    // 드랍다운 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    console.log(Array(43));
    console.log(Array(43).fill(6));

    // - 이모티콘 이미지 클릭했을 때 전송
    const onEmoSend = (emo) => {
        let info = {
            msg : emo, // 이모티콘 식별자
            fromMname : loginInfo.mname, // 작성자
            formattedDate : formattedDate,
            type : 'emo' // 메시지 타입(출력시 식별하기 위해)
        }
        clientSocket.current.send(JSON.stringify(info));
        // - 드롭다운 닫기
        handleClose();
    }

    // - msg타입에 따른 HTML 반환 함수
    const typeHTML = (m) => {
        if(m.type == 'msg'){
            return <div className="content">{m.msg}</div>
        }else if (m.type == 'emo'){
            return<img src={'/emo/'+m.msg}/>
        }
    } 



    return(<>
        <div>
            <h3>채팅방</h3>
            <div className="chatbox">
                <div className="chatcont">
                    {
                        msgList.map((m)=>{
                            return(<>
                                {
                                    loginInfo.mname == m.fromMname ?
                                    (
                                    <div className="rcont">
                                        <div className="subcont">
                                            <div className="date">{m.formattedDate}</div>
                                            {typeHTML(m)}
                                        </div>
                                    </div>
                                    ) :
                                    <div className="lcont" >
                                        <img className="pimg" src="/uploadimg/default.jpg" />
                                        <div className="tocont">
                                            <div className="name">{m.fromMname}</div>
                                            <div className="subcont">
                                                {typeHTML(m)}
                                                <div className="date">{m.formattedDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>)
                        })
                    } 
                </div>
                <div className="chatbottom">
                    <textarea value={msgInput} onChange={(e)=>{setMsgInput(e.target.value)}} onKeyDown={activeEnter}></textarea>
                    <button type="button" onClick={onSend}>전송</button>
                </div>        
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        이모티콘
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <div style={{height : 200, overflowY : 'scroll'}}>
                        {
                            Array(43).fill().map((v, i)=>{
                                return(<>
                                <img src={`/emo/emo${i+1}.gif`} onClick={()=> onEmoSend(`emo${i+1}.gif`)}/>
                                {(i+1) % 5 == 0 && <br/>}
                                </>)
                            })
                        }
                        </div>
                    </Menu>
                </div>
            </div> 
        </div>
    </>)
}
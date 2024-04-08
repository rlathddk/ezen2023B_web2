import { useRef, useState } from "react";

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
            msgList.push(e.data);
            setMsgList([...msgList]);
        }
                // - 4. 클라이언트소켓이 open 발생했을 때 콜백함수 정의
        clientSocket.current.onopen = (e) => {console.log('서버소켓연결성공');}

    }



    const onSend = () => {
        // 3. 연결된 서버소켓에게 메시지 보내기 
        clientSocket.current.send(msgInput); // 입력받은 데이터를 서버소켓에게 보내기
    }
    
    // - 채팅 내용 입력창
    const [msgInput, setMsgInput] = useState('');
    // - 채팅창의 내용물들 
    const [msgList, setMsgList] = useState([]);
    return(<>
        <div>
            <h3>채팅방</h3>
            <div>
                {
                    msgList.map((msg)=>{
                        return(<div>{msg}</div>)
                    })
                }
            </div>
            <textarea value={msgInput} onChange={(e)=>{setMsgInput(e.target.value)}}/>
            <button type="button" onClick={onSend}>전송</button>
        </div>
    </>)
}
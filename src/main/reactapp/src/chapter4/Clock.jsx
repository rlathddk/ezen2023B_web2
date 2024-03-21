export default function Clock(props){
    let name = '유재석';
    //===== JSX 문법 들어가는 곳 ====
    // <div> -> 의미없는 구역 만들어 둬야 함 (2개 이상일 경우)
    return(
       <div> 
            <h1>안녕, 리액트</h1>
            <h2>현재 시간 : {new Date().toLocaleTimeString()}</h2>
       </div>
    )
    // ============================
}
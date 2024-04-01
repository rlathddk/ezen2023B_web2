import axios from "axios";
import { useState } from "react";

export default function BoardWrite(props){
    // 상태변수
    const [bcontent, setBcontent] = useState('')

    // 
    const onChangeBcontent =(e) => {setBcontent(e.target.value);}

    // 전송함수
    const onWrite = (e) => {

        // 1. 전송할 폼 가져온다.
        const writeForm = document.querySelector('#writeForm')
        console.log(writeForm);
        // 2. 데이터폼으로 변환
        const writeFormData = new FormData(writeForm);
        console.log(writeFormData);

        axios.post('/board/post.do', writeFormData)
            .then((r)=>{console.log(r);
                if(r.data){
                    alert('글쓰기 등록완료');
                   
                }else{
                    alert('글쓰기 실패')
                }
            })
            .catch((e)=>{console.log(e);})
    }
    
    return(<>
        <form id="writeForm">
            내용 : <input type="text" name="bcontent" value={bcontent} onChange={onChangeBcontent}/>
            <button type="button" onClick={onWrite} >등록</button>
        </form>
    </>)
}
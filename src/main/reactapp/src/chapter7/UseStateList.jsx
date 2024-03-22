import { useState } from "react";

export default function UseStateList(props){

    // 2. point 상태관리변수
        // 1. input에 입력된 값
    let [pointInput, setPointInput] = useState(''); 
        // 2. input에 입력된 값들을 저장하는 리스트 상태관리변수
    let [pointList, setPointList] = useState([]);// 여러개하고 싶으면 배열로 

    // 1. 등록 버튼 클릭 시 
    function 등록(){ console.log('등록()');

        // ===== 리액트 방식 =====//
        pointList.push(pointInput);
        setPointList([...pointList]);
        //
        

    // ===== 고전 방식 =====//
    // // 1.
    // let value = document.querySelector('.pointInput').value;
    // // 2.
    // console.log(value);

    
    }; // f end
    // value={point} 불변 ,읽기모드 so onChange 써야함
    function 입력변경(e){
        setPointInput(e.target.value); // 재랜더링
    }
    return(<>
        <div>
            <div>
                <input value={pointInput} type="text" onChange={입력변경}/>
                <button type="button" onClick={등록}>등록</button>
            </div>
            <div>
                {
                    pointList.map((point)=>{
                        return(<div>{point}</div>)
                    })
                }
            </div>
        </div>
    </>)
}
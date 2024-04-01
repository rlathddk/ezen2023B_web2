import axios from "axios"
import { useEffect, useState } from "react"

export default function BoardList(props){

    // 담기
    const [boardlist, setBoardlist] = useState([])

    //
    useEffect( ()=>{
        axios.get('/board/get.do')
        .then(r => {console.log(r);
            setBoardlist(r.data)
        })
        .catch(e=>{console.log(e)})
    } , [ ] )

    return(<>
    <table>
        <thead>
            <th>내용</th>
            <th>작성자</th>
        </thead>
        <tbody>
    {
        boardlist.map((board)=>{
            return(
                <tr>
                    <td>{board.bcontent}</td>
                    <td>{board.memail}</td>
                </tr>
            )
        })
    }
        </tbody>
    </table>
    </>)
}
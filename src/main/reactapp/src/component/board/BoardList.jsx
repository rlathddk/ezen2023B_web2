import axios from "axios"
import { useEffect, useState } from "react"
import MediaCard from "./MediaCard"

export default function BoardList(props){

    // 1. useState 변수 (담기)
    const [boardlist, setBoardlist] = useState([])

    // 2. 
    useEffect( ()=>{
        axios.get('/board/get.do')
        .then(r => {console.log(r);
            setBoardlist(r.data)
        })
        .catch(e=>{console.log(e)})
    } , [ ] )

    return(<>
         <div style={{display:"flex"}}>
        {
            boardlist.map((board)=>{
                return(
                    <MediaCard board ={board}/>
                )
            })
        }
         </div>
    </>)
}
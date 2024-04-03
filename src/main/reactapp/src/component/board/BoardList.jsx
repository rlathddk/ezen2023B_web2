import axios from "axios"
import { useEffect, useState } from "react"
import MediaCard from "./MediaCard"
import Pagination from '@mui/material/Pagination';

export default function BoardList(props){

    // 1. useState 변수 (담기)
    const [pageDto, setPageDto] = useState({
        page : 1, count : 0, data : []
    });


    // 2. 
    const getBoard = ()=>{
        const info = {page : pageDto.page, view : 4}
        axios.get('/board/get.do', {params : info })
        .then(r => {console.log(r);
            // setBoardlist(r.data)
            setPageDto(r.data);
        })
        .catch(e=>{console.log(e)})
    }
    // 2.
    useEffect(getBoard,[pageDto.page])

    const handleChange =(e, value) => {
        pageDto.page = value
        setPageDto({...pageDto});
    };

    return(<>
         <div style={{display:"flex", flexWrap : "wrap"}}>
        {
            pageDto.data.map((board)=>{
                return(
                    <MediaCard board ={board} getBoard={getBoard}/>
                )
            })
        }
         </div>
         <Pagination count={pageDto.count} page={pageDto.page} onChange={handleChange} />
    </>)
}

// count : the total number of pages                 총 페이지수
// page : The current page.                          현재 페이지수
// onChage : Callback fired when the pagei s changed
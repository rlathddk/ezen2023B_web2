import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useContext } from 'react';
import { LoginInfoContext } from '../Index';

export default function MediaCard(props) {


  const {loginInfo} = useContext(LoginInfoContext);
  console.log(loginInfo);

  const onDelete = (event, bno, mno_fk)=>{
    console.log(mno_fk);
    if(mno_fk !== loginInfo.mno){
      alert('게시물 삭제 불가능')
      return;
    }
    axios.delete('/board/delete.do', {params:{bno:bno}})
      .then(r=>{console.log(r);
        // 1. get방식
        //window.location.href = "/board";})
        // 2. 라우터방식

          // 1.
          // 2.
        // 3. props 방식
        props.getBoard();
      })
      .catch(e=>{ })
  }


  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"/uploadimg/"+props.board.bimglist[0]}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.board.memail}
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        <Button size="small" onClick={(event)=> onDelete(event, props.board.bno, props.board.mno_fk)} >삭제</Button>
      </CardActions>
    </Card>
  );
}
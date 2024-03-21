
// import styles from css파일경로;
import styles from './Comment.css';
// 이미지파일 호출
import image from './img.jpg';

export default function Comment (props){
    return(<div className='wrapper'>
        <div>
            <img src={image} className="image" />
        </div>
        <div className='contentContainer'>
            <span className='nameText'>{props.name}</span>
            <span className='commentText'>{props.comment}</span>
        </div>
    </div>)
}

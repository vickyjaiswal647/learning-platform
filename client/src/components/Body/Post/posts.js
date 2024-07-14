import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './posts.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@material-ui/core/Button';
import { Markup } from 'interweave';

const Posts = ({publicId}) => {
    const [readcontent,setreadContent] = useState({title:"",content:"",likeCount:'',hasLiked:''})
    const [isLiked,setIsLiked] = useState(false);
    const [count,setCount] = useState(null);
    //console.log(readcontent.isLike);
    const getUser = async() => {
        const response = await fetch(`/article/getArticle/${publicId}`,{
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        //console.log(data.likeCount);
        setreadContent(data.info);
        if(data.hasLiked){
            setIsLiked(true);
            setCount(data.likeCount++);
        }else{
            setIsLiked(false);
            setCount(data.likeCount--);
        }
    }
    const setIsLike=async ()=>{
        const changeLike = await fetch(`/article/like/${publicId}`,{
            method:"POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const likeData = await changeLike.json();
        setIsLiked(!isLiked);
        // if(isLiked){
        //     setCount(count+1);
        // }
        // else{
        //     setCount(count-1);
        // }
        // console.log(likeData,"Hey");
        // if(likeData.status.code === 200){
        //     setIsLiked(true);
        // }
    }

    React.useEffect(()=>{
        getUser();
        
    },[])

    return (
        
        <div className = "article">
            
            <div className = "content">
                <h1>{readcontent.title}</h1>
                <Markup content= {readcontent.content}/>
            </div>
            <div className = {isLiked ? "loveitIcon" : "disableLoveIcon"}>
                <Button onClick={setIsLike}>
                    <FavoriteIcon fontSize = "large" style = {{marginRight:'20px'}} />        
                    <p>{readcontent.likeCount}</p> 
                    {isLiked ? 
                    <span style = {{fontWeight:'bold', fontSize:'20px'}}>Like</span>
                    : <span style = {{fontWeight:'bold', fontSize:'20px'}}>Liked</span>}  
                </Button>
            </div>
        </div>
    )
}

export default Posts

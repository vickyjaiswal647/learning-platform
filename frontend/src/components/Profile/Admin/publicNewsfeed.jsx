import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./newsFeed.css";
import ReadMore from "./publicReadMore";
import CreateIcon from '@mui/icons-material/Create';
import { Markup } from "interweave";

const PublicNewsFeed = ({getUserId}) => {

    const [feed,setFeed] = useState([
        {id:"",title:"",content:"", createdAt:''}])
    
        const getFeed = async() => {
            const response = await fetch('/article/list?approved=1',{
                mode:'cors',
                headers : {
                    "Content-Type" : "application/json",
                    'Accept': 'application/json',
                    'x-auth-token':localStorage.getItem('token')
                },
            });
            const data = await response.json();
            console.log(data);
            if(data.status.code === 200){
                setFeed(data.info);
            
            }
        }
    
        useEffect(()=>{
            getFeed();
        },[])

    return (
        <div className="container1">
            
        {feed?.map(data => { 
            return (
	            <div key={data.title} className="items">
                    <h1>{data.title}</h1>
                    <div className='readmoreItems'>
                    <Markup content = {data.content.slice(0,260)}/>   
                    <ReadMore changedFeed={getUserId} currentPublicFeed={data._id}/>
                    </div>
                    <p>{data.createdAt}</p>
                    <br/>
	            </div>
                
            )
        })}
        <div className = "loveitIcon1">
                <Link className = "" to = '/createArticle'>
                <   CreateIcon fontSize = "medium" style = {{marginRight:'10px', color:'black'}}/>
                    <spam style = {{fontWeight:'bold',color:'black', fontSize:'20px'}}>Write Article</spam>
                </Link>
            </div> 
        </div>
    )
}

export default PublicNewsFeed;
import React, { useState,useEffect } from "react";
import "./newsFeed.css";
import ReadMore from "./adminReadMore";
import { Markup } from "interweave";

const AdminNewsFeed = ({getAdminId}) => {

    const [feed,setFeed] = useState([
        {id:"",title:"",content:"", createdAt:''}])

    
        const getFeed = async() => {
            const response = await fetch('/article/list?approved=0',{
                mode:'cors',
                headers : {
                    "Content-Type" : "application/json",
                    'Accept': 'application/json',
                    'x-auth-token':localStorage.getItem('token')
                },
            });
            const data = await response.json();
            //console.log(data);
            if(data.status.code === 200){
                setFeed(data.info);
            }
        }

        useEffect(()=>{
            getFeed();
        },[])
    return (
        <div className="container1">
            <h1>Review Article</h1>
        {feed.map(data => { 
            return (
	            <div className="items">
                    <h1>{data.title}</h1>
                    <div className='readmoreItems'>
                        <Markup content = {data.content}/>
                        <ReadMore changed={getAdminId} currentFeed={data._id}/>
                    </div>
                    <p>{data.createdAt}</p>
                    <br/>
	            </div>
            )
        })}
        </div>
    )
}

export default AdminNewsFeed;
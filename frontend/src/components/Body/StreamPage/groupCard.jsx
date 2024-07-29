import React, {useState} from 'react';
import './groupCards.css';
import Card from './Card';
import Joining from './joining'
import {Link} from 'react-router-dom';

function Home() {
   
    return (
        <div className = "backimage">
        <div className = 'groupCard'>
            <h1 className = "heading1" >Start Exploring 😊</h1>
            <div className = 'groupCard__section'>
                <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                    <Card id="CSE" src="https://crawforduniversity.edu.ng/conas/wp-content/uploads/2020/06/computer-science-header-1024x370.jpg"
                    title="Computer Science"/>
                </Link>
                <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                    <Card id="IT" src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX37705704.jpg"
                    title="Information Technolgy"/>
                </Link>
                <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                    <Card id="civil" src="https://leverageedu.com/blog/wp-content/uploads/2019/09/Civil-Engineering-800x500.png?im_w=720"
                    title="Civil Engineering"/>
                </Link>
                <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                    <Card id="textile" src="https://leverageedu.com/blog/wp-content/uploads/2019/10/Textile-Engineering.jpg?im_w=720"
                    title="Textile Engineering"/>
                </Link>
            </div>
            <div className = 'groupCard__section'>
            <Link to = "/cseSem">
                <Card id="electrical" src="https://online.stanford.edu/sites/default/files/styles/figure_default/public/2020-07/Electrical-Engineering-Graduate-Certificate_MAIN.jpg?itok=X1t-3MX0"
                title="Electrical Enginering"/>
            </Link>
            <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                <Card id="mech" src="https://armiet.in/wp-content/uploads/2020/03/B1P1.jpeg"
                title="Mechanical Engineering"/>
            </Link>
            <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>
                <Card id="business" src="https://www.taxlawsolutions.net/wp-content/uploads/2017/01/accountING_ASSETS.png"
                title="Business Study"/>
            </Link>
            <Link to = "/cseSem" style={{textDecoration:'none', color:'black'}}>                <Card id="pharmacy" src="https://www.cironpharma.com/blog/wp-content/uploads/2020/11/Pharmaceutical-Products-in-India-are-in-High-Demands.jpg"
                title="Pharmacy"/>
            </Link>
            </div>
        </div>
        <Joining/>
        </div>
        )
    }


export default Home

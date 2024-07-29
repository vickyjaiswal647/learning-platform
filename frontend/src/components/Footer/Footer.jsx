import React from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className = "Footer">
                <div className = "Footer-Links">
                    <p className = "logo">boostmind</p>
                </div>
                <div className = "footer_link">
                    <h2>Company</h2>
                    <Link className = "name" to = "">Blog</Link>
                    <Link className = "name" to = "">About Us</Link>
                    <Link className = "name" to = "">Contact Us</Link>
                    <Link className = "name" to = "">Company Policy</Link>
                </div>
                <div className = "footer_link">
                    <h2>Our Program</h2>
                    <Link className = "name" to = "">UnderGraduate</Link>
                    <Link className = "name" to = "">PostGraduate</Link>
                    <Link className = "name" to = "">Diploma</Link>
                </div>
                <div className = "footer_link">
                    <h2>Opportunities</h2>
                    <Link className = "name" to = "">Become a Instructor</Link>
                    <Link className = "name" to = "">Become a Mentor</Link>
                    <Link className = "name" to = "">Career Guidance</Link>
                </div>
            </div>
            <div className = "icons">
                <FacebookIcon fontSize = "large" style = {{cursor:'pointer', color:'#4267B2'}}/>
                <InstagramIcon fontSize = "large" style = {{cursor:'pointer', color:'#fb3958'}}/>
                <LinkedInIcon fontSize = "large" style = {{cursor:'pointer', color:'#0072b1'}}/>
                <TwitterIcon fontSize = "large" style = {{cursor:'pointer', color:'#1DA1F2'}}/>
                <YouTubeIcon fontSize = "large" style = {{cursor:'pointer', color:'#FF0000'}}/>
            </div>
            <p className = "footerbottom">© 2021 bootmind Pvt.Ltd</p>
        </>
    )
}

export default Footer

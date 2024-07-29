import React, {useState} from 'react'
import './Header.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';

const Header = ({state, changed}) => {
    const logouthandler = () => {
        localStorage.clear();
        changed(false)     
    }
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    return (
        <div className = "navbar">
            <div className = "navbarLogo">
                <img src = "https://www.graphicsprings.com/filestorage/stencils/d619ef29297bf4a1d98fa4bb57ab8d7f.png?width=500&height=500" className = "logo1" alt = "boostmind logo"/>
                <span id = "logoname">boostmind</span>
            </div>
            <div className = {showMediaIcons?"navbarContent navbarContent-mobile" : "navbarContent"}>
                <ul>
                    <li><Link className = "nvbar" to = '/'>Categories<KeyboardArrowDownIcon/></Link></li>
                    <li><Link className = "nvbar" to = '/newsFeed1'>Articles<KeyboardArrowDownIcon/></Link></li>
                    <li><Link className = "nvbar" to = {{pathname:'https://boostmind-chat.herokuapp.com/'}} target="_blank">Chat Room<AllInboxIcon/></Link></li>
                </ul>
            </div>
            <div className = "navbarAccount">
               <NotificationsIcon />
               {state?
                <>  
                    <Link to = '/ProfilePage'>
                        <AccountCircleIcon style={{ color:'rgb(61, 61, 61)', padding:'0px 1rem'}} fontSize = "large"/>
                    </Link>
                    <li className = 'header-item1'>
                        <Link to = '/' className = 'header-links-mobile1' onClick = {logouthandler}>
                            Logout
                        </Link>
                    </li>
                </>:<>
                    <li className = 'header-item1'>
                        <Link to = '/login' className = 'header-links-mobile11'>
                            Login
                        </Link>
                    </li>
                    <li className = 'header-item1'>
                        <Link to = '/signup' className = 'header-links-mobile1'>
                            SignUp
                        </Link>
                    </li>
                </>}
                <div className="menuLink">
                    <Link to="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                        <MenuIcon style={{paddingLeft:'10px'}}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header

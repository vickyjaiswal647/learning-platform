import React , {useState} from 'react';
import {Link, Navigate } from 'react-router-dom';

import './ProfilePage.css';



const Profile = () => {

    const [data, setData] = useState({
        fullname : '',
        email : '',
        branch : '',
        semester : '',
        isAdmin : '',
        score:''
    });

    const getUser = async() => {
        const response = await fetch('/users/profile',{
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        setData(data.info);
    }

    React.useEffect(()=>{
        getUser();
    },[])

    return (
        <>
           {localStorage.getItem('token')?<div className="container stu-profile">
                <div className="heading" >
                    <h4 >PROFILE</h4>
                   {data.isAdmin ?<span style={{fontStyle: "italic"}} >Student Controller</span> 
                   : <span style={{fontStyle: "italic"}} >Student Dashboard</span>}
                </div>
                <form method="">
                    
                    {/* <div className="row"></div> */}
                    <div className="row">
                        <div className="col">
                            <div className="profile-img">
                                <img 
                                    id="profile-img"
                                    src="https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"
                                    alt="UserPicture" 
                                />
                            </div>
                            
                        </div>

                        <div className="col">

                            <div className="profile-head">
                                <h3 style = {{padding:'0px 0px 10px 0px'}}>{data.fullname}</h3>
                                <h5 style = {{padding:'0px 0px 10px 0px'}}>{data.isAdmin===1?'Admin':'Student'}</h5>
                                {!data.isAdmin?<p className="profile-rating">SCORE :<span> {data.score} </span></p> : null}
                            </div>

                        </div>

                        <div className="col">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                        </div>
                    </div>
                    <hr/>
                    
                    <div className="row">
                        {/* left side url */}
                        <div className="col">
                            <p style = {{margin:'40px'}}><b> Navigate Pages</b> </p>
                            <div className="profile-work">
                                {data.isAdmin === 1 ? (
                                    <>
                                    <Link className="link-option" to="/createSubject">Create Subject</Link><br/>
                                    <Link className="link-option" to="/uploadVideo">Upload Video</Link><br/>
                                    <Link className="link-option" to="createTest">Create Test</Link><br/>
                                    <Link className="link-option" to="/createQuestion">Create Question</Link><br/>
                                    <Link className="link-option" to="activateTest">Activate Test</Link><br/>
                                    <Link className="link-option" to="/result">Show Result</Link><br/>
                                    <Link className="link-option" to="createAdmin">Create Admin</Link><br/>
                                    <Link className="link-option" to="newsFeed">Articles Review</Link><br/>
                                    <Link className="link-option" to="studentList">Answers Review</Link><br/>
                                    </>
                                ) : (
                                    <>
                                    <Link className="link-option" to="/profilePage">Profile</Link><br/>
                                    <Link className="link-option" to="/profilePhoto">Photo</Link><br/>
                                    <Link className="link-option" to="/mcq">Start Test</Link><br/>
                                    <Link className="link-option" to="/cseSem1Sub">Your Course</Link>
                                    
                                    </>
                                )}
                            </div>
                        </div>

                        {/* right side data toggle */}
                        <div className="col"></div>
                        <div className="col">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="">
                                    
                                    <div className="row">
                                        <div className="col">
                                            <label><strong>Name :</strong></label>
                                        </div>
                                        <div className="col">
                                            <label>{data.fullname}</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label><b>Email :</b></label>
                                        </div>
                                        <div className="col">
                                            <label>{data.email}</label>
                                        </div>
                                    </div>
                                    {!data.isAdmin?<>
                                        <div className="row">
                                            <div className="col">
                                                <label><b>Semester :</b></label>
                                            </div>
                                            <div className="col">
                                                <label>{data.semester}</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <label><b>Branch :</b></label>
                                            </div>
                                            <div className="col">
                                                <label>{data.branch}</label>
                                            </div>
                                        </div>
                                    </>:null}
                                </div>
                            </div>
                        </div> 

                    </div>
                </form>
            </div> : <Navigate  to = '/login'/>}
        </>
    );
}

export default Profile;
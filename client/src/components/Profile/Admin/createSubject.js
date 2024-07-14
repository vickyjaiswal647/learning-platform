import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './createSubject.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//import { makeStyles } from '@material-ui/core/styles';

const dropDownSemester = [
    {value:'1',label:"First Semester"},
    {value:'2',label:"Second Semester"},
    {value:'3',label:"Third Semester"},
    {value:'4',label:"Fourth Semester"},
    {value:'5',label:"Fifth Semester"},
    {value:'6',label:"Sixth Semester"},
    {value:'7',label:"Seventh Semester"},
    {value:'8',label:"Eight Semester"},
  ]

const useStyles = makeStyles((theme) => ({
    textField: {
        margin:theme.spacing(2),
        width : '60%',
    },
    select: {
        margin:theme.spacing(2),
        width : '60%',

    },
    button: {
        marginTop:theme.spacing(4),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'40%'
    }
}));

const CreateSubject = () => {

    const navigate   = useNavigate ();
    const options = [
        { value: 'CSE', label: 'Computer Science and Engineering'},
        { value: 'IT', label: 'Information Technology' },
        { value: 'ME', label: 'Mechnical Engineering' },
        { value: 'EE', label: 'Electrical Engineering' },
        { value: 'TE', label: 'Textile Engineering' },
        { value: 'ECE', label: 'Electronics and Communication Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
      ];

    const classes = useStyles();

    const [data, setData] = useState({
        subjectName:'',
        subjectCode:'',
        branch:'',
        semester:''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setData({...data,[name]: value});
    };

    const dropDown = (e) =>{
        setData({...data,branch:e.value})
    }

    const semesterHandler = (e) =>{
        setData({...data,semester:e.value})
    }

    const diffToast = (message) => {
        toast.success(message,{
            position:"top-right",autoClose: 3000
        })
    }

    const errormgs = (message) => {
        toast.error(message,{
            position:"top-right",autoClose: 3000
        })
    }

    const formData = async(e) => {
        e.preventDefault();
        const {subjectName,subjectCode,branch,semester} = data;
        const response = await fetch("/users/admin/create-subject",{
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({subjectName,subjectCode,branch,semester})
        })
        const res = await response.json();
        if(res.status.code === 200){
            diffToast(res.status.message);
            setTimeout(function(){ navigate ('/profilePage'); }, 3000);
        } else {
            errormgs(res.status.message)
        }
    }

    return (
        <form onSubmit = {formData} autoComplete = "off">
            <div className = 'container1'>
                <h1>Create Subject</h1>
                <TextField autoFocus className = {classes.textField} id = "outlined-basic" label = "Subject" variant = "outlined" name = "subjectName" value = {data.subjectName}  onChange = {handleChange}/>
                <TextField className = {classes.textField} id = "outlined-basic" label = "Code" variant = "outlined" name = "subjectCode" value = {data.subjectCode}  onChange = {handleChange}/>
                {/* <TextField className = {classes.textField} id = "outlined-basic" label = "Semester" variant = "outlined" name = "semester" value = {data.semester}  onChange = {handleChange}/> */}
                <Select className = {classes.select } onChange = {semesterHandler} placeholder = "Select Semester" options = {dropDownSemester}/>
                <Select placeholder = "Select Branch" className = {classes.select} onChange = {dropDown} options = {options}/>
                <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Create Subject</Button>
                <ToastContainer/>
            </div>
        </form>
    )
}

export default CreateSubject

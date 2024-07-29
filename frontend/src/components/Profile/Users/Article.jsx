import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import './Article.css'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorContainer from './EditorContainer';


const useStyles = makeStyles((theme) => ({
    textField: {
        margin:theme.spacing(2),
        width : '80%',
        fontSize: "20px",
        fontFamily:'Lucida Casual' //'Comic Sans MS'
    },
    select: {
        margin:theme.spacing(2),
        width : '80%',

    },
    button: {
        marginTop:theme.spacing(4),
        alignItems:'center',
        height: theme.spacing(7),
        borderRadius:'px',
        width:'25%'
    }
}));

const Article = () => {

    const navigate  = useNavigate();

    const options = [
        { value: 'IE', label: 'Interview Experience' },
        { value: 'CSE', label: 'Computer Science and Engineering'},
        { value: 'IT', label: 'Information Technology' },
        { value: 'ECE', label: 'Electronics and Communication Engineering' },
        { value: 'ME', label: 'Mechnical Engineering' },
        { value: 'EE', label: 'Electrical Engineering' },
        { value: 'TE', label: 'Textile Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
      ];

    const classes = useStyles();

    const [data, setData] = useState({
        heading:'',
        articleDescription:'',
        selectCategory:''
    })
    

    const handleChange = e => {
        const { name, value } = e.target;
        setData({...data,[name]: value});
    };
    //console.log(data);

    const dropDown = (e) =>{
        setData({...data,selectCategory:e.value})
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
        const {heading,articleDescription,selectCategory} = data;
        //console.log(heading,articleDescription,selectCategory);
        const response = await fetch("/article/create",{
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title:heading,content:articleDescription,category:selectCategory})
        })
        const res = await response.json();
        //console.log(res);
        if(res.status.code === 200){
            diffToast(res.status.message);
            setTimeout(function(){ navigate('/profilePage'); }, 3000);
        } else {
            errormgs(res.status.message)
        }
    }

    return (
        <form onSubmit = {formData} autoComplete = "off">
            <div className = 'container2'>
                <h1>Write Article</h1>
                
                <TextField inputProps={{style: {fontSize: 25 }}} autoFocus className = {classes.textField} id = "outlined-basic" label = "Heading" variant = "outlined" name = "heading" value = {data.heading}  onChange = {handleChange}/>
                <div className="editorContainer"><EditorContainer name = "articleDescription" bodyData = {data}  onChange = {handleChange}/></div>
                <TextareaAutosize rowsMin={6} className = {classes.textField} id = "outlined-basic" placeholder="Article Description" label = "Article Description" variant = "outlined" name = "articleDescription" value = {data.articleDescription}  onChange = {handleChange}/>
                <Select placeholder = "Select Category" className = {classes.select} onChange = {dropDown} options = {options}/>
                <Button type="submit" className = {classes.button} variant="contained" color="primary" disableElevation>Submit</Button>
                <ToastContainer/>
            </div>
        </form>
    )
}

export default Article

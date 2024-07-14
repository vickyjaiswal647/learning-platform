import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "./createTest.css";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select:{
      margin: theme.spacing(0.9),
      width:'80%',
  }
}));

const branch = [
  { value: 'CSE', label: 'Computer Science and Engineering'},
  { value: 'IT', label: 'Information Technology' },
  { value: 'ME', label: 'Mechnical Engineering' },
  { value: 'EE', label: 'Electrical Engineering' },
  { value: 'TE', label: 'Textile Engineering' },
  { value: 'ECE', label: 'Electronics and Communication Engineering' },
  { value: 'CE', label: 'Civil Engineering' },
];

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

const CreateTest = () => {
  const classes = useStyles()
  const navigate  = useNavigate ();

  const [data, setData] = useState({
    testName :  '',
    testCode : '',
    totalQuestions : '',
    attemptableQuestion : '',
    testTime : '',
    semester : '',
    branch:''
    // activationTime: ''
  });
  const [activationTime, setActivationTime] = useState()

  const semesterHandler = (e) => {
    setData({...data,semester:e.value})
}

const branchHandler = (e) => {
    setData({...data,branch:e.value})
}

  const changeInputField = (e) => {
    const {name,value} = e.target;
    setData({...data, [name]: value});
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

  const submitTest = async(e) => {
    e.preventDefault();
    const {testName,testCode,totalQuestions,attemptableQuestion,testTime,semester,branch} = data;
    const startDateTime = activationTime
    // console.log(startDateTime,testName,testCode,totalQuestions,attemptableQuestion,testTime,semester,branch)
        const response = await fetch("/users/admin/new-test", {
            method : "POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({testName,testCode,totalQuestions,attemptableQuestion,testTime,semester,branch,startDateTime})
        });

        const data1 = await response.json();
        
        if(data1.status.code === 200 ){
          diffToast(data1.status.message)
          setTimeout(function(){ navigate ('/createQuestion'); }, 3000);
        } else {
          errormgs(data1.status.message)
        }
  }


  return (
    <>
      <form className="form-control" onSubmit={submitTest} autoComplete = "off">
        <div className="create-test-heading">
          <div id="test-heading">
              <h3>Create Test</h3>    
          </div>
          <div className="test-input">
            <div className="test-name">
              <label htmlFor="tname">Test Name :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testName}
                id="fname"
                name="testName"
                placeholder="Test name.."
              />
            </div>

            <div className="test-code">
              <label htmlFor="tcode">Test Code :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testCode}
                id="tcode"
                name="testCode"
                placeholder="Test code.."
              />
            </div>

            <div className="total-question-uploaded">
              <label htmlFor="quploaded">Number of Questions Uploaded(MCQ) :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.totalQuestions}
                id="quploaded"
                name="totalQuestions"
                placeholder="Number of questions uploaded.."
              />
            </div>

            <div className="total-question-attempted">
              <label htmlFor="qattempted">Number of Questions Attempted(MCQ) :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.attemptableQuestion}
                id="qattempted"
                name="attemptableQuestion"
                placeholder="Your name.."
              />
            </div>

            <div className="test-time-duration">
              <label htmlFor="tduration">Test Time Duration :</label>&nbsp;&nbsp;
              <TextField
                type="text"
                onChange={changeInputField}
                value={data.testTime}
                id="tduration"
                name="testTime"
                placeholder="Test duration.."
              />
            </div>
            <div className="semester1">
              <label htmlFor="semester">Semester :</label>&nbsp;&nbsp;
              <Select 
                className = {classes.select } 
                onChange = {semesterHandler} 
                placeholder = "Select Question Type" 
                options = {dropDownSemester}
              />
              {/* <TextField
                type="text"
                onChange={changeInputField}
                value={data.semester}
                id="semester"
                name="semester"
                placeholder="Semester.."
              /> */}
            </div>
            <div className="semester1">
              <label htmlFor="semester">Branch :</label>&nbsp;&nbsp;
              <Select 
                className = {classes.select } 
                onChange = {branchHandler} 
                placeholder = "Select Question Type" 
                options = {branch}
              />
              {/* <TextField
                type="text"
                onChange={changeInputField}
                value={data.branch}
                id="semester"
                name="branch"
                placeholder="Branch.."
              /> */}
            </div>
            <div className="testActivationTime">Activation Time: &nbsp;
              <DateTimePicker onChange={setActivationTime} value={activationTime}/>
            </div>
            <div className="test-button">
              <button type="submit" className="upload-button">Submit</button>
              {/* <input type="submit" placeholder="Submit"/> */}
            </div>
            
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default CreateTest;
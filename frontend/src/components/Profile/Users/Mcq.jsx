import React, {useState, useEffect} from 'react';
//import './newQuestion.css';
import { FormControlLabel, FormLabel, RadioGroup } from '@mui/material'
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import './mcq.css';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ReactPaginate from "react-paginate";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const NewQuestion = () => {

    const [answer, setAnswer] = useState({_id:'',ans:''});
    const [question, setQuestion] = useState({
        _id:'',qStatement:'',option1:'',option2:'',option3:'',option4:'',type:''
    })
    const [testNames,setTestName] = useState('TestName')
    const [testCodes, setTestCode] = useState('')
    const navigate = useNavigate();
    const [users, setUsers] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 1;
    //const pagesVisited = pageNumber * usersPerPage;

        
    const getQuestion = async() => {
        console.log('Fetching Question From Backend of pageNumber 1')
        console.log(pageNumber)
        const response = await fetch(`/users/student/attempt-test/${pageNumber}`,{
            method:'GET',
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
            setQuestion(data.info.quest);
            setUsers(data.info.totalQuest);
            setTestName(data.info.testName);
            setTestCode(data.info.testCode);
            //console.log(data.info.quest._id);
            if(data.info.answer){
                setAnswer({ _id: data.info.quest._id, ans: data.info.answer})
            }
            //setEnable(true);
        } else {
            errormgs(data.status.message);
            setTimeout(function(){ navigate('/profilePage'); },3000);
        }
    }

    const fetchQuestion = async(currentPage) => {
        console.log('Fetching Question From Backend of pageNumber')
        console.log(currentPage);
        const response = await fetch(`/users/student/attempt-test/${currentPage}`,{
            method:'GET',
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        setQuestion(data.info.quest);
        if(data.info.answer){
            setAnswer({ _id: data.info.quest._id, ans: data.info.answer})
        }
        console.log(data.info)
    }

    const diffToast = (message) => {
        //console.log(message)
        toast.success(message,{
            position:"top-right",autoClose: 3000
        })
    }
    
      const errormgs = (message) => {
          //console.log(message)
          toast.error(message,{
              position:"top-right",autoClose: 3000
          })
    }

    const submitAnswer = async () => {
        const {_id, ans} = answer;
        const testName = testNames;
        const {type} = question;
        const response = await fetch('/users/student/create-answer',{
            method:'POST',
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept' : 'application/json',
                'x-auth-token' : localStorage.getItem('token')
            },
            body:JSON.stringify({_id,ans,testName,type})
        });
        const data = await response.json();
        setAnswer({_id:'',ans:''});
    }

    const finalSubmitAnswer = async() => {
        const testName = testNames;
        const testCode = testCodes;
        const response = await fetch('/users/student/submit-test',{
            method: 'POST',
            mode: 'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept' : 'application/json',
                'x-auth-token' : localStorage.getItem('token')
            },
            body:JSON.stringify({testName,testCode})
        });
        const data = await response.json();
        if(data.status.code === 200){
            diffToast(data.status.message);
            setTimeout(function(){ navigate('/profilePage'); },3000);
        } else {
            // errormgs(data.status.message);
            // setTimeout(function(){ navigate('/profilePage'); },3000);
          }
    }



    useEffect(()=>{
        getQuestion();
        // console.log(pageNumber)
    },[])

    const handleRadioChange = (e) => {
        //console.log(e.target.name)
        setAnswer({
            _id:e.target.name,
            ans:e.target.value
        });
    }
    const pageCount = Math.ceil(users / usersPerPage);

    const changePage = async({ selected }) => {
        let currentPage = selected;
        submitAnswer();
        //console.log(currentPage);
        const newQuestion = await fetchQuestion(currentPage);
        //setQuestion(newQuestion);
    };

    const getPageInfo = (obj)=>{
        console.log(obj);
    }

    const handleChange = (event) => {
        setAnswer({...answer,_id:event.target.name,ans:event.target.value});
    }

    return (
        <div>
            <div className = 'testName'>
                <h2>{testNames}</h2>
            </div>
            <div className = "paginationtheme">
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                onPageActive = {getPageInfo}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            /></div>
            <div className = 'newquestion'>
                {question.type == '0' ? <>
                    <div className = "idq">
                        <FormControl component = "fieldset">
                            <FormLabel className = "question"><p>{question.qStatement}</p></FormLabel>
                            <RadioGroup aria-label="quiz" name={question._id} value={answer.ans} onChange={handleRadioChange} className = "radio">
                                <FormControlLabel value = {question.option1} control = {<Radio/>} label = {question.option1}/>
                                <FormControlLabel value = {question.option2} control = {<Radio/>} label = {question.option2}/>
                                <FormControlLabel value = {question.option3} control = {<Radio/>} label = {question.option3}/>
                                <FormControlLabel value = {question.option4} control = {<Radio/>} label = {question.option4}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    </>:<>
                    <div className = "extraQuestion">
                        <div className = 'Question'>
                            <h3>Question</h3>
                            <p>{question.qStatement}</p>
                        </div>
                        <div className = "answer">
                            <Box component="form" sx={{'& > :not(style)': { m: 1, width: '95%', margin:'1em' },}} noValidate autoComplete="off">
                                <TextField name = {question._id} value = {answer.ans} onChange = {handleChange} id="outlined-multiline-static" label="Write Your Answer" size = 'large' variant="outlined" multiline rows={18} className = "answertextField" />
                            </Box>
                        </div>
                    </div>
                </>}
                <div className = 'btn'>
                    <Button  onClick = {finalSubmitAnswer} type='submit' variant='contained' color = 'primary' size = 'large'>Final Submit</Button>
                </div>
                
            </div>
            <ToastContainer/>
        </div>
    )
}

export default NewQuestion
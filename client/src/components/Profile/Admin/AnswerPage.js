import { Button, TextField } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify'
import React,{useState} from 'react'
import './AnswerPage.css'

const AnswerPage = () =>{
    const [enable,setEnable] = useState()
    const [score,setScore] = useState(0)
    const [quesList,setQuesList] = useState([
        {answer:'',questionType:'',questionId:{qStatement:''}}
    ])

    const getAnswerlist = async() => {
        const userId = localStorage.getItem('stuId');
        const testName = localStorage.getItem('label');
        console.log(userId,testName);
        const response = await fetch(`/users/admin/see-answer`,{
            method:"POST",
            mode:'cors',
            headers : {
                "Content-Type" : "application/json",
                'Accept': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({userId,testName})
        });
        const data = await response.json();
        console.log(data.info);
        if(data.status.code === 200){
            setQuesList(data.info)
        }
    }
    
    // const diffToast = (message) => {
    //     toast.success(message,{
    //         position:"top-right",autoClose: 3000
    //     })
    // }

    const handleEditBUtton = async() =>{
        setEnable(!enable);
        const newScore = score;
        const user = localStorage.getItem('stuId');
        const testName = localStorage.getItem('label');
        if(enable){
            console.log(newScore,user,testName);
            const codeResponse = await fetch("users/admin/update-score", {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body:JSON.stringify({newScore,user,testName})
            });
        }
        // const data = await response.json();
        // if(data.status.code === 200){
        //     diffToast(data.state.message);
        //     setQuesList(data.info);
        //     setScore(data.info);
        // } else {
        //     setEnable(false);
        //     diffToast(data.status.message)
        //     setTimeout(function(){ history.push('/profilePage'); }, 3000);
        // }

    }

    const changeScore = (e) =>{
        setScore(e.target.value);
        
    }

    React.useEffect(()=>{
        getAnswerlist();
        //console.log()
    },[])
    return(
        <div className='ansContainer'>
            <div className='editScore'>
                <TextField disabled={!enable} onChange={changeScore} value={score} label="Score"></TextField>
                <Button style={{height:"35px", marginTop:"10px", marginLeft:"5px"}} type='button' onClick={handleEditBUtton} variant='contained' color={!enable? "primary":"secondary"}>{!enable ? "Edit Score": "Save Score"}</Button>
            </div>
            {quesList.map( data =>{
                return(
                    <div className='questions'>
                        <div className='quesType'>
                            { data.questionType == 0 ? <p>MCQ</p> : data.questionType == 1 ? <p>Short Answer Type</p> :<p >Long Answer Type</p>}
                        </div>
                        <h2>Question:</h2>
                        <p className='quesPara'>{data.questionId.qStatement}</p>
                        <hr/>
                        <h2>Answer:</h2>
                        <p className='ansPara'>{data.answer}</p>
                    </div>
                )
            })}            
        </div>
    )

}

export default AnswerPage
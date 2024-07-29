import { Button } from "@mui/material";
// import { color, style } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StudentList.css";
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
//import ReadMore from "./publicReadMore";

const useStyles = makeStyles((theme) => ({
    select: {
        margin: theme.spacing(0.6),
        width: '40%',
    }
}));

const StudentList = () => {

    const classes = useStyles();
    const [List, setList] = useState([{ fullname: "", email: "" , testScore : '',_id:""}])

    const [dropDownTestName, setDropDownTestName] = useState([{
        value: '', label:''
    }])

    const [testCode, setTestCode] = useState('')

    const testCodes = async (e) => {
        // e.preventDefault();
        setTestCode(e.value);
        localStorage.setItem('label',e.label);
        const testCode = e.value
        const codeResponse = await fetch("users/admin/get-test-result", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({testCode})
        });
        const data = await codeResponse.json();
        console.log(data)
        if (data.status.code === 200) {
            setList(data.info);
        }
    }

    const getTestCode = async () => {
        const codeResponse = await fetch("users/admin/get-test-list", {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            
        });
        const data = await codeResponse.json();
        if (data.status.code === 200) {
            setDropDownTestName(data.info);
        }
        console.log(data);
    }

    React.useEffect(() => {
        // console.log(questiontype)
        getTestCode();
    }, [])

    //const getStudentList = async () => {
        // const response = await fetch('/users/admin/get-test-result',{
        //     mode:'cors',
        //     headers : {
        //         "Content-Type" : "application/json",
        //         'Accept': 'application/json',
        //         'x-auth-token':localStorage.getItem('token')
        //     },
        // });
        // const data = await response.json();
        // console.log(data);
        // if(data.status.code === 200){
        //     setList(data.info);

        // }
    //}

    useEffect(() => {
        //getStudentList();
        //getTestCode();
    }, [])

    return (
        <div className="container2">
            <Select className={classes.select} onChange={testCodes} placeholder="Select Test Name" options={dropDownTestName} />
            <table className="studentTable">
                <tr>
                    <th className="studentLabels">
                        {/* <td>S.No.</td> */}
                        <td>Name:</td>
                        <td>Email:</td>
                    </th>
                </tr>
                {List?.map(data => {
                    return (
                        <div key={data.email} className="StudentList">

                            <tr className="studentData">

                                <td>{data.fullname}</td>
                                <td>{data.email}</td>
                                <td>
                                    <Link to='/answerPage'>
                                        <Button className="launchButton" type="button" variant="contained" size="lg" onClick={() => { { localStorage.setItem('stuId', data._id) } }} active>Review</Button>
                                    </Link>
                                </td>
                            </tr>

                        </div>

                    )
                })}
            </table>
        </div>
    )
}

export default StudentList;
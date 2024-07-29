import React from "react";
import { Link } from 'react-router-dom';
import "./groupOfSemester.css";
import Card from './semesterCard';

const cardlist = () => {
  return (
    <>
      <h1 style = {{marginLeft:'200px', padding:'40px 0px 0px 0px'}}>Choose Your Semester</h1>
      <div className="card-list">
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="1" semesterid = "1"/>
        </Link>

        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="2" semesterid = "2"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="3" semesterid = "3"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="4" semesterid = "4"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="5" semesterid = "5"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="6" semesterid = "6"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="7" semesterid = "7"/>
        </Link>
        <Link to = '/cseSem1Sub' style = {{textDecoration:'none',color:'black'}}>
          <Card semId="8" semesterid = "8"/>
        </Link>
      </div>
    </>
  );
};

export default cardlist;

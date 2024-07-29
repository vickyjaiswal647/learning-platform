import React, { useState, useEffect } from "react";
import "./cseSem1.css";
import { useNavigate  } from "react-router-dom";

const Subject = ({ state }) => {
  const navigate  = useNavigate ();
  const [subject, setSubject] = useState([
    {
      id: "",
      user: "",
      branch: "",
      semester: "",
      subjectName: "",
    },
  ]);
  const [directSub, setDirectSub] = useState([
    {
      id: "",
      label: "",
      value: "",
    },
  ]);

  const getSubjectName = async () => {
    const branch = localStorage.getItem("branchId");
    const semester = localStorage.getItem("semId");

    if (!state) {
      console.log("without direct", state);
      const responseId = await fetch("/home/getSubject", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ branch, semester }),
      });
      const data = await responseId.json();
      setSubject(data.info);
      console.log(data);
    } else {
      console.log("Direct", state);
      const response = await fetch("/users/student/user-subject", {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status.code === 200) {
        setDirectSub(data.info);
      }
      console.log(directSub);
    }
  };

  useEffect(() => {
    getSubjectName();
  }, []);

  const subjectClick = async (e, value) => {
    e.preventDefault();
    const data = value;
    const response = await fetch("/users/student/go-to-course", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ data }),
    });
    const resdata = await response.json();
    if (resdata.status.code === 200) {
      const data1 = resdata.info;
      localStorage.setItem("data1", JSON.stringify(data1));
      navigate("/videoTutorials");
    }
  };
  return (
    <>
      <h1 style={{ marginLeft: "200px", padding: "40px 0px 0px 0px" }}>
        Choose Your Subject
      </h1>
      <div className="semester1-container">
        {!state ? (
          <>
            {" "}
            {subject?.map((data) => {
              return (
                <div
                  key={data.id}
                  onClick={(e) => subjectClick(e, data.subjectCode)}
                  className="semester1-card"
                >
                  <img
                    alt="subjects"
                    src="https://www.sparknotes.com/images/banner-othersubjects.svg"
                  />
                  <div className="semester1-info">
                    <div className="semester1-sub-title">
                      <span className="semester1-sub-description">
                        {data.subjectName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </>
        ) : (
          <>
            {directSub.map((data) => {
              return (
                <div
                  key={data.id}
                  onClick={(e) => subjectClick(e, data.value)}
                  className="semester1-card"
                >
                  <img
                    alt="subjects"
                    src="https://www.sparknotes.com/images/banner-othersubjects.svg"
                  />
                  <div className="semester1-info">
                    <div className="semester1-sub-title">
                      <span className="semester1-sub-description">
                        {data.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </>
        )}
      </div>
    </>
  );
};

export default Subject;

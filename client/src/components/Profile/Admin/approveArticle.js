import React, { useState } from "react";
import "./approveArticle.css";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Markup } from "interweave";
import { Button } from "@material-ui/core";
import { useNavigate  } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ApproveArticle = ({ Id }) => {
  const [content, setContent] = useState({ id: "", title: "", content: "" });
  const [approveArticle, setApproveArticle] = useState();
  const navigate  = useNavigate ();
  // console.log(typeof Id);
  const getUser = async () => {
    const response = await fetch(`/article/getArticle/${Id}`, {
      mode: "cors",
      // method : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    // console.log(approveArticle);
    // console.log("Hello")
    const data = await response.json();
    // const html = {data.info.content}
    // const contentBlock = htmlToDraft(html);
    // if (contentBlock) {
    //     const contentState = ContentState.createFromBlockArray(contentBlock.content);
    //     const editorState = EditorState.createWithContent(contentState);
    // }
    // const blocksFromHtml = htmlToDraft(data.info.content);
    // console.log(blocksFromHtml,'Hello');
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // console.log(contentBlocks,entityMap);
    // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    // const useState = EditorState.createWithContent(contentState);
    //console.log(data);

    setContent(data.info);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const diffToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const errormgs = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleApprove = () => {
    setApproveArticle(1);
  };
  const handleDecline = () => {
    setApproveArticle(0);
    diffToast("Article has been declined");
    setTimeout(function () {
      navigate ("/profilePage");
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(approveArticle);
    if (approveArticle) {
      const response = await fetch(`/article/changeStatus/${Id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        //body:JSON.stringify({testCode})
      });
      const res = await response.json();
      console.log(res);
      if (res.status.code === 200) {
        console.log(res.status.code);
        diffToast(res.status.message);
        setTimeout(function () {
          navigate("/newsFeed");
        }, 2000);
      } else {
        errormgs(res.status.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="Parent">
      <div className="appcontent">
        <h1>{content.title}</h1>
        <Markup content={content.content} />
      </div>
      <div className="button">
        {/* <button className = "buttons" onClick = {handleApprove}>Approve</button>
                <button className = "buttons" onClick = {handleDecline}>Decline</button> */}
        <Button
          type="submit"
          className="buttons"
          variant="contained"
          color="success"
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Button
          type="submit"
          className="buttons"
          variant="outlined"
          color="error"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default ApproveArticle;

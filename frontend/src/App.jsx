import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/form/login";
import SignUp from "./components/form/signup";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import StreamPage from "./components/Body/StreamPage/groupCard";
import SemesterPage from "./components/Body/SemesterPage/groupOfSemester";
import CseSem1Sub from "./components/Body/SemesterSubject/CSEsem1/cseSem1";
import Tutorialpage from "./components/Body/SemesterSubject/CSEsem1/tutorialpage";
import ProfilePage from "./components/Profile/ProfilePage";
import Mcq from "./components/Profile/Users/Mcq";
import Score from "./components/Profile/Users/score";
import ActivateTest from "./components/Profile/Admin/activate";
import CreateQuestion from "./components/Profile/Admin/createQuestion";
import Result from "./components/Profile/Admin/result1";
import UploadVideo from "./components/Profile/Admin/uploadVideo";
import CreateTest from "./components/Profile/Admin/createTest";
import VideoTutorials from "./components/Body/SemesterSubject/videoTutorials/groupVideoCard";
import CreateSubject from "./components/Profile/Admin/createSubject";
import CreateAdmin from "./components/Profile/Admin/createAdmin";
import Articles from "./components/Body/Post/posts";
import PublicNewsFeed from "./components/Profile/Admin/publicNewsfeed";
import AdminNewsFeed from "./components/Profile/Admin/adminNewsfeed";
import ReviewArticles from "./components/Profile/Admin/approveArticle";
import CreateArticle from "./components/Profile/Users/Article";
import StudentList from "./components/Profile/Admin/StudentList";
import AnswerPage from "./components/Profile/Admin/AnswerPage";

const App = () => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userId, setUserId] = useState("");
  const [adminId, setAdminId] = useState("");
  // console.log(adminId);

  return (
    <div className="App">
      <Router>
        <Header state={isLogin} changed={setIsLogin} />
        <Routes>
          <Route path="/" exact element={<StreamPage/>} />
          <Route
            path="/login"
            element={<Login changed={setIsLogin} />}
          />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/cseSem" element={<SemesterPage/>} />
          <Route path="/cseSem1Sub" element={<CseSem1Sub/>} />
          <Route path="/tutorialPage" element={<Tutorialpage/>} />
          <Route path="/profilePage" element={<ProfilePage/>} />
          <Route path="/mcq" element={<Mcq/>} />
          <Route path="/score" element={<Score/>} />
          <Route path="/activateTest" element={<ActivateTest/>} />
          <Route path="/createQuestion" element={<CreateQuestion/>} />
          <Route path="/createTest" element={<CreateTest/>} />
          <Route path="/result" element={<Result/>} />
          <Route path="/uploadVideo" element={<UploadVideo/>} />
          <Route path="/videoTutorials" element={<VideoTutorials/>} />
          <Route path="/createSubject" element={<CreateSubject/>} />
          <Route path="/createAdmin" element={<CreateAdmin/>} />
          <Route
            path="/newsFeed"
            element={<AdminNewsFeed getAdminId={setAdminId} />}
          />
          <Route
            path="/newsFeed1"
            element={<PublicNewsFeed getUserId={setUserId} />}
          />
          <Route
            path="/articles"
            element={<Articles publicId={userId} />}
          />
          <Route
            path="/reviewArticle"
            element={<ReviewArticles Id={adminId} />}
          />
          <Route path="/createArticle" element={<CreateArticle/>} />
          <Route path="/studentList" element={<StudentList/>} />
          <Route path="/answerPage" element={<AnswerPage/>} />
          <Route path="/" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

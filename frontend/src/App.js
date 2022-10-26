import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {SignIn} from "./components/login.component";
import SignUp from "./components/signup.component";
import OpenJobs from "./components/Jobs/OpenJobs/openjobs";

import Navbar from "./components/Navbar";
import JobDetail from "./components/Jobs/OpenJobs/JobDetail";
import JobPost from "./components/Jobs/JobPost";
import CreateTest from "./components/Test/CreateTest/createTest";
import TestTable from "./components/Test/TestList/testList";
import TestAttempt from "./components/Test/AttemptTest/AttemptTest";
import TestQuestion from "./components/Test/AttemptTest/TestQuestion";
import TestResult from "./components/Test/AttemptTest/TestResult";
import UpdateForm from "./components/Jobs/UpdateForm";
import JobTable from "./components/Jobs/jobTable";
import Dialog from "./components/Test/CreateTest/Dialog";
import PostedJobs from "./components/Jobs/OpenJobs/PostedJobs";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/openjobs" element={<OpenJobs />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/jobposting" element={<JobPost />} />
            <Route path="/createtest" element={<CreateTest />} />
            <Route path="/tests" element={<TestTable />} />
            <Route path="/testAttempt" element={<TestAttempt />} />
            <Route path="/testquestion" element={<TestQuestion />} />
            <Route path="/updatejob" element={<UpdateForm />} />
            <Route path="/joblist" element={<JobTable />} />
            <Route path="/result" element={<TestResult />} />
            <Route path="/dialog" element={<Dialog/>} />
            <Route path="/JobsbyCompany" element ={<PostedJobs/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;

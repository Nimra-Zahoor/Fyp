import React, { useEffect } from "react";
import axios from "axios";

import tick from './tick.png';
import { useLocation, useNavigate } from "react-router-dom";

export default function TestResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  function sendData() {
      const body = {
        JobId: location.state.job.id,
        TestId: location.state.test.id,
        UserId: location.state.user.Id,
        result: location.state.result,
        time_started:location.state.time_started,
        time_ended:new Date()
      };
      axios
        .post(`http://127.0.0.1:8000/saveTestResults/`, body)
        .then(() => {
          // navigate(-1)
        })
        .catch((error) => {
          // setError(error);
        });
  
  }
  useEffect(() => {
    sendData()
  }, []);
    return (
      <div className="auth-inner2">
       <center><h4>Your test has been completed</h4>
       <br></br>
       <h5 > Result: {location.state.result} marks</h5>
       <div><img src={tick} alt="image" style={{width: "20vh", height : "18vh"}}/></div>
       <div className="btn">
            {location.state.job=="" ? <><button type="button" className="button" onClick={() => navigate("/tests")}>
                Go Back
            </button> </>: 
            <><button type="button" className="button" onClick={() => navigate("/tests", { state: {job:location.state.job, user:location.state.user} })}>
                Go Back 
            </button></>}
        </div>
        </center>
      </div>

    );
}

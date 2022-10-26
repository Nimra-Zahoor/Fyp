import React from "react";
import axios from "axios";
import {useNavigate,useLocation} from 'react-router-dom';
var auth = false
var user 

function SignIn(props) {
  
  
  const [emailAddress, setEmailAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    setError("You have entered an invalid email address!")
    return (false)
  }
  function refreshPage() {
    window.location.reload(false);
  }
  function sendData() {
    if (ValidateEmail(emailAddress) === true) {
      const body = {
        emailAddress: emailAddress,
        password: password,
      };
      axios
        .post(`http://127.0.0.1:8000/validateUser/`, body)
        .then((response) => {
          auth=true;
          user=response.data;
          navigate(-1)

        })
        .catch((error) => {
          setError(error);
        });
    }
  }
    return (
      
      <div className="auth-inner">
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => {
              setError("");
              setEmailAddress(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => {
              setError("");
              setPassword(event.target.value);
            }}
          />
        </div>
        {/* <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}
        <p className="text-danger p-2 m-2">{error}</p>
        <div className="d-grid">
          <button type="button" className="btn btn-dark btn-block" onClick={() => {
            sendData();
          }}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <p className="forgot-password text-right">
          Not have an account? <a href="/sign-up">Sign up</a> now
        </p>
      </form>
      </div>
    )
  }


export {SignIn,auth,user};
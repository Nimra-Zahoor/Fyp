import React from "react";
import axios from "axios";
import {useNavigate,useLocation} from 'react-router-dom';

function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
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
  // function refreshPage() {
  //   window.location.reload(false);
  // }

  function sendData() {
    setError("");
    if (ValidateEmail(emailAddress) === true) {
      const body = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password,
      };
      axios
        .post(`http://127.0.0.1:8000/saveUser/`, body)
        .then(() => {
          navigate(-1)
        })
        .catch((error) => {
          setError(error);
        });
    }
  }
  return (
    
    <div className="auth-inner">
      <form >
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>First name</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            required
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            required
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => {
             setError(" ");
              setEmailAddress(event.target.value);
            }}
          />
          
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => {
              // setError(" ");
              setPassword(event.target.value);
            }}
          />
        </div>
        <p className="text-danger p-2 m-2">{error}</p>
        <br></br>
        <div className="d-grid">
        <button
          type="button"
          className="btn btn-dark btn-block"
          onClick={() => {
            sendData();
          }}
        >
          Sign Up
        </button></div>
        <p className="forgot-password text-right"></p>
      </form>
    </div>
  );
}

export default SignUp;

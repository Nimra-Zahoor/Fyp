import React, { useEffect,useState } from "react";
import QuestionTable from "./QuestionTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../store";
import { useLocation, useNavigate } from 'react-router-dom';

function CreateTest(props) {
  const loc = useLocation();
  const navigate = useNavigate();

  const [TestName, setTestName] = React.useState("");
  const [TotalTime, setTotalTime] = React.useState("");
  const [Deadline, setDeadlne] =  React.useState("");
  const [TestDescription, setDescription] =  React.useState("");
  const [Questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState({
    Statement: "",
    testOption: false,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const test = useSelector((state) => state.test);
  useEffect(() => {
    if(loc.state)
    {
      if(loc.state.TestName){
      setTestName(loc.state.TestName)
    }
    if(loc.state.TotalTime){
      setTotalTime(loc.state.TotalTime)
    }
    if(loc.state.Deadline){
      setDeadlne(loc.state.Deadline)
    }
    if(loc.state.TestDescription){
      setDescription(loc.state.TestDescription)
    }}
  }, []);
  const dispatch=useDispatch()
  const [qbody,setqBody]=useState()
  const getTests=(testData)=>{
   setqBody(testData)
  }
  function sendData(event) {
    event.preventDefault();
  
    const body = {
      TestName: TestName,
      TotalTime: TotalTime,
      Deadline: Deadline,
      TestDescription: TestDescription,
      Questions: test,
    };
    axios
      .post(`http://127.0.0.1:8000/saveTest/`, body)
      .then((response) => {
        alert(response.data);
        navigate("/tests")
      })
      .catch((error) => {
        alert(error);
      });
  }
  
  
  return (
    <div className="auth-inner2">
      <form id="form">
        <h3>New Test</h3>
        <hr></hr>
        <h6 className="testLabel">Test Details</h6>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="testname" className="sr-only">
              Test Name
            </label>
            <input
              id="testname"
              className="form-control "
              type="text"
              name="testname"
              value={TestName}
              placeholder="Test name"
              onChange={(event) => {
                setTestName(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="testdeadline" className="sr-only">
              Test Deadline
            </label>
            <input
              id="testdeadline"
              className="form-control col-md-6"
              type="date"
              name="testdeadline"
              placeholder="Test Deadline"
              
              value={Deadline}
              onChange={(event) => {
                setDeadlne(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="totaltime" className="sr-only">
              Total Time Allowed(in minutes)
            </label>
            <input
              id="totaltime"
              className="form-control "
              type="number"
              name="totaltime"
              
              value={TotalTime}
              placeholder="Total Time (in minutes)"
              onChange={(event) => {
                setTotalTime(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="description" className="sr-only"></label>
            <textarea
              id="description"
              className="form-control "
              type="text"
              name="description"
              
              value={TestDescription}
              placeholder="Description"
              rows="4"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>

        <hr></hr>
        <div >
        <h6 className="testLabel">Add Question</h6>
        <div className="row">
          <div className="form-group col-md-10">
            <label htmlFor="question" className="sr-only">
              Question
            </label>
            <input
              id="question"
              className="form-control "
              type="text"
              name="question"
              placeholder="Question"
              onChange={(event) => {
                setQuestion((prevState) => ({
                  ...prevState,
                  ["Statement"]: event.target.value,
                }));
              }}
            />
          </div></div>

          <div className="form-group col-md-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="haveOptions"
                onChange={(event) => {
                  if (event.target.checked === true) {
                    document.getElementById("option").style.display = "block";
                  } else {
                    document.getElementById("option").style.display = "none";
                  }
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["testOption"]: event.target.checked,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="haveOptions">
                Enable Options
              </label>
            </div>
          </div>
        </div>
        <div id="option" style={{ display: "none" }}>
          <div className="row">
            <div className="form-group col-md-5">
              <label htmlFor="option1" className="sr-only">
                Option 1
              </label>
              <input
                id="option1"
                className="form-control"
                type="text"
                name="option1"
                placeholder="Option 1"

                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option1"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="option2" className="sr-only">
                Option 2
              </label>
              <input
                id="option2"
                className="form-control"
                type="text"
                name="option2"
                placeholder="Option 2"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option2"]: event.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-5">
              <label htmlFor="option3" className="sr-only">
                Option 3
              </label>
              <input
                id="option3"
                className="form-control"
                type="text"
                name="option3"
                placeholder="Option 3"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option3"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="option4" className="sr-only">
                Option 4
              </label>
              <input
                id="option4"
                className="form-control"
                type="text"
                name="option4"
                placeholder="Option 4"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option4"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-6">
                    <label className="form__label">Select Correct Answer</label>
                    <select className="form-select" id="answer" onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["answer"]: event.target.value,
                  }));
                }} >
                        <option>{question.option1}</option>
                        <option>{question.option2}</option>
                        <option>{question.option3}</option>
                        <option>{question.option4}</option>
                    </select>
                </div>
          </div>
        </div>

        <div className="testbtn">
          <button
            type="button"
            className="button"
            onClick={(event) => {
              event.preventDefault();
              dispatch(
                testActions.add({
                
                Questions: question,
                }))
              document.getElementById("question").value = "";
              document.getElementById("option1").value = "";
              document.getElementById("option2").value = "";
              document.getElementById("option3").value = "";
              document.getElementById("option4").value = "";
              document.getElementById("answer").value = "";
              setQuestions((state) => [...state, question]);
            }}
            style={{ width: "12rem" }}
          >
            Add Another Question
          </button>
        </div>
        <hr></hr>
        <QuestionTable data={Questions} sendTests={getTests} editedTest={props.edited} 
      TestName ={TestName}
      TotalTime= {TotalTime}
      Deadline = {Deadline}
      TestDescription = {TestDescription}/>
        <div className="testbtn">
          <button type="submit"  id="button-submit-form"  className="button" onClick={sendData}>
            Submit
          </button>
          <button  type="submit" className="button" onClick={() => {
        navigate("/tests")}}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateTest;

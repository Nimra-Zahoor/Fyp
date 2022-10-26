import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../store";
const Dialog = (props) => {

  const loc = useLocation();
  const test = useSelector((state) => state.test);
  const [editQuestion, seteditQuestion] = React.useState({
    Statement_: loc.state.row.Statement,
    testOption_: loc.state.row.testOption,
    option1_: loc.state.row.option1,
    option2_: loc.state.row.option2,
    option3_: loc.state.row.option3,
    option4_: loc.state.row.option4,
    answer_: loc.state.row.answer,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { row } = loc.state;
  useEffect(() => {
    if (loc.state.row.testOption) {
      document.getElementById("haveOptions").checked = loc.state.row.testOption;
      document.getElementById("option").style.display = "block";
    }
  }, [])
  return (
    <div>

      <div className="auth-inner2">
        <form>

          <div className="row">


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
                  value={editQuestion["Statement_"]}
                  placeholder="Question"
                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["Statement_"]: event.target.value,
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
                  name="haveOptions"

                  onChange={(event) => {
                    if (event.target.checked === true) {
                      document.getElementById("option").style.display = "block";
                    } else {
                      document.getElementById("option").style.display = "none";
                    }
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["testOption_"]: event.target.checked,
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
                  value={editQuestion["option1_"]}

                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["option1_"]: event.target.value,
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
                  value={editQuestion["option2_"]}

                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["option2_"]: event.target.value,
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
                  value={editQuestion["option3_"]}
                  name="option3"
                  placeholder="Option 3"
                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["option3_"]: event.target.value,
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
                  value={editQuestion["option4_"]}

                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["option4_"]: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form__label">Select Correct Answer</label>
                <select className="form-select"
                  value={editQuestion["answer_"]} id="salarytype" onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["answer_"]: event.target.value,
                    }));
                  }} >
                  <option>{editQuestion["option1_"]}</option>
                  <option>{editQuestion["option2_"]}</option>
                  <option>{editQuestion["option3_"]}</option>
                  <option>{editQuestion["option4_"]}</option>
                </select>
              </div>
            </div>
          </div>



          <div className="testbtn">
            <button type="submit" className="button" onClick={
              (event) => {
                event.preventDefault();

                dispatch(testActions.edit({
                  row: row,
                  editTest: editQuestion,
                }));


                navigate("/createtest", {
                  state: {
                    TestName: loc.state.TestName,
                    TotalTime: loc.state.TotalTime,
                    Deadline: loc.state.Deadline,
                    TestDescription: loc.state.TestDescription
                  }
                })

              }} >
              Submit
            </button>

          </div>

        </form>
      </div>


    </div>

  );
}

export default Dialog
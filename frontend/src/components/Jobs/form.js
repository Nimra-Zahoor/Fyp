import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import MultiSelect from './multiselect';
function JobPosting() {
  const loc = useLocation();

  const [title, settitle] = React.useState("");
  const [desc, setdesc] = React.useState("");
  const [companyName, setcompanyName] = React.useState("");
  const [hours, sethours] = React.useState("");
  const [salary, setsalary] = React.useState("");
  const [salarytype, setsalarytype] = React.useState("Per Year");
  const [currency, setcurrency] = React.useState("Rs/-");
  const [jobtype, setjobtype] = React.useState("Full-Time");
  const [isEdit, setIsEdit] = React.useState(false);


  const [tests, setTest] = useState([]);
  const [jobTests, setJobTests] = useState([]);
  const [test, set_test] = useState([]);

  const getSelectValue = (selectedValue) => {
    set_test(selectedValue)
  }
  let getTestbyJob = async (id) => {
    let res = await axios.get("http://127.0.0.1:8000/getTestbyJob/"+id);
    setJobTests(res.data);
  };
  useEffect(() => {
    if (loc.state) {

      setIsEdit(true)
      getTestbyJob(loc.state.id)
      
      if (loc.state.title) {
        settitle(loc.state.title)
      }
      if (loc.state.description) {
        setdesc(loc.state.description)
      }
      if (loc.state.company_name) {
        setcompanyName(loc.state.company_name)
      }
      if (loc.state.working_hours) {
        sethours(loc.state.working_hours)
      }
      if (loc.state.salary) {
        setsalary(loc.state.salary)
      }
      if (loc.state.salarytype) {
        setsalarytype(loc.state.salarytype)
      }
      if (loc.state.currency) {
        setcurrency(loc.state.currency)
      }
      if (loc.state.jobtype) {
        setjobtype(loc.state.jobtype)
      }

    }

  }, []);


  function sendData() {
    const body = {
      title: title,
      desc: desc,
      companyName: companyName,
      hours: hours,
      salary: salary,
      salarytype: salarytype,
      currency: currency,
      jobtype: jobtype,
      test: test,
    };
    if(isEdit)
    {
      body['id']=loc.state.id
    axios.put('http://127.0.0.1:8000/editJobs/', body)
  }
    else
    axios.post('http://127.0.0.1:8000/save-postjob/', body)
      .then((responce) => {
        alert(responce.data)
      })
      .catch((error) => {
        alert(error)
      });
  }
  return (

    <div className="JobPostform">
      <div className="JobPostform-body">
        <div className="title">
          <label className="JobPostform__label" >Title</label>
          <br></br>
          <input className="JobPostform__input" type="text" value={title} onChange={(e) => { settitle(e.target.value); }} id="title" placeholder="Title"
          />
        </div>

        <div className="form-group">
          <label className="JobPostform__label">Description </label>
          <br></br>
          <textarea className="JobPostform-control" value={desc}  onChange={(e) => { setdesc(e.target.value); }} id="description" rows="4"
            placeholder="Description"></textarea>
        </div>
        <div className="companyname">
          <label className="JobPostform__label" >Company Name     </label>
          <br></br>
          <input type="text" value={companyName}  onChange={(e) => { setcompanyName(e.target.value); }} id="companyname" className="JobPostform__input" placeholder="Company Name" />
        </div>
        <div className="workinghours">
          <label className="JobPostform__label" >Working Hours(per week)  </label>
          <br></br>
          <input className="JobPostform__input" type="number" value={hours}  onChange={(e) => { sethours(e.target.value); }} id="workinghours" placeholder="Working Hours" />
        </div>
        <div className="salary">
          <label className="JobPostform__label" >Salary    </label>
          <br></br>
          <input className="JobPostform__input" type="number" value={salary}  onChange={(e) => { setsalary(e.target.value); }} id="salary" placeholder="Salary" />
        </div>
        <div className="form-group">
          <label className="JobPostform__label">Type of payable salary  </label>
          <select className="JobPostform-control" value={salarytype} onChange={(e) => { setsalarytype(e.target.value); }} id="salarytype">
            <option>Per Year</option>
            <option>Per Month</option>
          </select>
        </div>
        <div className="form-group">
          <label className="JobPostform__label">Currency  </label>
          <select className="JobPostform-control" value={currency}  onChange={(e) => { setcurrency(e.target.value); }} id="currencytype">
            <option>Rs/-</option>
            <option>$</option>
            <option>€</option>
          </select>
        </div>
        <div className="form-group">
          <label className="JobPostform__label">Job Type  </label>
          <select className="JobPostform-control" value={jobtype}  onChange={(e) => { setjobtype(e.target.value); }} id="jobtype">
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>

        </div>
        <div>
          <label className="JobPostform__label">Add Test </label>
          <br />
          <MultiSelect jobTests={jobTests}
            onSend={getSelectValue}
          />
          <hr></hr>

        </div>

      </div>
      <div className="JobPostfooter">
        <button onClick={() => sendData()} type="submit" className="button">Post Job</button>
      </div>
    </div>
  )
}
export default JobPosting;
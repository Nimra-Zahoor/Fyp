import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function UpdateForm(props) {

    const loc = useLocation();
    const [title, settitle] = React.useState(loc.state.title);
    const [desc, setdesc] = React.useState(loc.state.description);
    const [companyName, setcompanyName] = React.useState(loc.state.company_name);
    const [hours, sethours] = React.useState(loc.state.working_hours);
    const [salary, setsalary] = React.useState(loc.state.salary);
    const [salarytype, setsalarytype] = React.useState(loc.state.salarytype);
    const [currency, setcurrency] = React.useState(loc.state.currency);
    const [jobtype, setjobtype] = React.useState(loc.state.jobtype);

    const [test, setTest] = useState("Python");


    function sendData() {
        const body = {
            id: loc.state.id,
            title: title,
            desc: desc,
            companyName: companyName,
            hours: hours,
            salary: salary,
            salarytype: salarytype,
            currency: currency,
            jobtype: jobtype,
            test: test,
        }

        axios.put('http://127.0.0.1:8000/editJobs/', body)
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
                    <input className="JobPostform__input" type="text" defaultValue={loc.state.title} id="title" placeholder="Title" onChange={(e) => { settitle(e.target.value); }}
                    />
                </div>

                <div className="form-group">
                    <label className="JobPostform__label">Description </label>
                    <br></br>
                    <textarea className="JobPostform-control" defaultValue={loc.state.description} id="description" rows="4"
                        placeholder="Description" onChange={(e) => { setdesc(e.target.value); }}  ></textarea>
                </div>
                <div className="companyname">
                    <label className="JobPostform__label" >Company Name     </label>
                    <br></br>
                    <input type="text" defaultValue={loc.state.company_name} id="companyname" className="JobPostform__input" placeholder="Company Name" onChange={(e) => { setcompanyName(e.target.value); }} />
                </div>
                <div className="workinghours">
                    <label className="JobPostform__label" >Working Hours(per week)  </label>
                    <br></br>
                    <input className="JobPostform__input" type="number" defaultValue={loc.state.working_hours} onChange={(e) => { sethours(e.target.value); }} id="workinghours" placeholder="Working Hours" />
                </div>
                <div className="salary">
                    <label className="JobPostform__label" >Salary    </label>
                    <br></br>
                    <input className="JobPostform__input" type="number" defaultValue={loc.state.salary} id="salary" onChange={(e) => { setsalary(e.target.value); }} placeholder="Salary" />
                </div>
                <div className="form-group">
                    <label className="JobPostform__label">Type of payable salary  </label>
                    <select className="JobPostform-control" defaultValue={loc.state.salarytype} id="salarytype" onChange={(e) => { setsalarytype(e.target.value); }} >
                        <option>Per Year</option>
                        <option>Per Month</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="JobPostform__label">Currency  </label>
                    <select className="JobPostform-control" defaultValue={loc.state.currency} onChange={(e) => { setcurrency(e.target.value); }} id="currencytype">
                        <option>Rs/-</option>
                        <option>$</option>
                        <option>€</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="JobPostform__label">Job Type  </label>
                    <select className="JobPostform-control" defaultValue={loc.state.jobtype} onChange={(e) => { setjobtype(e.target.value); }} id="jobtype">
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Internship</option>
                    </select>

                </div>
                <div>
                    <label className="JobPostform__label">Add Test </label>
                    <select>
                        <option>{test}</option>
                    </select>
                </div>

                <div>


                </div>
                <div className="form-group">


                    <div>
                        <button onClick={() => { sendData() }} type="submit" className="button">Update Job</button>

                    </div>


                </div>
            </div>
        </div>
    );

}
export default UpdateForm;

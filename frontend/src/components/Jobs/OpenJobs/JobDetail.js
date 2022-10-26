import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {auth,user} from "../../login.component";

function JobDetail(props) {
  
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <div>
      <div id='openJobsHeader'>
      {console.log(location.state.id)}
        <header className='JobHeader'>{location.state.title}</header>
        <h5 className='company_title'>{location.state.company_name}</h5>
        <button className="btnn" onClick={() => {apply()}}>
          Apply Now
        </button>
      </div>


      <div className="DetailBody">
        <div className="DetailContainer">
          <p className="items">Job Type: {location.state.jobtype}</p>
          <p className="items">{location.state.working_hours} Hours per Week </p>
          <p className="items">{location.state.salary} {location.state.currency} {location.state.salarytype} </p>
        </div>
        <div>
          <h5 className="desc_title">Description: </h5>
          <p className="desc_detail">{location.state.description}</p>
        </div>


      </div>
    </div>
  );
   function apply() {
    if (auth == false)
      navigate("/sign-in")
    else
    navigate("/tests", { state: { job: location.state, user: user } })
  }
}

export default JobDetail;  
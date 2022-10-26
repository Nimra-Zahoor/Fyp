import React from "react";
import { useNavigate } from "react-router-dom";
function JobCard(detail) {
    const navigate = useNavigate();
    
    return (
      <div className="card card-1">
        <div>
          <h5 className="card__title">{detail.data.title}</h5>
          </div>
          <div>
          <p className="card__title_1">{detail.data.company_name}</p>
        </div>
        <div>
        <p className="card__paragraph">{detail.data.jobtype}</p>
        <p className="card__paragraph_1">
          {detail.data.salary} {detail.data.currency} {detail.data.salarytype}
        </p>
        </div>
  
        <p className="card__apply">
          <button className="card__link" onClick={()=>navigate("/jobdetail", { state: detail.data })} >
            More Detail
          </button>
        </p>
        {/* <div className="auth-wrapper"> */}
          {/* <Routes>
          <Route path="/jobdetail" element={<JobDetail data={detail}/>} />
          </Routes>
          </div> */}
      </div>
    );
  }
export default JobCard;  
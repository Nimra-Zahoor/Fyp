import axios from "axios";
import React, { useEffect } from "react";
import JobCards from "./JobCards";

function OpenJobs(props) {

  const [job,setJob]=React.useState([])
  let getData = async () => {
    let res = await axios.get("http://127.0.0.1:8000/getJobs/");
    let data = await res.data;
    setJob(<JobCards data={data}/>);
  }; 
 
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="JobContainer">

      <div id='openJobsHeader'>
        <header className='JobHeader'>Open Jobs</header>
      </div>
      <div id='JobBody'>
        <div className="cards">
          {job}
        </div>

      </div>
    </div>
  )
}

export default OpenJobs;
import axios from 'axios'
import Card from "@material-ui/core/Card";
import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function PostedJobs() {
        
         let data;
        const [job,setJob]=useState({})
        const  [ID, setID] = useState()
        const [Status, setStatus] = useState()
        const [allJob,setallJobs]=useState([])
        let getData = async () => {
          let res = await axios.get("http://127.0.0.1:8000/details_job/");
           data = await res.data;
           setJob(data);
        }; 
        
       
        
        let getJobData = async () => {
          let res = await axios.get("http://127.0.0.1:8000/getJobsbyCompany/"+ 3);
          
           data = await res.data;
           console.log(res.data);
           console.log('res.data.jobs',res.data.alljobs)
        setJob(data);
        
      
       
        }; 
       
       console.log('job?.alljob',job?.alljobs)
       
      //setallJobs(job?.alljobs);

     //  console.log(allJob)
    //  jobID = alljobs.id;
        let getStatusbyJob = async()=>{
          let res = await axios.get("http://127.0.0.1:8000/getStatusbyJob/"+ 3);
          data = await res.data;
          setStatus(data);
          console.log(Status)
          
        }
        useEffect(() => {
          getStatusbyJob();
          getData();
          getJobData();
         
        }, [ID])
        const actions = [
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 }
        ];
const [jobID, setJobID] = useState();

  return (
    
    <div>
     <Card>
     {//allJob.map((item, id) => (
      //<div key={id}>
        //<div>Title {item.title}</div>
        //<div>Age: {item.salary}</div>
     // </div>
   // ))
   }
         ID : <h1>{ID}</h1>
   <select className="JobPostform-control" value={ID} onChange={(e) => { setID(e.target.value); }} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
         
         



</Card>
    </div>
  )


}

export default PostedJobs

import React, { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {useNavigate} from 'react-router-dom';
import DeleteJob from "./deleteJob"
function JobTable() {
  const [data, setData] = React.useState("");
  let getData = async () => {
    let res = await axios.get("http://127.0.0.1:8000/getJobs/");
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
    
    const columns = [
      {
        name: "Title",
        selector: (row) => row.title,
        width: "20em",
        headerStyle: () => {
          return { textAlign: "center",
                  fontweight:"bolder"};
        },
      },
      {
        name: "Company Name",
        selector: (row) => row.company_name,
      },
      {
        name: "Job Type",
        selector: (row) => row.jobtype,
      },
      {
        name: "Working Hours per week",
        selector: (row) => row.working_hours,
      },
      {
        name: "Salary",
        selector: (row) => row.salary+" " + row.currency +" "+row.salarytype,
      },
    
      {
        name: "Action",
        width: "10em",
        cell: (row) => (
          <button className="button" onClick={() => navigate("/jobposting", { state: row })}>
            Update
          </button>
        ),
      }, 
      // {
      //   name: "Action",
      //   width: "10em",
      //   cell: (row) => (
      //     <DeleteJob/>
      //   ),
      // },
    ];  
 return (
  <div className="auth-inner2">
    <button className="button" onClick={() => navigate("/jobposting")}>
        Post Job
      </button>
    <DataTable
      title="Job List"
      columns={columns}
      data={data}
      fixedHeader
      pagination
      responsive
    />
  </div>
);
 }
export default JobTable
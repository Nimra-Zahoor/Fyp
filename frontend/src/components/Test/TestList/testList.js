import React, { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate, useLocation } from 'react-router-dom';
export default function TestTable(props) {
  const location = useLocation();
  let state_;
  const [data, setData] = React.useState("");
  let getTests = async () => {
    let res = await axios.get("http://127.0.0.1:8000/tests/");
    setData(res.data);
  };

  let getTestbyJob = async () => {
    let res = await axios.get("http://127.0.0.1:8000/getTestbyJob/" + location.state.job.id);
    setData(res.data);
  };

  useEffect(() => {
    if (location.state == null) {
      getTests();
    }
    else {
      getTestbyJob();
    }

  }, []);
  const navigate = useNavigate();
  const columns = [
    {
      name: "Test Name",
      selector: (row) => row.test_Name,
      width: "30em",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "Total Time",
      selector: (row) => row.total_Time_for_Test_in_Minutes,
    },
    {
      name: "Deadline",
      selector: (row) => row.deadline,
    },
    {
      name: "No. of Questions",
      selector: (row) => row.Questions.length,
    },
    {
      name: "Action",
      cell: (row) => (
        
        <button className="button" onClick={() => {
          if (location.state) {
           navigate("/testAttempt", { state: {row:row,job:location.state.job,user:location.state.user }})
          }
          
        }}>
          Attempt
        </button>
      ),
    },
  ];

  return (
    <div className="auth-inner2">
      {location.state == null ? <><button className="button" onClick={() => navigate("/createtest")}>
        Create Test
      </button></> : <br></br>}

      <DataTable
        title="Test List"
        columns={columns}
        data={data}
        fixedHeader
        pagination
        responsive
      />
    </div>
  );
}

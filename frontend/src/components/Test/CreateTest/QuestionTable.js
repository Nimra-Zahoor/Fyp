import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { testActions } from "../store";
export default function QuestionTable(props) {

  const[check,setCheck]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  const columns = [
    {
      name: "Question",
      selector: (row) => row.Statement,
      width: "40em",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "Option 1",
      selector: (row) => row.option1,
    },
    {
      name: "Option 2",
      selector: (row) => row.option2,
    },
    {
      name: "Option 3",
      selector: (row) => row.option3,
    },
    {
      name: "Option 4",
      selector: (row) => row.option4,
    },
    {
      name: "Answer",
      selector: (row) => row.answer,
    },
    
    {
      name: "Edit",
      cell: (row) => (
        <button
        className="button"
          onClick={function edit(event)  {
            event.preventDefault();
            navigate("/dialog",{ state: {row:row,
              TestName :props.TestName,
              TotalTime: props.TotalTime,
              Deadline : props.Deadline,
              TestDescription : props.TestDescription} });
            setCheck(true)
          }}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
        className="button"
          onClick={(event) => {
            event.preventDefault();
            dispatch(
              testActions.delete({
                testQuestion: row,
              })
            );
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (

    <div>
    
      <DataTable
        title="Questions"
        columns={columns}
        data={test}
        fixedHeader
        pagination
        responsive
     
      />
    </div>
  );
}

import React from "react";
import DataTable from "react-data-table-component";
export default function TestTable(props) {
  const columns = [
    {
      name: "Tests",
      selector: (row) => row.test_Name,
    },
   
  ];

  return (
    <DataTable
      title="Tests"
      columns={columns}
      data={props.data}
      fixedHeader
      pagination
      responsive
    />
  );
}

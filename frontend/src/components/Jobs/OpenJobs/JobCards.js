import React from "react";
import JobCard from "./JobCard";
function JobCards(props) {
  let jobs = [];
  for (let i = 0; i < props.data.length; i++) {
    jobs.push(<JobCard data={props.data[i]}/>);
  }
  return jobs;
}
export default JobCards;

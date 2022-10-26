import axios from 'axios'
import Card from '@material-ui/core/Card'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function PostedJobs() {
  const [job, setJob] = useState({})
  const [ID, setID] = useState()
  const [Status, setStatus] = useState()
  const [allJob, setallJobs] = useState([])
  const [jobID, setJobID] = useState()

  const actions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ]

  let getData = async () => {
    let res = await axios.get('http://127.0.0.1:8000/details_job/')
    setJob(res.data)
  }

  let getJobData = async () => {
    let res = await axios.get('http://127.0.0.1:8000/getJobsbyCompany/' + 3)

    console.log('res.data.jobs', res.data.alljobs)
    setJob(res.data)
  }

  let getStatusbyJob = async () => {
    let res = await axios.get('http://127.0.0.1:8000/getStatusbyJob/' + 3)
    setStatus(res.data)
    console.log(Status)
  }

  useEffect(() => {
    getStatusbyJob()
    getData()
    getJobData()
  }, [ID])

  return (
    <div>
      <Card>
        {job?.alljobs.map((item, id) => (
          <div key={id}>
            <div>Title {item.title}</div>
            <div>Age: {item.salary}</div>
          </div>
        ))}
        ID : <h1>{ID}</h1>
        <select
          className='JobPostform-control'
          value={ID}
          onChange={(e) => {
            setID(e.target.value)
          }}
        >
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

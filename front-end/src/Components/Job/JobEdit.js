import React from 'react'
import { useContext } from "react";
import { JobsContext } from "../../Contexts/JobsContext";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { UserContext } from "../../Contexts/UserProvider"
const API = apiURL();

function JobEdit() {
    const { job, setJob } = useContext(JobsContext);
    const { jobs, setJobs } = useContext(JobsContext);
    const user = useContext(UserContext);
    const { display, setDisplay} = useContext(JobsContext);
    const handleDelete = async () => {

        try {
            const res = await axios.delete(`${API}/jobs/${job.id}?uid=${user.uid}`);
            if (res.data.success) {
                setJobs(jobs.filter((jb) => jb.id !== job.id));
                setJob({
                    id: "",
                    job_name: "",
                    description: "",
                    location: "",
                    number_of_hours: "",
                    status: "",
                    completed: false
                })
                setDisplay("Info")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setJob({ ...job, [e.target.id]: e.target.value });
    };
    const handleStatus = async (e) => {
        // e.preventDefault();
        // setJob({ ...job, status: e.target.innerHTML });
        const newStatus = {...job, status: e.target.innerHTML}
        await updateJob(newStatus)
        setJob(newStatus)
        console.log(job)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateJob(job)
        setDisplay("Info")

    }
    const updateJob = async (input) => {
        try {
            const res = await axios.put(`${API}/jobs/${job.id}`, input);
            if (res.data.success) {
                setJobs(jobs.map((jb) => jb.id === job.id ? (jb = res.data.payload) : jb))
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div className="card" >
                <div className="card-body" >
                    <h5 className="card-title">Set Status</h5>
                    <p className="card-text">The status of this job is currently {job.status}.</p>
                    <a onClick={handleStatus} id="status" value="1" className="btn btn-light">Not in progress</a>
                    <a onClick={handleStatus} id="status" value="2" className="btn btn-primary">In progress</a>
                    <a onClick={handleStatus} id="status" value="3" className="btn btn-success">Completed</a>
                </div>
            </div>
            <div className="card" >
                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="input-group mb-3">
                            <span
                                htmlFor="job_name"
                                className="input-group-text"
                                id="inputGroup-sizing-default">Job Name
                            </span>
                            <input
                                id="job_name"
                                value={job.job_name}
                                type="text"
                                onChange={handleChange}
                                required
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                htmlFor="description">Description</span>
                            <textarea
                                id="description"
                                value={job.description}
                                type="text"
                                onChange={handleChange}
                                required
                                className="form-control"
                                aria-label="With textarea"></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <span
                                htmlFor="location"
                                className="input-group-text"
                                id="inputGroup-sizing-default">Location</span>
                            <input
                                id="location"
                                value={job.location}
                                type="text"
                                onChange={handleChange}
                                required
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span
                                htmlFor="number_of_hours"
                                className="input-group-text"
                                id="inputGroup-sizing-default">Number of hours</span>
                            <input
                                id="number_of_hours"
                                value={job.number_of_hours}
                                onChange={handleChange}
                                type="number"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Deleting a job</h5>
                    <p className="card-text">Only you as an administrator can delete this job. Click wisely or
                        you will have to create the job again.</p>
                    <a onClick={handleDelete} className="btn btn-danger">Delete Job</a>
                </div>
            </div>


        </div>)

}

export default JobEdit

import {Link, Outlet} from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import {useEffect, useState, useCallback} from "react";
import {Slide} from "react-awesome-reveal";
import Loading from "./loading/Loading";
import useFetch from "../hooks/useFetch";
import JobDescriptionAside from "./JobDetailsAside";

export default function JobsList() {
    // const [jobs, setJobs] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [url, setUrl] = useState(`${apiUrl}jobs/`);

    // const handleChangeUtl = (newUrl) => {
    //     setUrl(newUrl);
    // };
    const handleChangeUrl = useCallback((newUrl) => {
        setUrl(newUrl);
    }, []);

    const {data: jobs, loading, error, refetch} = useFetch(url, []);

    // useEffect(() => {
    //     // fetch("http://127.0.0.1:8000/jobs/api/")
    //     fetch(`${apiUrl}jobs/?title=${city}&seniority=${seniority}`)
    //         .then((response) => response.json())
    //         .then((data) => setJobs(data));
    //     setLoading(false);
    // }, []);

    return (
        <>
            <Breadcrumbs
                pageTitle="Job offers"
                pageInfo="Job offers from leading companies
                           New Company jobs added daily..."
            />
            {loading ? (
                <Loading />
            ) : (
                <section className="section blog-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <Slide direction="left" duration="1000" triggerOnce="true">
                                    {jobs.map((job) => (
                                        <div key={job.id} className="single-job">
                                            <div className="job-image-list">
                                                <img src={`https://res.cloudinary.com/drjgddl0y/${job.job_image}`} alt="#" />
                                            </div>
                                            <div className="job-content">
                                                <Link to={`/jobs/${job.id}`}>
                                                    <h4 style={{paddingRight: "0px"}}>{job.title}</h4>
                                                </Link>
                                                <div className="truncate-overflow-jobs">
                                                    <p>{job.description}</p>
                                                </div>
                                                <ul>
                                                    <li>
                                                        <i className="lni lni-euro"></i> {job.salary}
                                                    </li>
                                                    <li>
                                                        <i className="lni lni-map-marker"></i> {job.location}
                                                    </li>
                                                    <li>
                                                        <i className="lni lni-calendar"></i> {job.seniority}
                                                    </li>
                                                    <li>
                                                        <i className="lni lni-timer"></i> {job.job_type}
                                                    </li>
                                                </ul>
                                                <ul>
                                                    {job &&
                                                        job.needed_skills &&
                                                        job.needed_skills.map((skill) => (
                                                            <li key={skill}>
                                                                <span>{skill}</span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="job-button2"></div>
                                        </div>
                                    ))}
                                </Slide>
                            </div>

                            <JobDescriptionAside handleChangeUrl={handleChangeUrl} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

import {Link, Outlet} from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import {useEffect, useState, useCallback} from "react";
import {Slide} from "react-awesome-reveal";
import Loading from "./loading/Loading";
import JobDetailsnAside from "./JobDetailsAside";

export default function JobsList() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [title, setTitle] = useState(""); // For job title search
    const [seniority, setSeniority] = useState(""); // For seniority filter
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        if (name === "title") {
            setTitle(value);
        } else if (name === "seniority") {
            setSeniority(value);
        } else if (name === "location") {
            setLocation(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTitle("");
        setSeniority("");
        setLocation("");
        setCategory("");
    };

    useEffect(() => {
        setLoading(true);
        fetch(
            `${apiUrl}jobs/?${new URLSearchParams({
                title,
                seniority,
                location,
                category,
            }).toString()}`
        )
            .then((response) => response.json())
            .then((data) => setJobs(data));
        setLoading(false);
    }, [title, seniority, location, category]);

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

                            {/* <JobDescriptionAside handleChangeUrl={handleChangeUrl} /> */}
                            <JobDetailsnAside title={title} seniority={seniority} category={category} location={location} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

import {Link, useSearchParams} from "react-router-dom";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useEffect, useState, useCallback} from "react";
import {Slide} from "react-awesome-reveal";
import Loading from "../loading/Loading";
import JobDetailsnAside from "./JobListAside";
import PopularTags from "../popularTag/PopularTag";
import styles from "./JobsList.module.css";

export default function JobsList() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [title, setTitle] = useState(""); // For job title search
    const [seniority, setSeniority] = useState(""); // For seniority filter
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [skill, setSkill] = useState("");
    const [jobs, setJobs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === "title") {
            setTitle(value);
        } else if (name === "seniority") {
            setSeniority(value);
        } else if (name === "location") {
            setLocation(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTitle("");
        setSeniority("");
        setLocation("");
        setCategory("");
        searchParams.delete("category");
    };

    useEffect(() => {
        setLoading(true);
        const categoryParam = searchParams.get("category");
        const skillPArams = searchParams.get("skill");
        fetch(
            `${apiUrl}jobs/?${new URLSearchParams({
                title,
                seniority,
                location,
                category: categoryParam || category,
                skill: skillPArams || skill,
            }).toString()}`
        )
            .then((response) => response.json())
            .then((data) => setJobs(data));
        setLoading(false);
    }, [title, seniority, location, category, searchParams]);

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
                                <div className={styles["popular-tag"]}>
                                    <PopularTags skill={skill} handleInputChange={handleInputChange} />
                                </div>
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
                                            <div className="job-button2">
                                                <Link className="company-link" to={`/companies/${job.user}/`}>
                                                    <span>Company : {job.company?.name}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </Slide>
                            </div>

                            {/* <JobDescriptionAside handleChangeUrl={handleChangeUrl} /> */}
                            <JobDetailsnAside title={title} seniority={seniority} category={category} location={location} skill={skill} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

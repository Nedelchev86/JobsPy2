import {Link, Outlet} from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import {useEffect, useState} from "react";
import {Slide} from "react-awesome-reveal";
import Loading from "./loading/Loading";

export default function JobsList() {
    const [jobs, setJobs] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch("http://127.0.0.1:8000/jobs/api/")
        fetch(`${apiUrl}jobs/`)
            .then((response) => response.json())
            .then((data) => setJobs(data));
        setLoading(false);
    }, []);

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

                            <aside className="col-lg-4 col-md-12 col-12">
                                <Slide direction="right" duration="1000" triggerOnce="true">
                                    <div className="sidebar">
                                        <div className="widget search-widget">
                                            <form method="get">
                                                <input type="text" name="q" placeholder="Search by job title" />
                                                <button type="submit">
                                                    <i className="lni lni-search-alt"></i>
                                                </button>
                                            </form>
                                        </div>

                                        <div className="widget search-widget">
                                            <form method="GET">
                                                <select style={{maxWidth: "70%"}} className="form-select form-select-sm" name="seniority">
                                                    <option value="">All</option>

                                                    {/* {% for seniority in seniorities %}
                                        <option value="{{ seniority.name }}">{{ seniority.name }}</option>
                                    {% endfor %} */}
                                                </select>
                                                <div>
                                                    <button type="submit">Filter</button>
                                                </div>
                                            </form>
                                        </div>
                                        {/* 
                        {% include "jobs/category_slide.html" %} */}

                                        <div className="widget popular-feeds">
                                            <h5 className="widget-title">
                                                <span>Latest Blog Posts with DRF</span>
                                            </h5>
                                            <div className="popular-feed-loop"></div>
                                        </div>

                                        <div className="widget popular-tag-widget">
                                            <h5 className="widget-title">
                                                <span>Popular Tags</span>
                                            </h5>
                                            <div className="tags">
                                                <a href="#">ToDo</a>
                                            </div>
                                        </div>
                                    </div>
                                </Slide>
                            </aside>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

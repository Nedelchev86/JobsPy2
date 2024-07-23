import {useState, useEffect} from "react";
import Breadcrumbs from "./Breadcrumbs";
import {useParams, Link} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import LoginForm from "./LoginForm";
import styles from "./JobDetails.module.css";

export default function JobDetails() {
    const [job, setJob] = useState({});
    const {id} = useParams();
    const [applicants, setApplicants] = useState({});
    const {auth, isAuthenticated, user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // const [status, setStatus] = useState("");

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/jobs/${id}/`, {})
            .then((response) => response.json())
            .then((data) => setJob(data))
            .catch((error) => console.error("Error fetching jobseeker:", error));
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        fetch(`http://127.0.0.1:8000/api/jobs/${id}/applicants/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setApplicants(data.find((applicant) => applicant.user === user.user.user));
            })
            .catch((error) => console.error("Error fetching applicant:", error));
    }, [id, auth]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        fetch(`http://127.0.0.1:8000/api/jobs/${id}/favorite/check/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setIsFavorite(data))
            .catch((error) => console.error("Error chech is favorite:", error));
    }, []);

    console.log(isAuthenticated);

    const handleToggleFavorite = () => {
        try {
            if (isFavorite.is_favorite) {
                fetch(`http://127.0.0.1:8000/api/jobs/${id}/favorite/remove/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                    .then((response) => response)
                    .then((data) => data);

                setIsFavorite({is_favorite: false});
            } else {
                fetch(`http://127.0.0.1:8000/api/jobs/${id}/favorite/add/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => data);
                console.log("Added");
                setIsFavorite({is_favorite: true});
            }
        } catch (error) {
            console.error("Error toggling favorite status:", error);
        }
    };

    const handleApply = async () => {
        // const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/apply/`, {
        await fetch(`http://127.0.0.1:8000/api/jobs/${id}/apply/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "application/json",
            },
        });
    };

    let isJobOwner = false;
    if (user) {
        isJobOwner = isAuthenticated && job.user === user.user.user;
    }

    return (
        <>
            <Breadcrumbs pageTitle="Job Details" pageInfo="Job Details" />

            <div className="job-details section">
                <div className="container">
                    <div className="row mb-n5">
                        <div className="col-lg-8 col-12">
                            <div className="job-details-inner">
                                <div className="job-details-head row mx-0">
                                    <div className="company-logo col-auto">
                                        {job.job_image && (
                                            <a href="#" style={{borderRadius: "4px", overflow: "hidden"}}>
                                                <img className="company-logo-big" src={`https://res.cloudinary.com/drjgddl0y/${job.job_image}`} alt="Company Logo" />
                                            </a>
                                        )}
                                    </div>

                                    <div className="content col">
                                        <h5 className="title">{job.title}</h5>
                                        <ul className="meta">
                                            <li>
                                                <strong className="text-primary">
                                                    <a href="#">{job.company}</a>
                                                </strong>
                                            </li>
                                            <li>
                                                <i className="lni lni-map-marker"></i> {job.location}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="job-details-body">
                                    <h6 className="mb-3">Job Description</h6>
                                    <p>{job.description}</p>
                                    <h6 className="mb-3 mt-4">Responsibilities</h6>
                                    {job.responsibilities}
                                    <h6 className="mb-3 mt-4">Benefits</h6>
                                    {job.benefits}
                                </div>

                                <div className="single-section skill">
                                    <h4>Skills</h4>
                                    <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                        {job.needed_skills &&
                                            job.needed_skills.map((skill) => (
                                                <li key={skill} className={styles.skills}>
                                                    {skill}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="job-details-sidebar">
                                {user && user.user_type === "jobseeker" && (
                                    <div className="sidebar-widget">
                                        <div className="inner">
                                            <div className="row m-n2 button">
                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    {!isFavorite.is_favorite && (
                                                        <Link onClick={handleToggleFavorite} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i> Save to Favorite
                                                        </Link>
                                                    )}
                                                    {isFavorite.is_favorite && (
                                                        <Link onClick={handleToggleFavorite} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i> Remove from Favorite
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    {applicants?.id && (
                                                        <Link to="/dashboard/applyed-jobs" className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i>
                                                            {applicants.status}
                                                        </Link>
                                                    )}
                                                    {!applicants?.id && (
                                                        <Link onClick={handleApply} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i>Apply
                                                        </Link>
                                                    )}

                                                    {!isAuthenticated && (
                                                        <Link onClick={handleOpenModal} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i>Apply Login
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!user && (
                                    <div className="sidebar-widget">
                                        <div className="inner">
                                            <div className="row m-n2 button">
                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    {!isAuthenticated && (
                                                        <Link onClick={handleOpenModal} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i> Save to Favorite
                                                        </Link>
                                                    )}
                                                </div>

                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    {!isAuthenticated && (
                                                        <Link onClick={handleOpenModal} className="d-block btn">
                                                            <i className="fa fa-heart-o mr-1"></i>Apply
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {user && user.user_type === "company" && isJobOwner && (
                                    <div className="sidebar-widget">
                                        <div className="inner">
                                            <div className="row m-n2 button">
                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    <Link to={`/dashboard/edit-job/${id}`} className="d-block btn">
                                                        <i className="fa fa-heart-o mr-1"></i>Edit Job
                                                    </Link>
                                                </div>
                                                <div className="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                                    <Link to={`/dashboard/applicants/jobs/${id}`} className="d-block btn btn-alt">
                                                        Candidates
                                                        <span className="btn" style={{display: "inline", padding: "5px 10px"}}>
                                                            {applicants?.length}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="sidebar-widget">
                                    <div className="inner">
                                        <h6 className="title">Job Overview</h6>
                                        <ul className="job-overview list-unstyled">
                                            <li>
                                                <strong>Published on:</strong> {job.created_at}
                                            </li>

                                            <li>
                                                <strong>Vacancy:</strong> {job.vacancy}
                                            </li>

                                            <li>
                                                <strong>Employment Status:</strong> {job.job_type}
                                            </li>
                                            <li>
                                                <strong>Experience:</strong> {job.seniority}
                                            </li>
                                            <li>
                                                <strong>Job Location:</strong> {job.location}
                                            </li>

                                            <li>
                                                <strong>Salary:</strong> {job.salary}
                                            </li>

                                            <li>
                                                <strong>Application Deadline:</strong> {job.deadline}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sidebar-widget">
                                    <div className="inner">
                                        <h6 className="title">Job Location</h6>
                                        <div className="mapouter">
                                            <div className="gmap_canvas">
                                                <iframe width="100%" height={300} id="gmap_canvas" src={`https://maps.google.com/maps?q=${job.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />
                                                {/* <a href="https://123movies-to.com">123movies old site</a> */}
                                                <style
                                                    dangerouslySetInnerHTML={{
                                                        __html: ".mapouter{position:relative;text-align:right;height:300px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:100%;}",
                                                    }}
                                                />
                                                <a href="https://maps-google.github.io/embed-google-map/">embed google map</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LoginForm show={showModal} handleClose={handleCloseModal} />
        </>
    );
}

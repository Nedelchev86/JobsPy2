import {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useParams, Link} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import styles from "./JobDetails.module.css";
import Loading from "../loading/Loading";
import {formatDate} from "../../utils/formatDate";
import LoginModal from "../loginModal/LoginModal";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";
import GoogleMapComponent from "../googleMap/GoogleMapComponent";
import {getJobDetails, getApplicantsForJob} from "../../api/jobsApi";
import {CLOUDINARY_URL} from "../../config";

export default function JobDetails() {
    // const [job, setJob] = useState({});
    const {id} = useParams();
    const [applicants, setApplicants] = useState({});
    const {auth, isAuthenticated, user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);

    const statusClass = {
        Pending: "pending",
        Accepted: "apply",
        Rejected: "rejected",
    };

    // const [status, setStatus] = useState("");

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const {data: job, loading, error, refetch} = getJobDetails(id);
    // const {data: applicants, loadingApplicant, errorApplicant} = getApplicantsForJob();

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/`, {})
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setJob(data);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => console.error("Error fetching jobseeker:", error));
    // }, [id]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        if (!user) {
            return;
        }
        fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/applicants/`, {
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
    }, [id, auth, user, isApplied]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/favorite/check/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setIsFavorite(data))
            .catch((error) => console.error("Error chech is favorite:", error));
    }, []);

    const handleToggleFavorite = () => {
        try {
            if (isFavorite.is_favorite) {
                fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/favorite/remove/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                    .then((response) => response)
                    .then((data) => data);
                toast.success("Successfully removed from favorites");

                setIsFavorite({is_favorite: false});
            } else {
                fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/favorite/add/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => data);
                console.log("Added");
                toast.success("Successfully added to favorites");

                setIsFavorite({is_favorite: true});
            }
        } catch (error) {
            console.error("Error toggling favorite status:", error);
            toast.error("Error toggling favorite status");
        }
    };

    const handleApply = async () => {
        // const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}/apply/`, {

        if (!user.user.activated) {
            toast.error(`Please fill your profile information (Click to Dashboard)`);

            return;
        }
        try {
            await fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/apply/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth}`,
                    "Content-Type": "application/json",
                },
            });
            setIsApplied(true);
            toast.success("Your job application has been sent successfully");
        } catch (error) {
            toast.error(`Login failed. Invalid email or password`);
        }
    };

    let isJobOwner = false;
    if (user) {
        isJobOwner = isAuthenticated && job.user === user.user.user;
    }
    console.log(user);
    return (
        <>
            <Breadcrumbs pageTitle="Job Details" pageInfo="Job Details" />

            <div className="job-details section">
                <div className="container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="row mb-n5">
                            <div className="col-lg-8 col-12">
                                <div className="job-details-inner">
                                    <div className="job-details-head row mx-0">
                                        <div className="company-logo col-auto">
                                            {job.job_image === null ? (
                                                <Link to="#" style={{borderRadius: "4px", overflow: "hidden"}}>
                                                    <img className="company-logo-big" src="/images/default/default.jpg" alt="Company Logo" />
                                                </Link>
                                            ) : (
                                                <Link to="#" style={{borderRadius: "4px", overflow: "hidden"}}>
                                                    <img className="company-logo-big" src={`${CLOUDINARY_URL}${job.job_image}`} alt="Company Logo" />
                                                </Link>
                                            )}
                                        </div>

                                        <div className="content col">
                                            <h5 className="title">{job.title}</h5>
                                            <ul className="meta">
                                                <li>
                                                    <strong className="text-primary">
                                                        <Link to={`/companies/${job.user}`}>{job.company} </Link>
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
                                                    <li key={skill}>
                                                        <Link to={`../jobs/?skill=${skill}`} className={styles.skills}>
                                                            {skill}
                                                        </Link>
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
                                                            <Link to="/dashboard/applyed-jobs" className={`d-block btn ${statusClass[applicants?.status]}`}>
                                                                <i className="fa fa-heart-o mr-1"></i>
                                                                {applicants.status}
                                                            </Link>
                                                        )}
                                                        {!applicants?.id && (
                                                            <Button onClick={handleApply} className="d-block btn">
                                                                <i className="fa fa-heart-o mr-1"></i>Apply
                                                            </Button>
                                                        )}

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
                                                    <strong>Published on:</strong> {formatDate(job.created_at)}
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
                                                <div className="gmap_canvas"></div>
                                                <GoogleMapComponent city={job?.location} address="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <LoginModal show={showModal} handleClose={handleCloseModal} />
        </>
    );
}

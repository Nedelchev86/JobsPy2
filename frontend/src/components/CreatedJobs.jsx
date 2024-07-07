import {useState, useEffect} from "react";
import {useAuth} from "../contexts/Contexts";
import {Link} from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModa";
import {useJobs} from "../contexts/JobContext";

export default function CreatedJobs() {
    const [jobs, setJobs] = useState([]);
    const {auth, user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const {fetchJobs} = useJobs();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/created-jobs/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setJobs(data));
    }, []);

    const handleOpenModal = (jobId) => {
        setJobToDelete(jobId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setJobToDelete(null);
    };

    const handleDeleteJob = () => {
        if (jobToDelete) {
            fetch(`http://127.0.0.1:8000/api/jobs/${jobToDelete}/delete/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setJobs(jobs.filter((job) => job.id !== jobToDelete));
                        fetchJobs();
                        handleCloseModal();
                    } else {
                        console.error("Error deleting job");
                    }
                })
                .catch((error) => console.error("Error deleting job:", error));
        }
    };

    return (
        <div className="job-items">
            {jobs.map((job) => (
                <div key={job.id} className="manage-content">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-7 col-md-7 col-12">
                            <div className="title-img">
                                <div className="can-img">
                                    <img src={`https://res.cloudinary.com/drjgddl0y/${job.job_image}`} alt="#" />

                                    {/* <img src="{{ user.company.image.url }}" alt="#" /> */}
                                </div>
                                <h3>
                                    {job.title}
                                    <span>{job.category}</span>
                                </h3>
                            </div>
                        </div>
                        {/* <div className="col-lg-1 col-md-1 col-12">
                            <p className="location">
                                <i className="lni lni-map-marker"></i>
                                {job.location}
                            </p>
                        </div> */}

                        <div className="col-lg-1 col-md-1 col-12">
                            <div className="button">
                                <button style={{backgroundColor: "#2042e314", color: "red"}} onClick={() => handleOpenModal(job.id)} className="btn">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-2 col-12">
                            <div className="button">
                                <Link to={`/dashboard/edit-job/${job.id}`} className="btn">
                                    Edit
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-2 col-12">
                            <div className="button">
                                <Link to={`/jobs/${job.id}`} className="btn">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <DeleteConfirmationModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleDeleteJob} />
        </div>
    );
}

import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import {Link} from "react-router-dom";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmationModal";
import {useJobs} from "../../contexts/JobContext";
import {getJobsByCompany} from "../../api/companyApi";
import {CLOUDINARY_URL} from "../../config";
import useDelete from "../../hooks/useDelete";
import {toast} from "react-toastify";
import {deleteJob} from "../../api/jobsApi";
import Loading from "../loading/Loading";

export default function CreatedJobs() {
    const {auth, user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const {fetchJobs} = useJobs();

    const {data: jobs, loading, error, refetch} = getJobsByCompany();

    const {data: deleteData, loading: DeleteLoading, error: deleteError, deleteRequest} = deleteJob(jobToDelete);

    const handleOpenModal = (jobId) => {
        setJobToDelete(jobId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setJobToDelete(null);
    };

    const handleDeleteJob = async () => {
        if (jobToDelete) {
            try {
                await deleteRequest(jobToDelete);
                toast.success("Job deleted successfully!");
                refetch();
                handleCloseModal();
            } catch (error) {
                toast.error("Failed to delete job. Please try again.");
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="job-items">
                    {jobs.map((job) => (
                        <div key={job.id} className="manage-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-7 col-md-7 col-12">
                                    <div className="title-img">
                                        <div className="can-img">{job.job_image === null ? <img src="/images/default/default.jpg" alt="#" /> : <img src={`${CLOUDINARY_URL}${job.job_image}`} alt="#" />}</div>
                                        <h3>
                                            {job.title}
                                            <span>{job.location}</span>
                                        </h3>
                                    </div>
                                </div>

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
                    <DeleteConfirmationModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleDeleteJob} message={"Are you sure you want to delete this job?"} />
                </div>
            )}
        </>
    );
}

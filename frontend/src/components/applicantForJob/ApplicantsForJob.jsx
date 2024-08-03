import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import ChangeStatusModal from "./ApplicantsForJobChangeStatus";
import {getApplicantsForJob} from "../../api/jobsApi";

export default function ApplicantsForJob() {
    // const [applicants, setApplicants] = useState([]);
    const {id} = useParams();
    // const {auth} = useAuth();
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [update, setUpdate] = useState(false);

    const statusClass = {
        Pending: "pending",
        Accepted: "apply",
        Rejected: "rejected",
    };

    const {data: applicants, loading, refetch, error} = getApplicantsForJob(id);

    useEffect(() => {
        refetch();
    }, [update]);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}jobs/${id}/applicants/`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setApplicants(data));
    // }, [update]);

    const handleStatusChanged = (updatedApplicant) => {
        setUpdate((oldState) => !oldState);
        setSelectedApplicant(null);
    };
    return (
        <div className="job-items">
            {applicants.map((applicant) => (
                <div key={applicant.id} className="manage-content">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-2 col-md-5 col-12">
                            <div className="title-img">
                                <div className="can-img">{applicant.job_seeker.profile_picture ? <img src={`https://res.cloudinary.com/drjgddl0y/${applicant.job_seeker.profile_picture}`} alt="#" /> : <img src="/images/clients/default_profile.png" alt="#" />}</div>
                                {/* <h3>{{ jobs.title }}<span>{{ jobs.category}}</span></h3> */}
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <p>
                                <span className={`time ${statusClass[applicant.status]}`}>{applicant.status}</span>
                            </p>
                        </div>

                        <div className="col-lg-2 col-md-2 col-12">
                            <button className="btn" onClick={() => setSelectedApplicant(applicant)}>
                                Change
                            </button>
                        </div>

                        <div className="col-lg-3 col-md-3 col-12">
                            <p className="location">
                                <i className="lni lni-user"></i>
                                {applicant.job_seeker.first_name} {applicant.job_seeker.last_name}
                            </p>
                        </div>

                        <div className="col-lg-2 col-md-2 col-12">
                            <div className="button">
                                <Link to={`/jobseekers/${applicant.user}`} className="btn">
                                    Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {selectedApplicant && <ChangeStatusModal isOpen={true} onClose={() => setSelectedApplicant(null)} applicant={selectedApplicant} onStatusChanged={handleStatusChanged} />}
        </div>
    );
}

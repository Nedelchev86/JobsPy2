import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";

export default function ApplicantsForJob() {
    const [applicants, setApplicants] = useState([]);
    const {id} = useParams();
    const {auth} = useAuth();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/jobs/${id}/applicants/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setApplicants(data));
    }, []);

    return (
        <div className="job-items">
            {applicants.map(
                (applicant) => (
                    console.log(applicant),
                    (
                        <div key={applicant.id} className="manage-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-2 col-md-5 col-12">
                                    <div className="title-img">
                                        <div className="can-img">
                                            <img src={`https://res.cloudinary.com/drjgddl0y/${applicant.job_seeker.profile_picture}`} alt="#" />
                                        </div>
                                        {/* <h3>{{ jobs.title }}<span>{{ jobs.category}}</span></h3> */}
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-2 col-12">
                                    <p>
                                        <span className="time ">{applicant.status}</span>
                                    </p>
                                </div>

                                <div className="col-lg-2 col-md-2 col-12">
                                    <a href="{% url 'change-status' obj.pk %}" className="btn">
                                        Change
                                    </a>
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
                    )
                )
            )}
        </div>
    );
}

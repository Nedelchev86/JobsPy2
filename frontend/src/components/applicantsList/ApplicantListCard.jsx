import {Link} from "react-router-dom";
import {CLOUDINARY_URL} from "../../config";

export default function ApplicantListCard({jobs}) {
    return (
        <div key={jobs.id} className="manage-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-5 col-md-5 col-12">
                    <div className="title-img">
                        <div className="can-img">{jobs.job_image === null ? <img src="/images/default/default.jpg" alt="#" /> : <img src={`${CLOUDINARY_URL}${jobs.job_image}`} alt="#" />}</div>
                        <h3>
                            {jobs.title}
                            <span>{jobs.category}</span>
                        </h3>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                    <p>
                        <span className="time">{jobs.job_type}</span>
                    </p>
                </div>
                <div className="col-lg-3 col-md-3 col-12">
                    <p className="location">
                        <i className="lni lni-map-marker"></i>
                        {jobs.location}
                    </p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                    <div>
                        <Link to={`/dashboard/applicants/jobs/${jobs.id}`}>
                            <span className="btn">
                                Applicants <span className="btn btn-primary">{jobs.num_applicants}</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

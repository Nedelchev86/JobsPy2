import {Link} from "react-router-dom";
import styles from "./CompanyDetails.module.css";
export default function CompanyOpenPositions({job}) {
    return (
        <div className="manage-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-4 col-md-4 col-12">
                    <h3>{job.title}</h3>
                </div>
                <div className="col-lg-2 col-md-4 col-12">
                    <p>
                        <span className="time">{job.location}</span>
                    </p>
                </div>
                <div className="col-lg-2 col-md-4 col-12">
                    <div className="col-lg-3 col-md-3 col-12">
                        <p>
                            <span className="time">{job.salary}</span>
                        </p>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-12">
                    <p>
                        <span className="time">{job.seniority}</span>
                    </p>
                </div>
                <div className="col-lg-2 col-md-4 col-12">
                    <p>
                        <Link className={styles["details-btn"]} to={`/jobs/${job.id}`}>
                            Details
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

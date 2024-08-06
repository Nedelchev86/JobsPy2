import {Link} from "react-router-dom";

export default function JobCard({job}) {
    return (
        <div className="single-job">
            <div className="job-image-list">{job.job_image === null ? <img src="/images/default/default.jpg" alt="#" /> : <img src={`https://res.cloudinary.com/drjgddl0y/${job.job_image}`} alt="#" />}</div>
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
    );
}

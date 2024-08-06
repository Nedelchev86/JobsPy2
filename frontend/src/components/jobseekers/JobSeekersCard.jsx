import {Link} from "react-router-dom";
import {Slide} from "react-awesome-reveal";
import styles from "./Jobseekers.module.css";
import {CLOUDINARY_URL} from "../../config";
export default function JobSeekersCard({jobseeker}) {
    return (
        <Slide direction="left" duration="1000" triggerOnce="true">
            <div className={`${styles["user-card"]} inner-content`}>
                <div className="resume-item">
                    {jobseeker.profile_picture === null ? <img src={"images/clients/default_profile.png"} alt="Candidate" /> : <img src={`${CLOUDINARY_URL}${jobseeker.profile_picture}`} alt="Candidate" />}
                    {/* {jobseeker.profile_picture && <img src={`${CLOUDINARY_URL}${jobseeker.profile_picture}`} alt="Candidate" />}
                {!jobseeker.profile_picture && <img src={"images/clients/default_profile.png"} alt="Candidate" />} */}

                    <div className="right">
                        <h3>
                            <Link to={`/jobseekers/${jobseeker.user}`}>
                                {jobseeker.first_name} {jobseeker.last_name}
                            </Link>
                        </h3>
                        <span className="deg">{jobseeker.occupation}</span>
                        <ul className="experience">
                            <li>
                                Seniority: <span>{jobseeker.seniority}</span>
                            </li>
                            <li>
                                GitHub:
                                <span>
                                    {jobseeker.github && (
                                        <Link target="_blank" to={jobseeker.github}>
                                            Link
                                        </Link>
                                    )}
                                </span>
                            </li>
                            <li>
                                <i className="lni lni-map-marker"></i>
                                {jobseeker.city}
                            </li>
                        </ul>
                        <ul className="skills">
                            {jobseeker.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Slide>
    );
}

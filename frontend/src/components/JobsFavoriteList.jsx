import {useAuth} from "../contexts/Contexts";
import Breadcrumbs from "./Breadcrumbs";
import JobSeekerMenu from "./JobseekerMenu";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

export default function JobsFavoriteList() {
    const [favrotites, setFavorites] = useState([]);
    const {user, auth} = useAuth();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/jobseeker/favorites/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFavorites(data))
            .catch((error) => console.error("Error fetching:", error));
    }, []);

    return (
        <div className="job-items">
            {favrotites.map((obj) => (
                <div key={obj.id} className="manage-content">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-5 col-md-5 col-12">
                            <div className="title-img">
                                <div className="can-img">
                                    <img src={`https://res.cloudinary.com/drjgddl0y/${obj.job_details.job_image}`} alt="#" />

                                    {/* <img src="{% static 'images/default/default.jpg' %}" alt="#"> */}
                                </div>
                                <h3>
                                    {obj.job.title}
                                    <span>{obj.job_details.category}</span>
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <p>
                                <span className="time">
                                    <i className="lni lni-coin"></i> {obj.job_details.salary}
                                </span>
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <p className="location">
                                <i className="lni lni-map-marker"></i>
                                {obj.job_details.location}
                            </p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                            <div className="button">
                                <Link to={`/jobs/${obj.job_details.id}`} className="btn">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
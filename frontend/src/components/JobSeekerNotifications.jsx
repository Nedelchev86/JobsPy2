import {useState, useEffect} from "react";
import {useAuth} from "../contexts/Contexts";
import {Link} from "react-router-dom";
import {formatDate} from "../utils/formatDate";

export default function JobSeekerNotifications() {
    const [notifications, setNotifications] = useState([]);
    const {auth, user} = useAuth();

    useEffect(() => {
        fetchNotifications();
    }, []);

    console.log(user);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}notificationjobseekers/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    return (
        <div className="col-lg-12 col-12">
            <div className="job-items">
                {notifications &&
                    notifications.length > 0 &&
                    notifications.map((notification) => (
                        <div key={notification.id} className="manage-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-2 col-md-2 col-12">
                                    <div className="title-img">
                                        <div className="can-img">{notification.job.job_image ? <img src={`https://res.cloudinary.com/drjgddl0y/${notification.job.job_image}`} alt="#" /> : <img src="/images/default/default.jpg" alt="#" />}</div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7 ">
                                    <p className="description">
                                        Your status for the
                                        <Link to="">{notification.job.title}</Link>
                                        &nbsp;has been changed to {notification.status}
                                    </p>
                                    <p>Feedback: {notification.comment}</p>
                                </div>

                                <div className="col-lg-2 col-md-3">
                                    <div className="time">
                                        <p style={{textAlign: "center"}}>{formatDate(notification.created_at)}</p>
                                    </div>
                                </div>

                                <div className="col-lg-1 col-md-2">
                                    <a href="{% url 'mark_as_read_job_seeker' notification.pk %}" className="btn btn-primary btn-sm">
                                        Read
                                    </a>
                                    {/* 
                                    <a href="{% url 'mark_as_read_job_seeker' notification.pk %}" className="btn btn-primary btn-sm">
                                        <i className="lni lni-checkmark"></i>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

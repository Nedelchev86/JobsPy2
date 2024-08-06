import React, {useState} from "react";
import {useAuth} from "../../contexts/authContexts";
import {useJobs} from "../../contexts/JobContext";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {toast} from "react-toastify";
import {CLOUDINARY_URL} from "../../config";

const NotificationComponent = ({notification}) => {
    const {fetchNotifications} = useJobs();
    const [isRead, setIsRead] = useState(notification.is_read);
    const {auth} = useAuth();

    const toggleReadStatus = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}notifications/${id}/toggle_read/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Successfully updated  status");
                setIsRead(!isRead); // Toggle the read status in the local state
                fetchNotifications();
            } else {
                toast.error("Failed to update read status");
                console.error("Failed to update read status");
            }
        } catch (error) {
            console.error("Error updating read status:", error);
        }
    };

    return (
        <div key={notification.id} className="manage-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-2 col-md-2 col-12">
                    <div className="title-img">
                        <div className="can-img">{notification.job_seeker.profile_picture ? <img src={`${CLOUDINARY_URL}${notification.job_seeker.profile_picture}`} alt="#" /> : <img src="/images/clients/default_profile.png" alt="#" />}</div>
                    </div>
                </div>
                <div className="col-lg-7 col-md-7 ">
                    <p className="description">
                        <Link to={`/jobseekers/${notification.job_seeker.pk}`}>{notification.job_seeker.first_name + " " + notification.job_seeker.last_name}</Link>
                        {notification.message} <Link to={`/jobs/${notification.job.pk}`}>{notification.job.title}</Link>
                    </p>
                </div>
                <div className="col-lg-2 col-md-3">
                    <div className="time">
                        <p style={{textAlign: "center"}}>{formatDate(notification.created_at)}</p>
                    </div>
                </div>
                <div className="col-lg-1 col-md-2">
                    {!isRead && (
                        <button onClick={() => toggleReadStatus(notification.id)} className="btn btn-primary btn=sm">
                            Read
                        </button>
                    )}

                    {isRead && (
                        <button onClick={() => toggleReadStatus(notification.id)} className="btn btn-primary btn-sm">
                            <i className="lni lni-checkmark"></i>
                        </button>
                        // <a href="{% url 'mark_as_read_company' notification.pk %}" className="btn btn-primary btn-sm">
                        //     <i className="lni lni-checkmark"></i>
                        // </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationComponent;

import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import NotificationJobSeekersComponent from "./NotificationsJobSeekersComponent";
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
            <div className="job-items">{notifications && notifications.length > 0 && notifications.map((notification) => <NotificationJobSeekersComponent key={notification.id} notification={notification} />)}</div>
        </div>
    );
}

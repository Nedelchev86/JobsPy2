import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import NotificationJobSeekersComponent from "./NotificationsJobSeekersComponent";
import Loading from "../loading/Loading";
import {API_URL} from "../../config";
export default function JobSeekerNotifications() {
    const [notifications, setNotifications] = useState([]);
    const {auth, user} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}notificationjobseekers/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    return <div className="col-lg-12 col-12">{loading ? <Loading /> : <div className="job-items">{notifications && notifications.length > 0 && notifications.map((notification) => <NotificationJobSeekersComponent key={notification.id} notification={notification} />)}</div>}</div>;
}

import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import NotificationComponent from "./NotificationCompanyComponent";
import {API_URL} from "../../config";
import Loading from "../loading/Loading";

export default function CompanyNotifications() {
    const [notifications, setNotifications] = useState([]);
    const {auth} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${API_URL}notifications/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });
            setLoading(false);
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="col-lg-12 col-12">
                    <div className="job-items">{notifications && notifications.length > 0 && notifications.map((notification) => <NotificationComponent key={notification.id} notification={notification} />)}</div>
                </div>
            )}
        </>
    );
}

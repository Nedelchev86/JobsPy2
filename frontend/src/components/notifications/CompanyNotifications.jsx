import {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import NotificationComponent from "./NotificationCompanyComponent";

export default function CompanyNotifications() {
    const [notifications, setNotifications] = useState([]);
    const {auth} = useAuth();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}notifications/`, {
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
            <div className="job-items">{notifications && notifications.length > 0 && notifications.map((notification) => <NotificationComponent key={notification.id} notification={notification} />)}</div>
        </div>
    );
}

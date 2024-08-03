import {useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import JobSeekerNotifications from "./JobSeekerNotifications";
import CompanyNotifications from "./CompanyNotifications";

export default function Notifications() {
    const {user, isAuthenticated, fetchUserData} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !user) {
            // Fetch user data if authenticated but user data is not loaded
            fetchUserData();
        }
    }, [isAuthenticated, user, fetchUserData]);

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return <div>{user.user_type === "company" ? <CompanyNotifications /> : <JobSeekerNotifications />}</div>;
}

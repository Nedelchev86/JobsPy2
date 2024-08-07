import React, {createContext, useState, useContext, useEffect} from "react";
import {useAuth} from "./authContexts";
import {API_URL} from "../config";

const JobContext = createContext();

export const JobProvider = ({children}) => {
    const [jobs, setJobs] = useState(0);

    const [applicants, setApplicants] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const {isAuthenticated, auth, user} = useAuth();

    const fetchNotifications = async () => {
        if (!auth) {
            return;
        }

        if (!user) {
            return;
        }
        if (user.user_type === "company") {
            try {
                const response = await fetch(`${API_URL}notifications/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                });
                const data = await response.json();
                setNotifications(data.filter((notification) => notification.is_read === false));
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        }
        if (user.user_type === "jobseeker") {
            try {
                const response = await fetch(`${API_URL}notificationjobseekers/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                });
                const data = await response.json();
                setNotifications(data.filter((notification) => notification.is_read === false));
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        }
    };

    const fetchJobs = async () => {
        if (!auth) {
            return;
        }
        try {
            const response = await fetch(`${API_URL}company/created-jobs/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });
            const data = await response.json();
            setJobs(data.length); // Set the jobs state to the length of the fetched data
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        }
    };

    const fetchApplicants = () => {
        if (!auth) {
            return;
        }

        fetch(`${API_URL}company/applicants/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setApplicants(data);
            });
    };

    useEffect(() => {
        if (auth) {
            fetchApplicants();
            fetchJobs();
            fetchNotifications();
        }
    }, [user, auth]);

    return <JobContext.Provider value={{jobs, fetchJobs, fetchApplicants, applicants, notifications, fetchNotifications}}>{children}</JobContext.Provider>;
};

export const useJobs = () => useContext(JobContext);

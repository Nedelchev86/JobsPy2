import React, {createContext, useState, useContext, useEffect} from "react";
import {useAuth} from "./authContexts";

const JobContext = createContext();

export const JobProvider = ({children}) => {
    const [jobs, setJobs] = useState(0);

    const [applicants, setApplicants] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const {isAuthenticated, auth, user} = useAuth();

    const fetchNotifications = async () => {
        if (!auth) {
            console.log("fetch return");
            return;
        }

        if (!user) {
            console.log("fetch return");
            return;
        }
        if (user.user_type === "company") {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}notifications/`, {
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}notificationjobseekers/`, {
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

    // const fetchJobs = () => {
    //     console.log("fetch job" + auth);
    //     if (!auth) {
    //         return;
    //     }
    //     fetch("http://127.0.0.1:8000/api/created-jobs/", {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => data.length);
    // };

    const fetchJobs = async () => {
        if (!auth) {
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}company/created-jobs/`, {
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

        fetch(`${import.meta.env.VITE_API_URL}company/applicants/`, {
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

    // useEffect(() => {
    //     fetchApplicants();
    // }, [user]);

    // useEffect(() => {
    //     fetchJobs();
    // }, [user]);

    // useEffect(() => {
    //     fetchNotifications();
    // }, [user]);

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

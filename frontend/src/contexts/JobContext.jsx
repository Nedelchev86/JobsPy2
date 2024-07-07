import React, {createContext, useState, useContext, useEffect} from "react";
import {useAuth} from "./Contexts";

const JobContext = createContext();

export const JobProvider = ({children}) => {
    const [jobs, setJobs] = useState([]);

    const [applicants, setApplicants] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const {isAuthenticated, auth} = useAuth();
    const fetchNotifications = async () => {
        console.log(isAuthenticated);
        if (!auth) {
            console.log("fetch return");
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/notifications/", {
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
    };

    const fetchJobs = () => {
        console.log("fetch job" + auth);
        if (!auth) {
            return;
        }
        fetch("http://127.0.0.1:8000/api/created-jobs/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setJobs(data.length));
    };

    const fetchApplicants = () => {
        if (!auth) {
            return;
        }

        fetch("http://127.0.0.1:8000/api/company/applicants/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setApplicants(data);
            });
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        fetchNotifications();
        console.log("effect");
    }, [auth]);

    useEffect(() => {
        console.log("JobProvider useEffect triggered by auth change:", auth);
        if (auth) {
            fetchApplicants();
            fetchJobs();
            fetchNotifications();
        }
    }, [auth]);

    return <JobContext.Provider value={{jobs, fetchJobs, fetchApplicants, applicants, notifications, fetchNotifications}}>{children}</JobContext.Provider>;
};

export const useJobs = () => useContext(JobContext);

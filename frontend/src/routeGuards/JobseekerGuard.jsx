// components/RequireAuth.js
import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/authContexts";
import {useEffect} from "react";
import {useState} from "react";

const JobseekerGuard = ({children}) => {
    const {user, isAuthenticated, auth, fetchUserData} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth) {
            fetchUserData().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [auth]);

    // Show a loading indicator or placeholder while user data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    if (user?.user_type !== "jobseeker") {
        return <Navigate to="/403" replace />;
    }

    return children;
};

export default JobseekerGuard;

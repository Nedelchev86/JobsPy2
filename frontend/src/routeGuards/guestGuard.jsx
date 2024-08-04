import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/authContexts";

const GuestGuard = ({children}) => {
    const {auth} = useAuth();

    if (auth) {
        return <Navigate to="/" />;
    }

    return children;
};

export default GuestGuard;

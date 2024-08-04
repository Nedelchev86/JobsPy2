// components/RequireAuth.js
import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/authContexts";

const GuestsGuard = ({children}) => {
    const {auth} = useAuth();

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestsGuard;

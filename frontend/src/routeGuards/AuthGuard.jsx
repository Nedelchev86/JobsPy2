import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/authContexts";

const AuthGuard = ({children}) => {
    console.log("test");
    const {auth} = useAuth();

    if (!auth) {
        return <Navigate to="/403" replace />;
    }
    return children;
};
export default AuthGuard;

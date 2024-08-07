import React from "react";
import {useAuth} from "../../contexts/authContexts";
import EditJobseeker from "./EditJobseeker";
import EditCompany from "./EditCompany";

export default function EditProfile() {
    const {user} = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return <div>{user.user_type === "company" ? <EditCompany /> : <EditJobseeker />}</div>;
}

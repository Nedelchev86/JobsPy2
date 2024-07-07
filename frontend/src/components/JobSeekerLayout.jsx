import React from "react";
import {Outlet} from "react-router-dom";
import JobSeekerMenu from "./JobseekerMenu";
import Breadcrumbs from "./Breadcrumbs";
import {useAuth} from "../contexts/Contexts";
import CompanyMenu from "./CompanyMenu";

const JobSeekerLayout = () => {
    const {user} = useAuth();

    return (
        <>
            <Breadcrumbs
                pageTitle="Profile Dashboard"
                pageInfo="Editing and updating a profile profile allows you to keep information current and accurate,
                while also allowing companies to find you."
            />
            <div className="bookmarked section">
                <div className="container">
                    <div className="alerts-inner">
                        <div className="row">
                            {user && user.user_type === "jobseeker" && <JobSeekerMenu />}
                            {user && user.user_type === "company" && <CompanyMenu />}
                            <div className="col-lg-8 col-12">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobSeekerLayout;

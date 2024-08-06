import React from "react";
import {Link, Outlet} from "react-router-dom";
import JobSeekerMenu from "./JobseekerMenu";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useAuth} from "../../contexts/authContexts";
import CompanyMenu from "./CompanyMenu";
import styles from "./MenuLayout.module.css";

const MenuLayout = () => {
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
                    {user?.user_type === "company" && !user.user.activated && (
                        <div className={styles["alert-users"]} role="alert">
                            Please{" "}
                            <Link to="/dashboard/edit" className="alert-link">
                                {" "}
                                complete your profile
                            </Link>{" "}
                            to get access to create and edit job offers .
                        </div>
                    )}

                    {user?.user_type === "jobseeker" && !user.user.activated && (
                        <div className={styles["alert-users"]} role="alert">
                            Please{" "}
                            <Link to="/dashboard/edit" className="alert-link">
                                {" "}
                                complete your profile
                            </Link>{" "}
                            to get access to apply for job.
                        </div>
                    )}
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

export default MenuLayout;

import {Breadcrumb} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import {useState, useEffect} from "react";
import {useJobs} from "../contexts/JobContext";

export default function CompanyMenu() {
    const {user, auth} = useAuth();
    const {fetchJobs, fetchApplicants, jobs, applicants, notifications, fetchNotifications} = useJobs();

    useEffect(() => {
        console.log(auth);
        fetchApplicants();
    }, []);

    useEffect(() => {
        console.log(auth);
        fetchJobs();
    }, []);

    useEffect(() => {
        console.log(auth);
        fetchNotifications();
    }, []);

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/NavLinkpi/user/jobseeker/favorites/", {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setFavorites(data))
    //         .catch((error) => console.error("Error fetching:", error));
    // }, []);

    return (
        <div className="col-lg-4 col-12">
            <div className="dashbord-sidebar">
                <ul>
                    <li className="heading">Manage Account</li>

                    <li>
                        <NavLink activeclassname="active" to={"/dashboard"}>
                            <i className="lni lni-bookmark"></i> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"edit"}>
                            <i className="lni lni-bookmark"></i> Edit Company
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"create-job"}>
                            <i className="lni lni-clipboard"></i> Create Job
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"created-jobs"}>
                            <i className="lni lni-alarm"></i>Created Jobs <span className="notifi">{jobs}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"applicants"}>
                            <i className="lni lni-alarm"></i>Applicants <span className="notifi">{applicants.length}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"notifications"}>
                            <i className="lni lni-alarm"></i> Notifications <span className="notifi">{notifications.length}</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink activeclassname="active" to={"change-password"}>
                            <i className="lni lni-lock"></i> Change Password
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" style={{color: "red"}} to={"delete-accout"}>
                            <i className="lni lni-bookmark"></i> Delete Company{" "}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to={"logout"}>
                            <i className="lni lni-upload"></i> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

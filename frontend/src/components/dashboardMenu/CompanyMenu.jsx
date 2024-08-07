import {Breadcrumb} from "react-bootstrap";
import {Link, Navigate, NavLink} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import {useState, useEffect} from "react";
import {useJobs} from "../../contexts/JobContext";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmationModal";
import {useNavigate} from "react-router-dom";
import styles from "./CompanyMenu.module.css";
import {toast} from "react-toastify";
import {API_URL} from "../../config";

export default function CompanyMenu() {
    const navigate = useNavigate();
    const {user, auth, logout} = useAuth();

    const {fetchJobs, fetchApplicants, jobs, applicants, notifications, fetchNotifications} = useJobs();

    const [showModal, setShowModal] = useState(false);
    const [profileId, setProfileId] = useState(null);
    const [authToken, setAuthToken] = useState("");

    const handleShowModal = (id) => {
        setProfileId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${API_URL}company/${user.user.user}/delete/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (response.ok) {
                logout();
                navigate("/");
            } else {
                alert("Failed to delete profile.");
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("An error occurred while deleting the profile.");
        } finally {
            handleCloseModal();
        }
    };

    useEffect(() => {
        fetchApplicants();
        fetchJobs();
        fetchNotifications();
    }, [user]);

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
                        {user.user.activated ? (
                            <NavLink activeclassname="active" to={"create-job"}>
                                <i className="lni lni-clipboard"></i> Create Job
                            </NavLink>
                        ) : (
                            <span onClick={() => toast.warning("Please complete your profile")} className={styles["disabled-span"]}>
                                <i className={`${styles.icon} lni-clipboard`}></i>Create Job
                            </span>
                        )}
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
                        <Link style={{color: "red"}} onClick={() => handleShowModal(profileId)}>
                            <i className="lni lni-bookmark"></i> Delete Company
                        </Link>
                    </li>
                    <li>
                        <NavLink to={"/"} activeclassname="active" onClick={logout}>
                            <i className="lni lni-upload"></i> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
            <DeleteConfirmationModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmDelete} message="Are you sure you want to delete your company profile?" />
        </div>
    );
}

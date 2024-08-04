import {Breadcrumb} from "react-bootstrap";
import {Link, Navigate, NavLink} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import {useState, useEffect} from "react";
import {useJobs} from "../../contexts/JobContext";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmationModal";
import {useNavigate} from "react-router-dom";

export default function CompanyMenu() {
    const navigate = useNavigate();
    const {user, auth, logout} = useAuth();

    const {fetchJobs, fetchApplicants, jobs, applicants, notifications, fetchNotifications} = useJobs();

    const [showModal, setShowModal] = useState(false);
    const [profileId, setProfileId] = useState(null); // Assume you have a way to set this
    const [authToken, setAuthToken] = useState(""); // Replace with actual authentication token logic

    const handleShowModal = (id) => {
        setProfileId(id);
        setShowModal(true);
    };
    console.log(user);
    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to handle the confirmation of the delete action
    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/company/${user.user.user}/delete/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`, // Include token if needed
                },
            });

            if (response.ok) {
                logout();
                navigate("/");
                // Handle successful deletion (e.g., refresh the list or redirect)
            } else {
                alert("Failed to delete profile.");
                // Handle error case
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("An error occurred while deleting the profile.");
        } finally {
            handleCloseModal(); // Close the modal regardless of the outcome
        }
    };

    useEffect(() => {
        fetchApplicants();
        fetchJobs(); // Fetch jobs when the component mounts
        fetchNotifications();
    }, [user]);
    // useEffect(() => {
    //     const num = fetchApplicants();
    //     console.log(num);
    //     // setJobs = num;
    // }, []);

    // useEffect(() => {
    //     fetchJobs();
    // }, []);

    // useEffect(() => {
    //     fetchNotifications();
    // }, []);

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

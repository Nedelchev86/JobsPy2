import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import {useState, useEffect} from "react";
import {useJobs} from "../../contexts/JobContext";
import {getApplyedJobs, getFavoritesJobs} from "../../api/JobSeekerApi";
import DeleteConfirmationModal from "../deleteModal/DeleteConfirmationModal";
import {API_URL} from "../../config";

export default function JobSeekerMenu() {
    // const [favrotites, setFavorites] = useState([]);
    // const [applyed, setApplyed] = useState([]);
    const {user, auth} = useAuth();
    const {notifications} = useJobs();

    const {logout} = useAuth();

    const {data: favotites, loading, error} = getFavoritesJobs();
    const {data: applyed, loading: applyedLoading, applyedError} = getApplyedJobs();

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
            const response = await fetch(`${API_URL}prifile/delete/`, {
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
                // Handle error case
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
        } finally {
            handleCloseModal(); // Close the modal regardless of the outcome
        }
    };

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}user/jobseeker/favorites/`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setFavorites(data))
    //         .catch((error) => console.error("Error fetching:", error));
    // }, []);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}jobseekers/applyed/jobs/`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setApplyed(data))
    //         .catch((error) => console.error("Error fetching:", error));
    // }, []);

    return (
        <div className="col-lg-4 col-12">
            <div className="dashbord-sidebar">
                <ul>
                    <li className="heading">Manage Account</li>
                    <li>
                        <NavLink to="/dashboard">
                            <i className="lni lni-clipboard"></i> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" to="edit">
                            <i className="lni lni-clipboard"></i> Edit Profile{" "}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" to="bookmarked">
                            <i className="lni lni-clipboard"></i> Bookmarked Jobs <span className="notifi">{favotites.length}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" to="applyed-jobs">
                            <i className="lni lni-alarm"></i>Job Applications <span className="notifi">{applyed.length}</span>
                        </NavLink>
                    </li>

                    {/* {% if 'main.add_newsletter' in perms %}
                <li><NavLink className="{% if request.resolver_match.url_name == 'newsletter' %}active{% endif %}" to="{% url 'newsletter' %}"><i className="lni lni-alarm"></i>Send Newsletter </NavLink></li>
               {% endif %} */}
                    <li>
                        <NavLink activeclassname="active" to={"notifications"}>
                            <i className="lni lni-alarm"></i> Notifications <span className="notifi">{notifications.length}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" to="change-password">
                            <i className="lni lni-lock"></i> Change Password
                        </NavLink>
                    </li>
                    <li>
                        <Link onClick={handleShowModal} className="" style={{color: "red"}} to="#">
                            <i className="lni lni-lock"></i> Delete Profile
                        </Link>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to="/" onClick={logout}>
                            <i className="lni lni-upload"></i> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
            <DeleteConfirmationModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirmDelete} message="Are you sure you want to delete your profile?" />
        </div>
    );
}

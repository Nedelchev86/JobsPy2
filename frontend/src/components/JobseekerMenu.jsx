import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import {useState, useEffect} from "react";
import {useJobs} from "../contexts/JobContext";

export default function JobSeekerMenu() {
    const [favrotites, setFavorites] = useState([]);
    const [applyed, setApplyed] = useState([]);
    const {user, auth} = useAuth();
    const {notifications} = useJobs();

    const {logout} = useAuth();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}user/jobseeker/favorites/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFavorites(data))
            .catch((error) => console.error("Error fetching:", error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}job_seekers/apply_jobs/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setApplyed(data))
            .catch((error) => console.error("Error fetching:", error));
    }, []);

    return (
        <div className="col-lg-4 col-12">
            <div className="dashbord-sidebar">
                <ul>
                    <li className="heading">Manage Account</li>
                    <li>
                        <NavLink activeclassname="active" className="" to="/dashboard">
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
                            <i className="lni lni-clipboard"></i> Bookmarked Jobs <span className="notifi">{favrotites.length}</span>
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
                        <NavLink activeclassname="active" className="" style={{color: "red"}} to="{% url 'delete_profile' %}">
                            <i className="lni lni-lock"></i> Delete Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to="/" onClick={logout}>
                            <i className="lni lni-upload"></i> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

import {Breadcrumb} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import {useState, useEffect} from "react";

export default function JobSeekerMenu() {
    const [favrotites, setFavorites] = useState([]);
    const {user, auth} = useAuth();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/jobseeker/favorites/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setFavorites(data))
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
                        <NavLink activeclassname="active" className="" to="{% url 'jobs-apply' %}">
                            <i className="lni lni-alarm"></i>Job Applications <span className="notifi"></span>
                        </NavLink>
                    </li>

                    {/* {% if 'main.add_newsletter' in perms %}
                <li><NavLink className="{% if request.resolver_match.url_name == 'newsletter' %}active{% endif %}" to="{% url 'newsletter' %}"><i className="lni lni-alarm"></i>Send Newsletter </NavLink></li>
               {% endif %} */}
                    <li>
                        <NavLink activeclassname="active" to="/">
                            <i className="lni lni-alarm"></i> Notifications <span className="notifi"></span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" to="{% url 'change-password' %}">
                            <i className="lni lni-lock"></i> Change Password
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" className="" style={{color: "red"}} to="{% url 'delete_profile' %}">
                            <i className="lni lni-lock"></i> Delete Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname="active" to="/">
                            <i className="lni lni-upload"></i> Sign Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
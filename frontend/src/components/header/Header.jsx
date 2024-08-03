import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import LoginModal from "../loginModal/LoginModal";
import {Link, NavLink} from "react-router-dom";
import {useJobs} from "../../contexts/JobContext";
import styles from "./Header.module.css";

import {ToastContainer, toast} from "react-toastify";

const Header = () => {
    const {user, auth, isAuthenticated, login, logout} = useAuth();
    const {notifications, fetchNotifications} = useJobs();

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <header className="header style4">
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
            <div className="navbar-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <Link className="navbar-brand logo" to="/">
                                    <img className="logo1" src="/images/logo/logo.jpg" alt="Logo" />
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul id="nav" className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <NavLink to="/" activeclassname="active" className="nav-link">
                                                Home
                                            </NavLink>
                                        </li>

                                        <li className="nav-item ">
                                            <NavLink to="/jobs" activeclassname="active" className="nav-Navlink">
                                                Jobs
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/companies" activeclassname="active" className="nav-Navlink">
                                                Companies
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/jobseekers" activeclassname="active" className="nav-Navlink">
                                                Jobseekers
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/blogs" activeclassname="active" className="nav-Navlink">
                                                Blog
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="contact-us" activeclassname="active" className="nav-Navlink">
                                                Contact
                                            </NavLink>
                                        </li>
                                        {isAuthenticated && (
                                            <li className="nav-item">
                                                <NavLink to="/dashboard" activeclassname="active">
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {!isAuthenticated && (
                                    <div className="button">
                                        <NavLink onClick={handleOpenModal} className="login">
                                            <i className="lni lni-lock-alt"></i>
                                            Login
                                        </NavLink>
                                        <NavLink to="/signup" className="btn">
                                            Sign Up
                                        </NavLink>
                                    </div>
                                )}

                                {isAuthenticated && user && user.user_type === "company" && user.user.image && (
                                    <div className="button">
                                        <div className="user-profile-container">
                                            <NavLink to="dashboard">
                                                <img className={styles["user-profile-small"]} src={`https://res.cloudinary.com/drjgddl0y/${user.user.image}`} alt="Logo" /> <span className="notification-badge"> {notifications.length} </span>
                                            </NavLink>
                                        </div>

                                        <button onClick={logout} className="btn">
                                            Logout
                                        </button>
                                    </div>
                                )}

                                {isAuthenticated && user && user.user_type === "jobseeker" && user.user.profile_picture && (
                                    <div className="button">
                                        <div className="user-profile-container">
                                            <NavLink to="dashboard">
                                                <img className={styles["user-profile-small"]} src={`https://res.cloudinary.com/drjgddl0y/${user.user.profile_picture}`} alt="Logo" /> <span className="notification-badge"> {notifications.length} </span>
                                            </NavLink>
                                        </div>
                                        <button onClick={logout} className="btn">
                                            Logout
                                        </button>
                                    </div>
                                )}

                                {isAuthenticated && user && !user.user.profile_picture && !user.user.image && (
                                    <>
                                        <div
                                            className={`text-center align-center ${styles["no-image"]}`}
                                            style={{
                                                alignItems: "right !important",
                                                justifyContent: "center !important",
                                                backgroundColor: "black",
                                                width: 50,
                                                height: 50,
                                                borderRadius: 50,
                                                marginRight: 10,
                                                marginLeft: 20,
                                            }}
                                        >
                                            <div className="user-profile-container">
                                                {user && (
                                                    <a href="#" className={styles["user-profile-small"]} style={{paddingTop: "10%", color: "white", fontSize: 25}}>
                                                        {user.email.split("")[0]}
                                                        <span className="notification-badge">0</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <div className="button">
                                            <button onClick={logout} className="btn">
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal show={showModal} handleClose={handleCloseModal} />
        </header>
    );
};

export default Header;

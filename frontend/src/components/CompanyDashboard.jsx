import React, {useEffect} from "react";
import {useAuth} from "../contexts/Contexts";
import {useNavigate, Link} from "react-router-dom";
import {useJobs} from "../contexts/JobContext";

const CompanyDashboard = () => {
    const {user, isAuthenticated, fetchUserData} = useAuth();
    const {applicants, jobs} = useJobs();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            fetchUserData();
            console.log("test");
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="cat-head job-category">
            <div className="row">
                <div className="col-md-6 col-12">
                    <a href="#" className="single-cat wow fadeInUp">
                        <div className="icon">
                            <i>0</i>
                        </div>
                        <h3>
                            All Jobs
                            <br /> Added To Favourite
                        </h3>
                    </a>
                </div>

                <div className="col-md-6 col-12">
                    <Link to="applicants" className="single-cat wow fadeInUp">
                        <div className="icon">{<i>{applicants.length}</i>}</div>
                        <h3>
                            All Jobs <br /> Candidates
                        </h3>
                    </Link>
                </div>
            </div>
            <div className="resume ">
                <div className="container">
                    <div className="resume-inner">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="inner-content">
                                    <div className="personal-top-content">
                                        <div className="row">
                                            <div className="col-lg-5 col-md-5 col-12">
                                                <div className="name-head">
                                                    <a className="mb-2" href="#">
                                                        <img className="circle-54" src={`https://res.cloudinary.com/drjgddl0y/${user.user.image}`} alt="" />
                                                    </a>

                                                    <ul className="social">
                                                        <li>
                                                            <a href={user.user.facebook_url}>
                                                                <i className="lni lni-facebook-original"></i>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a target="_blank" href={user.user.linkedin_url}>
                                                                <i className="lni lni-linkedin-original"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-md-7 col-12">
                                                <div className="content-right">
                                                    <h5 className="title-main">Contact Info</h5>
                                                    <div className="single-list">
                                                        <h5 className="title">Location</h5>
                                                        <p>{user.user.location}</p>
                                                    </div>
                                                    <div className="single-list">
                                                        <h5 className="title">E-mail</h5>
                                                        <p>{user.user.email}</p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">Phone</h5>
                                                        <p>{user.user.phone}</p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">Address</h5>
                                                        <p>{user.user.address}</p>
                                                    </div>
                                                    <div className="single-list">
                                                        <h5 className="title">Employees</h5>
                                                        <p>{user.user.employees}</p>
                                                    </div>
                                                    <div className="single-list">
                                                        <h5 className="title">Foundation Year</h5>
                                                        <p>{user.user.foundation_year}</p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">Website</h5>

                                                        <p>
                                                            <a target="_blank" href={user.user.website_url}>
                                                                Link
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-section">
                                        <h4>About</h4>
                                        <p className="font-size-4 mb-8">{user.user.description}</p>
                                    </div>

                                    <div className="single-section skill">
                                        <h4>Technologies</h4>
                                        <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                            {user.user.skills.map((skill) => (
                                                <li key={skill}>
                                                    <Link to="#">{skill}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;

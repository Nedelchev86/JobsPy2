import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="f-about single-footer">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="/images/logo/logo.jpg" alt="Logo" />
                                    </Link>
                                </div>
                                <p>#1 project in SoftUni React - August 2024</p>
                                <ul className="contact-address">
                                    <li>
                                        <span>Address:</span> 8000 Burgas , Bulgaria{" "}
                                    </li>
                                    <li>
                                        <span>Email:</span> t******.n******@gmail.com
                                    </li>
                                    <li>
                                        <span>Call:</span> 0899-899-899
                                    </li>
                                </ul>
                                <div className="footer-social">
                                    <ul>
                                        <li>
                                            <Link to="https://bg-bg.facebook.com/tihomir.nedelchev" target="_blank">
                                                <i className="lni lni-facebook-original"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#">
                                                <i className="lni lni-twitter-original"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="https://www.linkedin.com/in/tihomir-nedelchev/" target="_blank">
                                                <i className="lni lni-linkedin-original"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="https://github.com/Nedelchev86" target="_blank">
                                                <i className="lni lni-github-original"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="single-footer f-link">
                                        <h3>For Job Seekers</h3>
                                        <ul>
                                            <li>
                                                <Link to="/companies">Companies</Link>
                                            </li>
                                            <li>
                                                <Link to="/jobs">Jobs</Link>
                                            </li>
                                            <li>
                                                <Link to="/blogs">Blog</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="single-footer f-link">
                                        <h3>For Companies</h3>
                                        <ul>
                                            <li>
                                                <Link to="/jobseekers">Job Seekers List</Link>
                                            </li>
                                            <li>
                                                <Link to="/blogs">Blog</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="single-footer newsletter">
                                        <h3>Join Our Newsletter</h3>
                                        <p>Subscribe to get the latest news</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="left">
                                    <p>
                                        React Project by
                                        <Link to="#" rel="nofollow">
                                            Tihomir Nedelchev
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-10">
                                <div className="right">
                                    <ul>
                                        <li>
                                            <Link to="#">Terms of use</Link>
                                        </li>
                                        <li>
                                            <Link to="#"> Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link to="#">Faq</Link>
                                        </li>
                                        <li>
                                            <Link to="contact-us">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

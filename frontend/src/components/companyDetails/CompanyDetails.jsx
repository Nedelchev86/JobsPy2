import {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useParams} from "react-router-dom";
import LastFiveBlogs from "../lastFiveBlogs/LastFiveBlogs";
import Loading from "../loading/Loading";
import {Link} from "react-router-dom";
import GoogleMapComponent from "../googleMap/GoogleMapComponent";
import styles from "./CompanyDetails.module.css";
import {getCompanyById} from "../../api/companyApi";
import {CLOUDINARY_URL} from "../../config";
import CompanyOpenPositions from "./CompanyOpenPositions";

export default function CompanyDetails() {
    const {id} = useParams();
    const defaultLocation = "Burgas";
    const defaultAddress = "Bul. San Stefano";

    const {data: company, error, loading, refetch} = getCompanyById(id);

    return (
        <>
            <Breadcrumbs pageTitle="Companies" pageInfo="Take a look at the top IT companies ..." />
            <section className="section blog-single">
                <div className="container">
                    <div className="row">
                        <div className="resume ">
                            <div className="container">
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <div className="resume-inner">
                                        <div className="row">
                                            <div className="col-lg-8 col-12">
                                                <div className="inner-content">
                                                    <div className="personal-top-content">
                                                        <div className="row">
                                                            <div className="col-lg-5 col-md-5 col-12">
                                                                <div className="name-head">
                                                                    <Link className="mb-2" to="#">
                                                                        {company.image ? <img className="circle-54" src={`${CLOUDINARY_URL}${company.image}`} alt="" /> : <img className="circle-54" src="/images/default/company.jpg" alt="" />}
                                                                    </Link>

                                                                    <h4>
                                                                        <Link className="name" to="#">
                                                                            {company.name}
                                                                        </Link>
                                                                    </h4>

                                                                    <ul className="social">
                                                                        {company.facebook_url && (
                                                                            <li>
                                                                                <Link to={company.facebook_url}>
                                                                                    <i className="lni lni-facebook-original"> </i>
                                                                                </Link>
                                                                            </li>
                                                                        )}
                                                                        {company.linkedin_url && (
                                                                            <li>
                                                                                <Link target="_blank" to={company?.linkedin_url}>
                                                                                    <i className="lni lni-linkedin-original"></i>
                                                                                </Link>
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7 col-md-7 col-12">
                                                                <div className="content-right">
                                                                    <h5 className="title-main">Contact Info</h5>
                                                                    <div className="single-list">
                                                                        <h5 className="title">Location</h5>
                                                                        <p>{company.location}</p>
                                                                    </div>
                                                                    <div className="single-list">
                                                                        <h5 className="title">E-mail</h5>
                                                                        <p>{company.email}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Phone</h5>
                                                                        <p>{company.phone}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Address</h5>
                                                                        <p>{company.address}</p>
                                                                    </div>
                                                                    <div className="single-list">
                                                                        <h5 className="title">Employees</h5>
                                                                        <p>{company.employees}</p>
                                                                    </div>
                                                                    <div className="single-list">
                                                                        <h5 className="title">Foundation Year</h5>
                                                                        <p>{company.foundation_year}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Website Linked</h5>
                                                                        <p>
                                                                            {company.website_url && (
                                                                                <Link target="_blank" to={company?.website_url}>
                                                                                    Link
                                                                                </Link>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="single-section">
                                                        <h4>About</h4>
                                                        <p className="font-size-4 mb-8">{company.description}</p>
                                                    </div>

                                                    <div className="single-section skill">
                                                        <h4>Technologies</h4>
                                                        <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                                            {company &&
                                                                company?.skills &&
                                                                company?.skills.map((tech) => (
                                                                    <li key={tech}>
                                                                        <Link to="#">{tech}</Link>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 col-12">
                                                    <div className="manage-jobs">
                                                        <div className=" job-items">
                                                            <h4>Open positions </h4>
                                                            <div className="manage-list">
                                                                <div className="row">
                                                                    <div className="col-lg-4 col-md-4 col-12">
                                                                        <p>Title</p>
                                                                    </div>
                                                                    <div className="col-lg-2 col-md-4 col-12">
                                                                        <p>Location</p>
                                                                    </div>
                                                                    <div className="col-lg-2 col-md-4 col-12">
                                                                        <p>Salary</p>
                                                                    </div>
                                                                    <div className="col-lg-2 col-md-4 col-12">
                                                                        <p>Experience</p>
                                                                    </div>
                                                                    <div className="col-lg-2 col-md-4 col-12">
                                                                        <p>Details</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {company?.jobs?.map((job) => (
                                                                <CompanyOpenPositions key={job.id} job={job} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <aside className="col-lg-4 col-md-12 col-12">
                                                <div className="sidebar">
                                                    <div className="sidebar-widget">
                                                        <div className="inner">
                                                            <div className="row m-n2 button">
                                                                <div className=" col-lg-12  "></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget popular-feeds">
                                                        <div className="inner">
                                                            <h6 className={styles.title}>Job Location</h6>
                                                            <div className="mapouter">
                                                                <div className="gmap_canvas">
                                                                    <GoogleMapComponent city={company?.location} address={company?.address} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <LastFiveBlogs />
                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

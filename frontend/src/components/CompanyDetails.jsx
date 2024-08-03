import {useState, useEffect} from "react";
import Breadcrumbs from "./Breadcrumbs";
import {useParams} from "react-router-dom";
import LastFiveBlogs from "./LastFiveBlogs";
import Loading from "./loading/Loading";
import {Link} from "react-router-dom";
import GoogleMapComponent from "./GoogleMapComponent";
import styles from "./CompanyDetails.module.css";
import {getCompanyById} from "../api/companyApi";

export default function CompanyDetails() {
    // const [company, setCompany] = useState();
    const {id} = useParams();
    const defaultLocation = "Burgas";
    const defaultAddress = "Bul. San Stefano";

    const {data: company, error, loading, refetch} = getCompanyById(id);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}companies/${id}/`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCompany(data);
    //         })
    //         .catch((error) => console.error("Error fetching jobseeker:", error));
    // }, [id]);

    // if (!company) {
    //     // Render loading state or redirect to login page
    //     console.log("loading");
    //     return <div>Loading...</div>;
    // }

    // if (!company) {
    //     return (
    //         <>
    //             <Breadcrumbs pageTitle="Companies" pageInfo="Take a look at the top IT companies ..." />
    //             <section className="section blog-single">
    //                 <div className="container">
    //                     <div className="row">
    //                         <div className="resume ">
    //                             <div className="container">
    //                                 <div className="resume-inner">
    //                                     <Loading />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //             ;
    //             <Loading />;
    //         </>
    //     );
    // }

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
                                                                    <a className="mb-2" href="#">
                                                                        {company.image ? <img className="circle-54" src={`https://res.cloudinary.com/drjgddl0y/${company.image}`} alt="" /> : <img className="circle-54" src="/images/default/company.jpg" alt="" />}
                                                                    </a>

                                                                    <h4>
                                                                        <a className="name" href="#">
                                                                            {company.name}
                                                                        </a>
                                                                    </h4>

                                                                    <ul className="social">
                                                                        <li>
                                                                            <Link to={company.facebook_url}>
                                                                                <i className="lni lni-facebook-original"> </i>
                                                                            </Link>
                                                                        </li>

                                                                        <li>
                                                                            <a target="_blank" href={company?.linkedin_url}>
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
                                                                            <a target="_blank" href={company?.website_url}>
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
                                                                <div key={job.id} className="manage-content">
                                                                    <div className="row align-items-center justify-content-center">
                                                                        <div className="col-lg-4 col-md-4 col-12">
                                                                            <h3>{job.title}</h3>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-4 col-12">
                                                                            <p>
                                                                                <span className="time">{job.location}</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-4 col-12">
                                                                            <div className="col-lg-3 col-md-3 col-12">
                                                                                <p>
                                                                                    <span className="time">{job.salary}</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-4 col-12">
                                                                            <p>
                                                                                <span className="time">{job.seniority}</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-4 col-12">
                                                                            <p>
                                                                                <Link className={styles["details-btn"]} to={`/jobs/${job.id}`}>
                                                                                    Details
                                                                                </Link>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                                                <div className=" col-lg-12  ">
                                                                    <form method="post" action="{% url 'subscribe_to_company' object.pk %}">
                                                                        {/* <button style="width: 100%" className="d-block btn" type="submit">{% if not is_subscribed %}Subscribe for company{% else %} Unsubscribe for company{% endif %}</button> */}
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget popular-feeds">
                                                        <div className="inner">
                                                            <h6 className={styles.title}>Job Location</h6>
                                                            <div className="mapouter">
                                                                <div className="gmap_canvas">
                                                                    {/* <iframe width="100%" height={300} id="gmap_canvas" src={`https://maps.google.com/maps?q=${company?.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} />

                                                                <style
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: ".mapouter{position:relative;text-align:right;height:300px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:100%;}",
                                                                    }}
                                                                />
                                                                <a href="https://maps-google.github.io/embed-google-map/">embed google map</a> */}
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

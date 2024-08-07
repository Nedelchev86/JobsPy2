import {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import JobSeekerDetailsAside from "./JobSeekersDetailsAside";
import {useParams} from "react-router-dom";
import EducationList from "../changeStatus/EducationList";
import {getJobseekerByID} from "../../api/JobSeekerApi";
import Loading from "../loading/Loading";
import SkillsModule from "../skills/Skills";
import {CLOUDINARY_URL} from "../../config";

export default function JobSeekerDetails() {
    // const [jobseeker, setJobseeker] = useState([]);
    const {id} = useParams();

    const {data: jobseeker, loading, error} = getJobseekerByID(id);

    return (
        <>
            <Breadcrumbs
                pageTitle="Resume"
                pageInfo="Don’t just find. Be found. Put your CV in front of great employers<br> 
    t helps you to increase your chances of finding a suitable job and let recruiters contact you about jobs that are not needed to pay for advertising"
            />

            <section className="section blog-single">
                <div className="container">
                    <div className="row">
                        <div className="resume ">
                            <div className="container">
                                <div className="resume-inner">
                                    <div className="row">
                                        <div className="col-lg-8 col-12">
                                            {loading ? (
                                                <Loading />
                                            ) : (
                                                <div className="inner-content">
                                                    <div className="personal-top-content">
                                                        <div className="row">
                                                            <div className="col-lg-5 col-md-5 col-12">
                                                                <div className="name-head">
                                                                    {jobseeker.profile_picture ? (
                                                                        <a className="mb-2" href="#">
                                                                            <img className="circle-54" src={`${CLOUDINARY_URL}${jobseeker.profile_picture}`} alt="" />
                                                                        </a>
                                                                    ) : (
                                                                        <a className="mb-2" href="#">
                                                                            <img className="circle-54" src="/images/clients/default_profile.png" alt="" />
                                                                        </a>
                                                                    )}

                                                                    <h4>
                                                                        {jobseeker.first_name} {jobseeker.last_name}
                                                                    </h4>
                                                                    <p>{jobseeker.occupation}</p>
                                                                    <ul className="social">
                                                                        <li>
                                                                            <a target="_blank" href={jobseeker.facebook}>
                                                                                <i className="lni lni-facebook-original"></i>
                                                                            </a>
                                                                        </li>

                                                                        <li>
                                                                            <a target="_blank" href={jobseeker.linkedin}>
                                                                                <i className="lni lni-linkedin-original"></i>
                                                                            </a>
                                                                        </li>

                                                                        <li>
                                                                            <a target="_blank" href={jobseeker.github}>
                                                                                <i className="lni lni-github"></i>
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
                                                                        <p>{jobseeker.city} </p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">E-mail</h5>
                                                                        <p>{jobseeker.id}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Phone</h5>
                                                                        <p>{jobseeker.phone_number}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Website</h5>

                                                                        <p>
                                                                            <a target="_blank" href={jobseeker.website}>
                                                                                Link
                                                                            </a>
                                                                        </p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Seniority</h5>
                                                                        <p>{jobseeker.seniority}</p>
                                                                    </div>

                                                                    <div className="single-list">
                                                                        <h5 className="title">Phone</h5>
                                                                        <p> Hidden </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="single-section">
                                                        <h4>About</h4>
                                                        <p className="font-size-4 mb-8">{jobseeker.about}</p>
                                                    </div>
                                                    <SkillsModule skills={jobseeker.skills} />

                                                    <div className="single-section exprerience">
                                                        <h4>Work Experience</h4>
                                                    </div>

                                                    <div className="single-section education">
                                                        <h4>Education</h4>

                                                        <EducationList id={id} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <JobSeekerDetailsAside />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

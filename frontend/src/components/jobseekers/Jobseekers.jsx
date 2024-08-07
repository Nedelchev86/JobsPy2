import React, {useEffect, useState} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import JobSeekersAside from "../jobseekersAside/JobseekersAside";
import {Link, useSearchParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import {Slide} from "react-awesome-reveal";
import styles from "./Jobseekers.module.css";
import {CLOUDINARY_URL} from "../../config";
import JobSeekersCard from "./JobSeekersCard";
import {API_URL} from "../../config";

export default function JobseekersList() {
    // const [jobseekers, setJobseekers] = useState([]);
    const [seniority, setSeniority] = useState(""); // For seniority filter
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [jobseekers, setJobseeker] = useState([]);
    const [skill, setSkill] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setLoading(true);
        const skillPArams = searchParams.get("skill");
        fetch(
            `${API_URL}jobseekers/?${new URLSearchParams({
                seniority,
                city,
                skill: skillPArams || skill,
            }).toString()}`
        )
            .then((response) => response.json())
            .then((data) => setJobseeker(data));
        setLoading(false);
    }, [seniority, city, searchParams]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === "seniority") {
            setSeniority(value);
        } else if (name === "city") {
            setCity(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSeniority("");
        setCity("");
    };

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const cityParam = params.get("city");
    //     if (cityParam) {
    //         setCity(cityParam);
    //     }
    // }, []);

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:8000/api/jobseekers/?city=${city}`)
    //         .then((response) => response.json())
    //         .then((data) => setJobseekers(data));
    // }, [city]);

    // const {data: jobseekers, loading} = useFetch(`${import.meta.env.VITE_API_URL}jobseekers/?city=${city}`, []);

   

    return (
        <>
            <Breadcrumbs pageTitle="Job Seekers" pageInfo="Find employees that match your hiring criteria." />
            {loading ? (
                <Loading />
            ) : (
                <div className="manage-resumes section">
                    <div className="container">
                        <div className="resume-inner">
                            <div className="row">
                                <div className="col-lg-8 col-12">
                                    {jobseekers.map((jobseeker) => (
                                        <JobSeekersCard key={jobseeker.user} jobseeker={jobseeker} />
                                        // <Slide key={jobseeker.user} direction="left" duration="1000" triggerOnce="true">
                                        //     <div className={`${styles["user-card"]} inner-content`}>
                                        //         <div className="resume-item">
                                        //             {jobseeker.profile_picture === null ? <img src={"images/clients/default_profile.png"} alt="Candidate" /> : <img src={`${CLOUDINARY_URL}${jobseeker.profile_picture}`} alt="Candidate" />}
                                        //             {/* {jobseeker.profile_picture && <img src={`${CLOUDINARY_URL}${jobseeker.profile_picture}`} alt="Candidate" />}
                                        //             {!jobseeker.profile_picture && <img src={"images/clients/default_profile.png"} alt="Candidate" />} */}

                                        //             <div className="right">
                                        //                 <h3>
                                        //                     <Link to={`/jobseekers/${jobseeker.user}`}>
                                        //                         {jobseeker.first_name} {jobseeker.last_name}
                                        //                     </Link>
                                        //                 </h3>
                                        //                 <span className="deg">{jobseeker.occupation}</span>
                                        //                 <ul className="experience">
                                        //                     <li>
                                        //                         Seniority: <span>{jobseeker.seniority}</span>
                                        //                     </li>
                                        //                     <li>
                                        //                         GitHub:
                                        //                         <span>
                                        //                             {jobseeker.github && (
                                        //                                 <Link target="_blank" to={jobseeker.github}>
                                        //                                     Link
                                        //                                 </Link>
                                        //                             )}
                                        //                         </span>
                                        //                     </li>
                                        //                     <li>
                                        //                         <i className="lni lni-map-marker"></i>
                                        //                         {jobseeker.city}
                                        //                     </li>
                                        //                 </ul>
                                        //                 <ul className="skills">
                                        //                     {jobseeker.skills.map((skill) => (
                                        //                         <li key={skill}>{skill}</li>
                                        //                     ))}
                                        //                 </ul>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        // </Slide>
                                    ))}
                                </div>

                                <JobSeekersAside seniority={seniority} city={city} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

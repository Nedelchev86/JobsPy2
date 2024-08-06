import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/authContexts";
import {Link} from "react-router-dom";
import {getApplicantsList} from "../../api/companyApi";
import {CLOUDINARY_URL} from "../../config";
import ApplicantListCard from "./ApplicantListCard";

export default function ApplicantsList() {
    const {auth} = useAuth();
    // const [applicants, setApplicants] = useState([]);

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}company/applicants/`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setApplicants(data));
    // }, []);
    const {data: applicants, loading, error} = getApplicantsList();

    return (
        <>
            <div className="job-items">
                {applicants.map((jobs) => (
                    <ApplicantListCard key={jobs.id} jobs={jobs} />
                ))}
            </div>
        </>
    );
}

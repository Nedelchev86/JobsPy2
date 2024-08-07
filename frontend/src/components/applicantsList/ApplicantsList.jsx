import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/authContexts";
import {Link} from "react-router-dom";
import {getApplicantsList} from "../../api/companyApi";
import {CLOUDINARY_URL} from "../../config";
import ApplicantListCard from "./ApplicantListCard";
import Loading from "../loading/Loading";

export default function ApplicantsList() {
    const {auth} = useAuth();

    const {data: applicants, loading, error} = getApplicantsList();

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="job-items">
                    {applicants.map((jobs) => (
                        <ApplicantListCard key={jobs.id} jobs={jobs} />
                    ))}
                </div>
            )}
        </>
    );
}

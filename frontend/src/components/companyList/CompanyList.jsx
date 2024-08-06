import {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link} from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import {getAllCompanies} from "../../api/companyApi";
import CompanyCards from "./CompanyCards";

export default function CompanyList() {
    const {data: companies, loading} = getAllCompanies();

    return (
        <>
            <Breadcrumbs pageTitle="Companies" pageInfo="Take a look at the top IT companies ..." />

            <section className="job-category style2 section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <span>Companies</span>
                                <h2>Browse by Company</h2>
                                <p>List of the largest software companies</p>
                            </div>
                        </div>
                    </div>
                    <div className="cat-head">
                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="row">
                                {companies.map((company) => (
                                    <CompanyCards key={company.user} company={company} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

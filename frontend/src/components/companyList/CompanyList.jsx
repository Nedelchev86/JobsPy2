import {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link} from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import {getAllCompanies} from "../../api/companyApi";

export default function CompanyList() {
    // const [companies, setCompanies] = useState([]);
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/companies/")
    //         .then((response) => response.json())
    //         .then((data) => setCompanies(data));
    // }, []);

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
                                    <div key={company.user} className="col-lg-3 col-md-6 col-12">
                                        <Link to={`/companies/${company.user}`} className="single-cat">
                                            <div className="top-side">{company.image ? <img src={`https://res.cloudinary.com/drjgddl0y/${company.image}`} alt={company.name} /> : <img src="images/default/company.jpg" alt={company.name} />}</div>

                                            <div className="bottom-side">
                                                <span className="available-job2">Jobs</span>
                                                <span className="available-job">{company.job_count}</span>
                                                <h3>{company.name}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

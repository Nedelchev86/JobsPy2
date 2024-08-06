import {Link} from "react-router-dom";
import {CLOUDINARY_URL} from "../../config";

export default function CompanyCards({company}) {
    return (
        <div key={company.user} className="col-lg-3 col-md-6 col-12">
            <Link to={`/companies/${company.user}`} className="single-cat">
                <div className="top-side">{company.image ? <img src={`${CLOUDINARY_URL}${company.image}`} alt={company.name} /> : <img src="images/default/company.jpg" alt={company.name} />}</div>

                <div className="bottom-side">
                    <span className="available-job2">Jobs</span>
                    <span className="available-job">{company.job_count}</span>
                    <h3>{company.name}</h3>
                </div>
            </Link>
        </div>
    );
}

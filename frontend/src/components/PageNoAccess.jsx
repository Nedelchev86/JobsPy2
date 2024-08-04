import {Link} from "react-router-dom";
export default function PageNoAccess() {
    return (
        <div className="error-area">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container">
                        <div className="error-content">
                            <h1>Opps!</h1>
                            <h2>Here Is Some Problem</h2>
                            <p>You do not have permission to access this page.</p>
                            <div className="button">
                                <Link to="/" className="btn">
                                    Go To Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

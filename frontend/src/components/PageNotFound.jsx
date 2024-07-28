import {Link} from "react-router-dom";
export default function PageNotFound() {
    return (
        <div class="error-area">
            <div class="d-table">
                <div class="d-table-cell">
                    <div class="container">
                        <div class="error-content">
                            <h1>Opps!</h1>
                            <h2>Here Is Some Problem</h2>
                            <p>The page you are looking for it maybe deleted</p>
                            <div class="button">
                                <Link to="/" class="btn">
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

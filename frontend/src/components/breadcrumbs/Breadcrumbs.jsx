import React from "react";
import {Link, useLocation} from "react-router-dom";

const Breadcrumbs = ({pageTitle, pageInfo}) => {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <>
            <div className="breadcrumbs overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs-content">
                                <h1 className="page-title">{pageTitle}</h1>
                                <p>{pageInfo}</p>
                            </div>
                            <ul className="breadcrumb-nav">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                {pathnames.map((value, index) => {
                                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                                    const label = value.charAt(0).toUpperCase() + value.slice(1);

                                    return (
                                        <li key={to}>
                                            <Link to={to}>{label}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Outlet /> */}
        </>
    );
};

export default Breadcrumbs;

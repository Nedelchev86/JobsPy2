import useFetch from "../../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import styles from "./JobsCategory.module.css";
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import Loading from "../loading/Loading";
import {API_URL} from "../../config";

export default function JobsCategory({category, handleInputChange}) {
    const {data: categories, error, loading, refetch} = useFetch(`${API_URL}jobs/categories/`, []);

    const [allJobs, setAllJobs] = useState(0);

    useEffect(() => {
        if (categories) {
            const totalJobCount = categories.reduce((total, category) => total + category.job_count, 0);

            setAllJobs(totalJobCount);
        }
    }, [categories]);

    const {search} = useLocation();
    const currentCategory = new URLSearchParams(search).get("category");

    return (
        <div className={`widget categories-widget ${styles.activeMenu}`}>
            <h5 className="widget-title">
                <span>Categories</span>
            </h5>
            {loading ? (
                <Loading />
            ) : (
                <ul className="ti">
                    <li key={category.id}>
                        <NavLink className={({isActive}) => (isActive && !currentCategory ? styles.clicked : "")} to={`/jobs/`}>
                            All Jobs
                            <span>{allJobs}</span>
                        </NavLink>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <NavLink className={({isActive}) => (isActive && currentCategory == category.id ? styles.clicked : "")} to={`/jobs/?category=${category.id}`}>
                                {category.name}
                                <span>{category.job_count}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

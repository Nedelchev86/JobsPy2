import useFetch from "../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import styles from "./JobsCategory.module.css";
import {useLocation} from "react-router-dom";

export default function JobsCategory({category, handleInputChange}) {
    const {data: categories, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}jobs/categories/`, []);

    const {search} = useLocation();
    const currentCategory = new URLSearchParams(search).get("category");
    console.log(currentCategory);
    return (
        <div className={`widget categories-widget ${styles.activeMenu}`}>
            <h5 className="widget-title">
                <span>Categories</span>
            </h5>
            <ul className="ti">
                <li key={category.id}>
                    <NavLink className={({isActive}) => (isActive && !currentCategory ? styles.clicked : "")} to={`/jobs/`}>
                        All Jobs
                        <span>8</span>
                    </NavLink>
                </li>
                {categories.map((category) => (
                    <li key={category.id}>
                        <NavLink className={({isActive}) => (isActive && currentCategory == category.id ? styles.clicked : "")} to={`/jobs/?category=${category.id}`}>
                            {category.name}
                            <span >{category.job_count}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import useFetch from "../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import styles from "./JobsCategory.module.css";

export default function JobsCategory({category, handleInputChange}) {
    const {data: categories, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}jobs/categories/`, []);

    return (
        <div className="widget categories-widget">
            <h5 className="widget-title">
                <span>Categories</span>
            </h5>
            <ul className="custom">
                <li key={category.id}>
                    <NavLink to={`/jobs/`}>
                        All Jobs
                        <span>8</span>
                    </NavLink>
                </li>
                {categories.map((category) => (
                    <li key={category.id}>
                        <NavLink to={`/jobs/?category=${category.id}`}>
                            {category.name}
                            <span>8</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import useFetch from "../../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import styles from "./PopularTag.module.css";
import {useLocation} from "react-router-dom";
import Loading from "../loading/Loading";

export default function PopularTags({skill, handleInputChange}) {
    const {data: skills, error, loading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}skills/`, []);
    const {search} = useLocation();
    const currentSkill = new URLSearchParams(search).get("skill");

    return (
        <div className="widget popular-tag-widget">
            {loading ? (
                <Loading />
            ) : (
                <div className="tags">
                    <NavLink className={({isActive}) => (isActive && !currentSkill ? styles.darkBlue : "")} to={`/jobs/`}>
                        All jobs
                    </NavLink>
                    {skills.map((s) => (
                        <NavLink className={({isActive}) => (isActive && currentSkill === s.name ? styles.darkBlue : "")} key={s.id} to={`/jobs/?skill=${s.name}`}>
                            {s.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}

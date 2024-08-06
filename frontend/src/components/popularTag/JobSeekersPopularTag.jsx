import useFetch from "../../hooks/useFetch";
import {Link, NavLink} from "react-router-dom";
import styles from "./PopularTag.module.css";
import {useLocation} from "react-router-dom";
import {getAllSkills} from "../../api/commonApi";

export default function JobSeekersPopularTags() {
    const {data: skills, error, isLoading, refetch} = getAllSkills();
    const currentSkill = new URLSearchParams(search).get("skill");

    return (
        <div className="widget popular-tag-widget">
            <div className="tags">
                <NavLink className={({isActive}) => (isActive && !currentSkill ? styles.darkBlue : "")} to={`/jobseekers/`}>
                    All jobs
                </NavLink>
                {skills.map((s) => (
                    <NavLink className={({isActive}) => (isActive && currentSkill === s.name ? styles.darkBlue : "")} key={s.id} to={`/jobseekers/?skill=${s.name}`}>
                        {s.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

import {Link, NavLink} from "react-router-dom";
import styles from "./PopularTag.module.css";
import {useLocation} from "react-router-dom";
import Loading from "../loading/Loading";
import {getAllSkills} from "../../api/commonApi";

export default function PopularTags({skill, handleInputChange}) {
    const {data: skills, error, loading, refetch} = getAllSkills();
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

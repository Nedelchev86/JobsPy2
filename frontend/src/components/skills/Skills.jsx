import styles from "./Skills.module.css";

export default function SkillsModule({skills}) {
    return (
        <div className="single-section skill">
            <h4>Skills</h4>
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {skills?.map((skill) => (
                    <li key={skill}>
                        <p className={styles.skills}> {skill}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

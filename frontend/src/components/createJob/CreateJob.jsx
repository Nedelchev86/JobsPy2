import React, {useState, useEffect} from "react";
// import JobSeekerMenu from "./JobseekerMenu";
// import Breadcrumbs from "./breadcrumbs/Breadcrumbs";
import {useAuth} from "../../contexts/authContexts";
import {useNavigate} from "react-router-dom";
import {useJobs} from "../../contexts/JobContext";
import {toast} from "react-toastify";
import usePost from "../../hooks/usePost";
import { postJob } from "../../api/jobsApi";

export default function CreateJob() {
    const navigate = useNavigate();
    const {auth, isAuthenticated} = useAuth();
    const [skills, setSkills] = useState([]);
    const {fetchJobs} = useJobs();
    const [job, setJob] = useState({
        title: "",
        category: "",
        seniority: "",
        description: "",
        responsibilities: "",
        benefits: "",
        vacancy: "",
        location: "",
        job_type: "",
        salary: "",
        deadline: "",
        needed_skills: [],
        is_published: true,
        job_image: null,
    });

    const {data, loading, error, post} = postJob();

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    useEffect(() => {
        // Fetch skills from the API
        fetch(`${import.meta.env.VITE_API_URL}skills/`)
            .then((response) => response.json())
            .then((data) => setSkills(data))
            .catch((error) => console.error("Error fetching skills:", error));
    }, []);

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/user/jobseeker/update/", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${auth}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setJob(data))
    //         .catch((error) => {
    //             console.error("Error fetching profile data:", error);
    //         });
    // }, [auth]);

    const handleSkillChange = (e) => {
        const {value, checked} = e.target;
        console.log(value);
        console.log(checked);
        setJob((prevJob) => ({
            ...prevJob,
            needed_skills: checked ? [...prevJob.needed_skills, value] : prevJob.needed_skills.filter((skill) => skill !== value),
        }));

    };

    const handleImageUpload = (e) => {
        console.log("test");
        const file = e.target.files[0];
        setJob((prevState) => ({
            ...prevState,
            job_image: file,
        }));

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setJob((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        const addFormData = (key, value) => {
            if (value !== "" && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        };

        addFormData("job_image", job.job_image);
        addFormData("title", job.title);
        addFormData("category", job.category);
        addFormData("seniority", job.seniority);
        addFormData("description", job.description);
        addFormData("responsibilities", job.responsibilities);
        addFormData("benefits", job.benefits);
        addFormData("vacancy", job.vacancy);
        addFormData("location", job.location);
        addFormData("job_type", job.job_type);
        addFormData("salary", job.salary);
        addFormData("deadline", job.deadline);
        addFormData("is_published", job.is_published);
        job.needed_skills.forEach((skill) => {
            formData.append("needed_skills", skill);
        });

        try {
            await post(formData, true); // Pass FormData and isFormData flag
            console.log("Profile updated successfully:", data);
            fetchJobs();
            toast.success("Job added successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error adding job:", error);
            toast.error("Failed to add job. Please try again.");
        }

        // fetch("http://127.0.0.1:8000/api/jobs/create/", {
        //     headers: {
        //         Authorization: `Bearer ${auth}`,
        //     },
        //     method: "POST",
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Profile updated successfully:", data);
        //         fetchJobs();
        //         navigate("/dashboard");
        //     })
        //     .catch((error) => {
        //         console.error("Error updating profile:", error);
        //     });
    };

    return (
        <>
            <div className="change-password section">
                <div className="container">
                    <div className="alerts-inner">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="password-content">
                                    <h3>Edit Profile</h3>
                                    <p>Here you can edit your Profile.</p>

                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label htmlFor="id_title" className="required">
                                                Title:
                                            </label>
                                            <input type="text" name="title" maxLength="300" className="form-control" required id="id_title" value={job.title} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_category" className="required">
                                                Category:
                                            </label>
                                            <select name="category" className="form-control" required id="id_category" value={job.category} onChange={handleChange}>
                                                <option value="">---------</option>
                                                <option value="1">Data Science</option>
                                                <option value="2">Mobile Development</option>
                                                <option value="3">Quality Assurance</option>
                                                <option value="4">Infrastructure</option>
                                                <option value="5">Fullstack Development</option>
                                                <option value="6">Frontend Development</option>
                                                <option value="7">Backend Development</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_seniority">Seniority:</label>
                                            <select name="seniority" className="form-control" id="id_seniority" value={job.seniority} onChange={handleChange}>
                                                <option value="">---------</option>
                                                <option value="Junior / Intern">Junior / Intern</option>
                                                <option value="1-2 year's experience">1-2 year's experience</option>
                                                <option value="2-5 year's experience">2-5 year's experience</option>
                                                <option value="5+ year's experience">5+ year's experience</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_description" className="required">
                                                Description:
                                            </label>
                                            <textarea name="description" cols="40" rows="10" className="form-control" required id="id_description" value={job.description} onChange={handleChange}></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_responsibilities" className="required">
                                                Responsibilities:
                                            </label>
                                            <textarea name="responsibilities" cols="40" rows="10" className="form-control" required id="id_responsibilities" value={job.responsibilities} onChange={handleChange}></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_benefits">Benefits:</label>
                                            <textarea name="benefits" cols="40" rows="10" className="form-control" id="id_benefits" value={job.benefits} onChange={handleChange}></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_vacancy">Vacancy:</label>
                                            <input type="number" name="vacancy" className="form-control" id="id_vacancy" value={job.vacancy} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_location" className="required">
                                                Location:
                                            </label>
                                            <input type="text" name="location" maxLength="300" className="form-control" required id="id_location" value={job.location} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_job_type" className="required">
                                                Job type:
                                            </label>
                                            <select name="job_type" className="form-control" required id="id_job_type" value={job.job_type} onChange={handleChange}>
                                                <option value="">---------</option>
                                                <option value="Full time">Full time</option>
                                                <option value="Part time">Part time</option>
                                                <option value="Remote">Remote</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_salary">Salary:</label>
                                            <input type="text" name="salary" maxLength="30" placeholder="exp:50,000-80,000" className="form-control" id="id_salary" value={job.salary} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_deadline" className="required">
                                                Deadline:
                                            </label>
                                            <input type="date" name="deadline" className="form-control" required id="id_deadline" value={job.deadline} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_job_image">Image:</label>
                                            <input type="file" name="job_image" className="form-control" id="id_job_image" onChange={handleImageUpload} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_needed_skills" className="required">
                                                Needed skills:
                                            </label>
                                            <div className="form-check">
                                                {skills.map((skill) => (
                                                    <div key={skill.id}>
                                                        <input type="checkbox" name="skills" value={skill.name} className="form-check" checked={job.needed_skills.includes(skill.name)} onChange={handleSkillChange} />
                                                        <label className="form-check-label">{skill.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* <select name="needed_skills" className="form-control" required id="id_needed_skills" multiple onChange={handleSkillChange}>
                                                {skills.map((skill) => (
                                                    <option key={skill.id} value={skill.id}>
                                                        {skill.name}
                                                    </option>
                                                ))}
                                            </select> */}
                                        </div>

                                        {/* <div>
                                            <label htmlFor="id_is_published">Is published:</label>

                                            <input type="checkbox" name="is_published" className="form-check" id="id_is_published" value={job.is_published} onChange={handleChange} />
                                        </div> */}

                                        <div className="col-lg-12">
                                            <div className="button">
                                                <button className="btn">Save</button>
                                            </div>
                                        </div>
                                    </form>

                                    {/* {% if form.errors %}
                            <div className="alert alert-danger">
                            {{ form.errors }}
                            </div>
                            {% endif %} */}

                                    <form method="post">
                                        <div className="row">
                                            {/* {{ form.media }} */}
                                            {/* {% for field in form %}
                    <div className="form-group">
                    {{ field.label_tag }}
                    {{ field }}
                     </div>
                    {% for error in field.errors %}
                      <p style="color: red">{{ error }}</p>
                    {% endfor %}

                {% endfor %} */}
                                            {/* 
                                            <div className="col-lg-12">
                                                <div className="button">
                                                    <button className="btn">Save</button>
                                                </div>
                                            </div> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

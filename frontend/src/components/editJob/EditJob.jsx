// import React, {useState, useEffect} from "react";
// import {useAuth} from "../../contexts/authContexts";
// import {useNavigate} from "react-router-dom";
// import {useJobs} from "../../contexts/JobContext";
// import {useParams} from "react-router-dom";
// import Loading from "../loading/Loading";
// import {toast} from "react-toastify";
// import {getAllCategories} from "../../api/jobsApi";
// import {getAllSeniorities} from "../../api/commonApi";

// export default function EditJob() {
//     const [isLoading, setIsLoading] = useState(true);
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const {auth, isAuthenticated} = useAuth();
//     const [skills, setSkills] = useState([]);
//     const {fetchJobs} = useJobs();
//     const [job, setJob] = useState({
//         title: "",
//         category: "",
//         seniority: "",
//         description: "",
//         responsibilities: "",
//         benefits: "",
//         vacancy: "",
//         location: "",
//         job_type: "",
//         salary: "",
//         deadline: "",
//         needed_skills: [],
//         is_published: true,
//         job_image: null,
//     });

//     const {data: categories} = getAllCategories();
//     const {data: seniorities} = getAllSeniorities();

//     if (!isAuthenticated) {
//         return <div>Not authenticated...</div>;
//     }

//     useEffect(() => {
//         // Fetch skills from the API
//         fetch(`${import.meta.env.VITE_API_URL}skills/`)
//             .then((response) => response.json())
//             .then((data) => setSkills(data))
//             .catch((error) => console.error("Error fetching skills:", error));
//     }, []);

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_API_URL}jobs/update/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${auth}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // setJob(data);
//                 setJob({
//                     ...data,
//                     title: data.title || "",
//                     category: data.category || "",
//                     seniority: data.seniority || "",
//                     description: data.description || "",
//                     responsibilities: data.responsibilities || "",
//                     benefits: data.benefits || "",
//                     vacancy: data.vacancy || "",
//                     location: data.location || "",
//                     job_type: data.job_type || "",
//                     salary: data.salary || "",
//                     deadline: data.deadline || "",
//                     needed_skills: data.needed_skills || [],
//                     is_published: data.is_published !== undefined ? data.is_published : true,
//                     job_image: data.job_image || null,
//                 });
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching profile data:", error);
//             });
//     }, [auth]);

//     const handleSkillChange = (e) => {
//         const {value, checked} = e.target;
//         console.log(value);
//         console.log(checked);
//         setJob((prevJob) => ({
//             ...prevJob,
//             needed_skills: checked ? [...prevJob.needed_skills, value] : prevJob.needed_skills.filter((skill) => skill !== value),
//         }));
//         console.log(job.needed_skills);
//     };

//     const handleImageUpload = (e) => {
//         console.log("test");
//         const file = e.target.files[0];
//         setJob((prevState) => ({
//             ...prevState,
//             job_image: file,
//         }));
//         console.log("image");
//         console.log(file);
//     };

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setJob((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(job.category);
//         const formData = new FormData();

//         const addFormData = (key, value) => {
//             if (value !== "" && value !== null && value !== undefined) {
//                 formData.append(key, value);
//             }
//         };

//         addFormData("job_image", job.job_image);
//         addFormData("title", job.title);
//         addFormData("category", job.category);
//         addFormData("seniority", job.seniority);
//         addFormData("description", job.description);
//         addFormData("responsibilities", job.responsibilities);
//         addFormData("benefits", job.benefits);
//         addFormData("vacancy", job.vacancy);
//         addFormData("location", job.location);
//         addFormData("job_type", job.job_type);
//         addFormData("salary", job.salary);
//         addFormData("deadline", job.deadline);
//         addFormData("is_published", job.is_published);
//         job.needed_skills.forEach((skill) => {
//             formData.append("needed_skills", skill);
//         });

//         fetch(`${import.meta.env.VITE_API_URL}jobs/update/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${auth}`,
//             },
//             method: "PUT",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Profile updated successfully:", data);
//                 toast.success("Profile updated successfully!");
//                 fetchJobs();
//                 navigate("/dashboard");
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//                 toast.error("Error updating profile!");
//             });
//     };

//     return (
//         <>
//             <div className="change-password section">
//                 <div className="container">
//                     <div className="alerts-inner">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="password-content">
//                                     <h3>Edit Job</h3>
//                                     <p>Here you can edit job details.</p>

//                                     {isLoading ? (
//                                         <Loading />
//                                     ) : (
//                                         <form onSubmit={handleSubmit} encType="multipart/form-data">
//                                             <div className="form-group">
//                                                 <label htmlFor="id_title" className="required">
//                                                     Title:
//                                                 </label>
//                                                 <input type="text" name="title" maxLength="300" className="form-control" required id="id_title" value={job.title} onChange={handleChange} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_category" className="required">
//                                                     Category:
//                                                 </label>
//                                                 <select name="category" className="form-control" required id="id_category" value={job.category} onChange={handleChange}>
//                                                     <option value="">---------</option>
//                                                     {categories?.map((category) => (
//                                                         <option key={category.id} value={category.id}>
//                                                             {category.name}
//                                                         </option>
//                                                     ))}
//                                                     {/* <option value="1">Data Science</option>
//                                                     <option value="2">Mobile Development</option>
//                                                     <option value="3">Quality Assurance</option>
//                                                     <option value="4">Infrastructure</option>
//                                                     <option value="5">Fullstack Development</option>
//                                                     <option value="6">Frontend Development</option>
//                                                     <option value="7">Backend Development</option> */}
//                                                 </select>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_seniority">Seniority:</label>
//                                                 <select name="seniority" className="form-control" id="id_seniority" value={job.seniority} onChange={handleChange}>
//                                                     <option value="">---------</option>
//                                                     {seniorities?.map((seniority) => (
//                                                         <option key={seniority.id} value={seniority.name}>
//                                                             {seniority.name}
//                                                         </option>
//                                                     ))}
//                                                     {/* <option value="Junior / Intern">Junior / Intern</option>
//                                                     <option value="1-2 year's experience">1-2 year's experience</option>
//                                                     <option value="2-5 year's experience">2-5 year's experience</option>
//                                                     <option value="5+ year's experiencee">5+ year's experience</option> */}
//                                                 </select>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_description" className="required">
//                                                     Description:
//                                                 </label>
//                                                 <textarea name="description" cols="40" rows="10" className="form-control" required id="id_description" value={job.description} onChange={handleChange}></textarea>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_responsibilities" className="required">
//                                                     Responsibilities:
//                                                 </label>
//                                                 <textarea name="responsibilities" cols="40" rows="10" className="form-control" required id="id_responsibilities" value={job.responsibilities} onChange={handleChange}></textarea>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_benefits">Benefits:</label>
//                                                 <textarea name="benefits" cols="40" rows="10" className="form-control" id="id_benefits" value={job.benefits} onChange={handleChange}></textarea>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_vacancy">Vacancy:</label>
//                                                 <input type="number" name="vacancy" className="form-control" id="id_vacancy" value={job.vacancy} onChange={handleChange} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_location" className="required">
//                                                     Location:
//                                                 </label>
//                                                 <input type="text" name="location" maxLength="300" className="form-control" required id="id_location" value={job.location} onChange={handleChange} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_job_type" className="required">
//                                                     Job type:
//                                                 </label>
//                                                 <select name="job_type" className="form-control" required id="id_job_type" value={job.job_type} onChange={handleChange}>
//                                                     <option value="">---------</option>
//                                                     <option value="Full time">Full time</option>
//                                                     <option value="Part time">Part time</option>
//                                                     <option value="Remote">Remote</option>
//                                                     <option value="Internship">Internship</option>
//                                                 </select>
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_salary">Salary:</label>
//                                                 <input type="text" name="salary" maxLength="30" placeholder="exp:50,000-80,000" className="form-control" id="id_salary" value={job.salary} onChange={handleChange} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_deadline" className="required">
//                                                     Deadline:
//                                                 </label>
//                                                 <input type="date" name="deadline" className="form-control" required id="id_deadline" value={job.deadline} onChange={handleChange} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_job_image">Image:</label>
//                                                 <input type="file" name="job_image" className="form-control" id="id_job_image" onChange={handleImageUpload} />
//                                             </div>

//                                             <div className="form-group">
//                                                 <label htmlFor="id_needed_skills" className="required">
//                                                     Needed skills:
//                                                 </label>
//                                                 <div className="form-check">
//                                                     {skills.map((skill) => (
//                                                         <div key={skill.id}>
//                                                             <input type="checkbox" name="skills" value={skill.name} className="form-check" checked={job.needed_skills.includes(skill.name)} onChange={handleSkillChange} />
//                                                             <label className="form-check-label">{skill.name}</label>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                                 {/* <select name="needed_skills" className="form-control" required id="id_needed_skills" multiple onChange={handleSkillChange}>
//                                                 {skills.map((skill) => (
//                                                     <option key={skill.id} value={skill.id}>
//                                                         {skill.name}
//                                                     </option>
//                                                 ))}
//                                             </select> */}
//                                             </div>

//                                             <div className="col-lg-12">
//                                                 <div className="button">
//                                                     <button className="btn">Save</button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     )}
//                                     {/* {% if form.errors %}
//                             <div className="alert alert-danger">
//                             {{ form.errors }}
//                             </div>
//                             {% endif %} */}

//                                     <form method="post">
//                                         <div className="row">
//                                             {/* {{ form.media }} */}
//                                             {/* {% for field in form %}
//                     <div className="form-group">
//                     {{ field.label_tag }}
//                     {{ field }}
//                      </div>
//                     {% for error in field.errors %}
//                       <p style="color: red">{{ error }}</p>
//                     {% endfor %}

//                 {% endfor %} */}
//                                             {/*
//                                             <div className="col-lg-12">
//                                                 <div className="button">
//                                                     <button className="btn">Save</button>
//                                                 </div>
//                                             </div> */}
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import {useJobs} from "../../contexts/JobContext";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Loading from "../loading/Loading";
import {getJobDetails, putUpdateJob} from "../../api/jobsApi";
import {getAllCategories} from "../../api/jobsApi";
import {getAllSeniorities, getAllSkills} from "../../api/commonApi";

export default function EditJob() {
    const navigate = useNavigate();
    const {auth, isAuthenticated} = useAuth();
    const {id} = useParams();
    const {fetchJobs} = useJobs();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
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
            job_image: "",
            is_published: true,
        },
        mode: "onBlur",
    });

    const {data: job, error: jobError} = getJobDetails(id);
    const {data: categories} = getAllCategories();
    const {data: seniorities} = getAllSeniorities();
    const {data: skills} = getAllSkills();
    const {put, error} = putUpdateJob(id);

    useEffect(() => {
        if (job) {
            Object.keys(job).forEach((key) => {
                setValue(key, job[key]);
            });
            setIsLoading(false);
        }
    }, [job, setValue]);

    // useEffect(() => {
    //     if (!isAuthenticated) return;

    //     if (job) {
    //         setValue("title", job.title || "");
    //         setValue("category", job.category || "");
    //         setValue("seniority", job.seniority || "");
    //         setValue("description", job.description || "");
    //         setValue("responsibilities", job.responsibilities || "");
    //         setValue("benefits", job.benefits || "");
    //         setValue("vacancy", job.vacancy || "");
    //         setValue("location", job.location || "");
    //         setValue("job_type", job.job_type || "");
    //         setValue("salary", job.salary || "");
    //         setValue("deadline", job.deadline || "");
    //         setValue("is_published", job.is_published !== undefined ? job.is_published : true);
    //         setValue("needed_skills", job.needed_skills || []);
    //         // Load job image if needed (e.g., by setting an image URL)
    //         setIsLoading(false);
    //     }
    // }, [job, isAuthenticated, setValue]);

    const onSubmit = async (formData) => {
        console.log("test");
        setIsLoading(true);
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] === null || formData[key] === undefined) {
                formDataObj.append(key, "");
            } else {
                if (key === "needed_skills") {
                    formData[key].forEach((skill) => formDataObj.append("needed_skills", skill));
                } else if (key === "job_image") {
                    if (typeof formData.job_image === "string") {
                        formDataObj.append("job_image", formData.job_image);
                    } else if (formData.job_image[0]) {
                        formDataObj.append("job_image", formData.job_image[0]);
                    }
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        });

        try {
            await put(formDataObj, true);
            if (error) {
                toast.error(error);
            }
            toast.success("Job updated successfully!");
            fetchJobs();
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Failed to update job. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    if (isLoading || !job) {
        return <Loading />;
    }

    return (
        <>
            <div className="change-password section">
                <div className="container">
                    <div className="alerts-inner">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="password-content">
                                    <h3>Edit Job2</h3>
                                    <p>Here you can edit job details.</p>

                                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label htmlFor="id_title" className="required">
                                                Title:
                                            </label>
                                            <input
                                                type="text"
                                                {...register("title", {
                                                    required: "Title is required",
                                                    maxLength: {
                                                        value: 300,
                                                        message: "Title cannot exceed 300 characters",
                                                    },
                                                })}
                                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                                id="id_title"
                                            />
                                            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_category" className="required">
                                                Category:
                                            </label>
                                            <select {...register("category", {required: "Category is required"})} className={`form-control ${errors.category ? "is-invalid" : ""}`} id="id_category">
                                                <option value="">---------</option>
                                                {categories?.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label className="required" htmlFor="id_seniority">
                                                Seniority:
                                            </label>
                                            <select {...register("seniority", {required: "Seniority is required"})} className={`form-control ${errors.seniority ? "is-invalid" : ""}`} id="id_seniority">
                                                <option value="">---------</option>
                                                {seniorities?.map((seniority) => (
                                                    <option key={seniority.id} value={seniority.name}>
                                                        {seniority.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.seniority && <div className="invalid-feedback">{errors.seniority.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_description" className="required">
                                                Description:
                                            </label>
                                            <textarea
                                                {...register("description", {
                                                    required: "Description is required",
                                                    maxLength: {
                                                        value: 1000,
                                                        message: "Description cannot exceed 1000 characters",
                                                    },
                                                })}
                                                cols="40"
                                                rows="10"
                                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                                id="id_description"
                                            />
                                            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_responsibilities" className="required">
                                                Responsibilities:
                                            </label>
                                            <textarea
                                                {...register("responsibilities", {
                                                    required: "Responsibilities are required",
                                                    maxLength: {
                                                        value: 1000,
                                                        message: "Responsibilities cannot exceed 1000 characters",
                                                    },
                                                })}
                                                cols="40"
                                                rows="10"
                                                className={`form-control ${errors.responsibilities ? "is-invalid" : ""}`}
                                                id="id_responsibilities"
                                            />
                                            {errors.responsibilities && <div className="invalid-feedback">{errors.responsibilities.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_benefits">Benefits:</label>
                                            <textarea {...register("benefits")} cols="40" rows="10" className="form-control" id="id_benefits" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_vacancy">Vacancy:</label>
                                            <input type="number" {...register("vacancy")} className="form-control" id="id_vacancy" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_location" className="required">
                                                Location:
                                            </label>
                                            <input
                                                type="text"
                                                {...register("location", {
                                                    required: "Location is required",
                                                    maxLength: {
                                                        value: 300,
                                                        message: "Location cannot exceed 300 characters",
                                                    },
                                                })}
                                                className={`form-control ${errors.location ? "is-invalid" : ""}`}
                                                id="id_location"
                                            />
                                            {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_job_type" className="required">
                                                Job type:
                                            </label>
                                            <select {...register("job_type", {required: "Job type is required"})} className={`form-control ${errors.job_type ? "is-invalid" : ""}`} id="id_job_type">
                                                <option value="">---------</option>
                                                <option value="Full time">Full time</option>
                                                <option value="Part time">Part time</option>
                                                <option value="Remote">Remote</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                            {errors.job_type && <div className="invalid-feedback">{errors.job_type.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_salary">Salary:</label>
                                            <input type="text" {...register("salary")} className="form-control" id="id_salary" placeholder="exp: 50,000-80,000" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_deadline" className="required">
                                                Deadline:
                                            </label>
                                            <input type="date" {...register("deadline", {required: "Deadline is required"})} className={`form-control ${errors.deadline ? "is-invalid" : ""}`} id="id_deadline" />
                                            {errors.deadline && <div className="invalid-feedback">{errors.deadline.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_job_image">Image:</label>
                                            <input type="file" {...register("job_image")} className="form-control" id="id_job_image" />
                                        </div>

                                        <div className="form-group">
                                            <label className="required">Needed skills:</label>
                                            <div className="form-check">
                                                {skills.map((skill) => (
                                                    <div key={skill.id}>
                                                        <input type="checkbox" {...register("needed_skills")} value={skill.name} className="form-check" />
                                                        <label className="form-check-label">{skill.name}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="button">
                                                <button type="submit" className="btn">
                                                    {isLoading ? "Saving..." : "Save"}
                                                </button>
                                            </div>
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

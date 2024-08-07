import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/authContexts";
import {useJobs} from "../../contexts/JobContext";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import Loading from "../loading/Loading";
import {postJob, getAllCategories} from "../../api/jobsApi";
import {getAllSeniorities, getAllSkills} from "../../api/commonApi";
export default function CreateJob() {
    const navigate = useNavigate();
    const {auth, isAuthenticated} = useAuth();

    // const [skills, setSkills] = useState([]);
    const {fetchJobs} = useJobs();
    const [isLoading, setIsLoading] = useState(false);
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
    const {data, loading, error, post} = postJob();
    const {data: categories} = getAllCategories();
    const {data: seniorities} = getAllSeniorities();
    const {data: skills} = getAllSkills();

    const onSubmit = async (formData) => {
        setIsLoading(true);
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key] === null || formData[key] === undefined) {
                formDataObj.append(key, "");
            } else {
                if (key === "needed_skills") {
                    formData[key].forEach((skill) => formDataObj.append("needed_skills", skill));
                } else if (key === "job_image") {
                    // Check if profile_picture is an object (File) or a string (URL)
                    if (typeof formData.job_image === "string") {
                        // If it's a string, append it directly
                        formDataObj.append("job_image", formData.job_image);
                    } else if (formData.job_image[0]) {
                        // If it's a File object, append the file

                        formDataObj.append("job_image", formData.job_image[0]);
                    }
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        });

        // try {
        //     await post(formDataObj, true);
        //     toast.success("Job posted successfully!");
        //     console.log("Success");
        //     fetchJobs();
        //     navigate("/dashboard");
        try {
            const response = await post(formDataObj, true);

            if (error) {
                toast.error(error);
            } else {
                toast.success("Job posted successfully!");
                fetchJobs();
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            toast.error("Failed to post job. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    return (
        <>
            <div className="change-password section">
                <div className="container">
                    <div className="alerts-inner">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="password-content">
                                    <h3>Create Job</h3>
                                    <p>Here you can create a new job post.</p>

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
                                                        value: 2000,
                                                        message: "Description cannot exceed 2000 characters",
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
                                                        value: 2000,
                                                        message: "Responsibilities cannot exceed 2000 characters",
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
                                            <input
                                                type="date"
                                                {...register("deadline", {
                                                    required: "Deadline is required",
                                                    validate: {
                                                        isAfterToday: (value) => {
                                                            const today = new Date().toISOString().split("T")[0];

                                                            return value > today || "Deadline must be after today.";
                                                        },
                                                    },
                                                })}
                                                className={`form-control ${errors.deadline ? "is-invalid" : ""}`}
                                                id="id_deadline"
                                            />
                                            {errors.deadline && <div className="invalid-feedback">{errors.deadline.message}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="id_job_image">Image:</label>
                                            <input type="file" {...register("job_image")} className="form-control" id="id_job_image" />
                                        </div>

                                        <div className="form-group">
                                            <label className="required">
                                                {/* <label htmlFor="id_needed_skills" className="required"> */}
                                                Needed skills:
                                            </label>
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

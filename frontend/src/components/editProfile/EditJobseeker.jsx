import React, {useState, useEffect} from "react";
// import JobSeekerMenu from "./JobseekerMenu";
// import Breadcrumbs from "./breadcrumbs/Breadcrumbs";
import {useAuth} from "../../contexts/authContexts";
import {useNavigate} from "react-router-dom";
import Loading from "../loading/Loading";
import {toast} from "react-toastify";
import {useForm, Controller} from "react-hook-form";
import useFetch from "../../hooks/useFetch";

export default function EditJobseeker() {
    const navigate = useNavigate();
    const {auth, isAuthenticated} = useAuth();
    // const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const profile = {
        first_name: "",
        last_name: "",
        city: "",
        nationality: "",
        occupation: "",
        website: "",
        linkedin: "",
        facebook: "",
        github: "",
        about: "",
        phone_number: "",
        gender: "",
        seniority: "",
        marital_status: "",
        skills: [],
        profile_picture: "",
        user: "",
    };

    const {data: skills, error, refetch} = useFetch(`${import.meta.env.VITE_API_URL}skills/`, []);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm({
        profile,
        mode: "onBlur",
    });

    // useEffect(() => {
    //     // Fetch skills from the API
    //     fetch(`${import.meta.env.VITE_API_URL}skills/`)
    //         .then((response) => response.json())
    //         .then((data) => setSkills(data))
    //         .catch((error) => console.error("Error fetching skills:", error));
    // }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}user/jobseeker/update/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) =>
                Object.keys(data).forEach((key) => {
                    setValue(key, data[key]);
                })
            )
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
        setLoading(false);
    }, [auth]);

    // const handleSkillChange = (e) => {
    //     const {value, checked} = e.target;
    //     if (checked) {
    //         setProfile((prevProfile) => ({
    //             ...prevProfile,
    //             skills: [...prevProfile.skills, value],
    //         }));
    //     } else {
    //         setProfile((prevProfile) => ({
    //             ...prevProfile,
    //             skills: prevProfile.skills.filter((skill) => skill !== value),
    //         }));
    //     }
    // };

    // const handleImageUpload = (e) => {
    //     console.log("test");
    //     const file = e.target.files[0];
    //     setProfile((prevState) => ({
    //         ...prevState,
    //         profile_picture: file,
    //     }));
    // };

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setProfile((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const formDataObj = new FormData();

            // Append form data to FormData object
            Object.keys(formData).forEach((key) => {
                if (formData[key] === null || formData[key] === undefined) {
                    formDataObj.append(key, "");
                } else {
                    if (key === "skills") {
                        formData[key].forEach((skill) => formDataObj.append("skills", skill));
                    } else if (key === "profile_picture" && formData.profile_picture[0]) {
                        formDataObj.append("profile_picture", formData.profile_picture[0]);
                    } else {
                        formDataObj.append(key, formData[key]);
                    }
                }
            });

            // Make API call to update profile
            fetch(`${import.meta.env.VITE_API_URL}user/jobseeker/update/`, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
                method: "PUT",
                body: formDataObj,
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            // Handle validation errors
                            if (errorData.errors) {
                                Object.entries(errorData.errors).forEach(([field, messages]) => {});
                            }

                            toast.error("Failed to edit profile");
                            throw new Error("Validation error");
                        });
                    }
                    return response.json();
                })

                .then((data) => {
                    setIsLoading(false);
                    toast.success("Profile updated successfully");
                    console.log("Profile updated successfully:", data);
                    navigate("/dashboard");
                });
        } catch (error) {
            toast.error("Failed to edit profile");
            console.error("Error updating profile:", error);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="change-password section">
                    <div className="container">
                        <div className="alerts-inner">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="password-content">
                                        <h3>Edit Profile</h3>
                                        <p>Here you can edit your Profile.</p>

                                        {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="id_first_name" className="required">
                                                        First Name:
                                                    </label>
                                                    <input type="text" name="first_name" value={profile.first_name} maxLength="50" className="form-control" onChange={handleChange} required id="id_first_name" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_last_name" className="required">
                                                        Last name:
                                                    </label>
                                                    <input type="text" name="last_name" value={profile.last_name} maxLength="50" className="form-control" onChange={handleChange} required id="id_last_name" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_city" className="required">
                                                        City:
                                                    </label>
                                                    <input type="text" name="city" value={profile.city} maxLength="50" className="form-control" onChange={handleChange} required id="id_city" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_nationality" className="required">
                                                        Nationality:
                                                    </label>
                                                    <input type="text" name="nationality" value={profile.nationality} maxLength="50" className="form-control" onChange={handleChange} required id="id_nationality" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_occupation" className="required">
                                                        Occupation:
                                                    </label>
                                                    <input type="text" name="occupation" value={profile.occupation} maxLength="50" className="form-control" onChange={handleChange} required id="id_occupation" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_seniority">Seniority:</label>
                                                    <select name="seniority" className="form-control" id="id_seniority" value={profile.seniority || ""} maxLength="50" onChange={handleChange}>
                                                        <option value="">---------</option>

                                                        <option value="Junior / Intern">Junior / Intern</option>

                                                        <option value="1-2 year&#x27;s experience">1-2 year&#x27;s experience</option>

                                                        <option value="2-5 year&#x27;s experience">2-5 year&#x27;s experience</option>

                                                        <option value="5+ year&#x27;s experience">5+ year&#x27;s experience</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_website">Website:</label>
                                                    <input type="url" name="website" value={profile.website || ""} onChange={handleChange} maxLength="70" className="form-control" id="id_website" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_linkedin">Linkedin:</label>
                                                    <input type="url" value={profile.linkedin || ""} onChange={handleChange} name="linkedin" maxLength="50" className="form-control" id="id_linkedin" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_facebook">Facebook:</label>
                                                    <input type="url" name="facebook" maxLength="50" value={profile.facebook || ""} onChange={handleChange} className="form-control" id="id_facebook" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_github">Github:</label>
                                                    <input type="url" name="github" maxLength="50" value={profile.github || ""} onChange={handleChange} className="form-control" id="id_github" />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_about" className="required">
                                                        About:
                                                    </label>
                                                    <div className="django-ckeditor-widget" data-field-id="id_about">
                                                        <textarea
                                                            name="about"
                                                            cols="40"
                                                            rows="10"
                                                            className="form-control"
                                                            required
                                                            id="id_about"
                                                            data-processed="0"
                                                            data-config='{"skin": "moono-lisa", "toolbar_Basic": [["Source", "-", "Bold", "Italic"]], "toolbar_Full": [["Styles", "Format", "Bold", "Italic", "Underline", "Strike", "SpellChecker", "Undo", "Redo"], ["Link", "Unlink", "Anchor"], ["Image", "Flash", "Table", "HorizontalRule"], ["TextColor", "BGColor"], ["Smiley", "SpecialChar"], ["Source"]], "toolbar": "Full", "height": 291, "width": "100%", "filebrowserWindowWidth": 940, "filebrowserWindowHeight": 725, "removePlugins": "exportpdf", "versionCheck": false, "language": "en-us"}'
                                                            data-external-plugin-resources="[]"
                                                            data-id="id_about"
                                                            data-type="ckeditortype"
                                                            value={profile.about}
                                                            onChange={handleChange}
                                                        >
                                                            &lt;p&gt;fref&lt;/p&gt;
                                                        </textarea>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_phone_number">Phone number:</label>
                                                    <input type="text" name="phone_number" maxLength="50" className="form-control" id="id_phone_number" value={profile.phone_number || ""} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="profile_picture">Profile Picture:</label>
                                                    <input type="file" name="profile_picture" className="form-control" id="profile_picture" onChange={handleImageUpload} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_gender" className="required">
                                                        Gender:
                                                    </label>
                                                    <select name="gender" className="form-control" required id="id_gender" onChange={handleChange} value={profile.gender}>
                                                        <option value="">---------</option>

                                                        <option value="Male">Male</option>

                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_marital_status">Marital status:</label>
                                                    <select name="marital_status" className="form-control" id="id_marital_status" defaultValue={profile.marital_status} onChange={handleChange}>
                                                        <option value="">---------</option>

                                                        <option value="Married">Married</option>

                                                        <option value="Unmarried">Unmarried</option>

                                                        <option value="Devorced">Devorced</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label>Skills:</label>
                                                    <div className="form-check">
                                                        {skills.map((skill) => (
                                                            <div key={skill.id}>
                                                                <input type="checkbox" name="skills" value={skill.name} className="form-check" checked={profile.skills.includes(skill.name)} onChange={handleSkillChange} />
                                                                <label className="form-check-label">{skill.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="button">
                                                        <button className="btn">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form> */}

                                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="id_first_name" className="required">
                                                        First Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("first_name", {
                                                            required: "First Name is required",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "First Name cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[A-Z][a-z]*$/,
                                                                message: "First name must start with an uppercase letter",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                                                        id="id_first_name"
                                                    />
                                                    {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_last_name" className="required">
                                                        Last Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("last_name", {
                                                            required: "Last Name is required",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Last Name cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[A-Z][a-z]*$/,
                                                                message: "Last name must start with an uppercase letter",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                                                        id="id_last_name"
                                                    />
                                                    {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_city" className="required">
                                                        City:
                                                    </label>
                                                    <input type="text" {...register("city", {required: "City is required", maxLength: 50})} className={`form-control ${errors.city ? "is-invalid" : ""}`} id="id_city" />
                                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_nationality" className="required">
                                                        Nationality:
                                                    </label>
                                                    <input type="text" {...register("nationality", {required: "Nationality is required", maxLength: 50})} className={`form-control ${errors.nationality ? "is-invalid" : ""}`} id="id_nationality" />
                                                    {errors.nationality && <div className="invalid-feedback">{errors.nationality.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_occupation" className="required">
                                                        Occupation:
                                                    </label>
                                                    <input type="text" {...register("occupation", {required: "Occupation is required", maxLength: 50})} className={`form-control ${errors.occupation ? "is-invalid" : ""}`} id="id_occupation" />
                                                    {errors.occupation && <div className="invalid-feedback">{errors.occupation.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_seniority" className="required">
                                                        Seniority:
                                                    </label>
                                                    {/* <Controller
                                                        name="seniority"
                                                        control={control}
                                                        rules={{required: "Seniority is required"}}
                                                        render={({field}) => (
                                                            <select {...field} className={`form-control ${errors.seniority ? "is-invalid" : ""}`} id="id_seniority">
                                                                <option value="">---------</option>
                                                                <option value="Junior / Intern">Junior / Intern</option>
                                                                <option value="1-2 year's experience">1-2 year's experience</option>
                                                                <option value="2-5 year's experience">2-5 year's experience</option>
                                                                <option value="5+ year's experience">5+ year's experience</option>
                                                            </select>
                                                        )}
                                                    /> */}

                                                    <Controller
                                                        name="seniority"
                                                        control={control}
                                                        rules={{required: "Seniority is required"}}
                                                        render={({field}) => (
                                                            <select {...field} className={`form-control ${errors.seniority ? "is-invalid" : ""}`} id="id_seniority" defaultValue={field.value || ""}>
                                                                <option value="">---------</option>
                                                                <option value="Junior / Intern">Junior / Intern</option>
                                                                <option value="1-2 year's experience">1-2 year's experience</option>
                                                                <option value="2-5 year's experience">2-5 year's experience</option>
                                                                <option value="5+ year's experience">5+ year's experience</option>
                                                            </select>
                                                        )}
                                                    />
                                                    {errors.seniority && <div className="invalid-feedback">{errors.seniority.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_website">Website:</label>
                                                    <input
                                                        type="url"
                                                        {...register("website", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "URL cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Please enter a valid URL",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.website ? "is-invalid" : ""}`}
                                                        id="id_website"
                                                    />
                                                    {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_linkedin">LinkedIn:</label>
                                                    <input
                                                        type="url"
                                                        {...register("linkedin", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "URL cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Please enter a valid URL",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.linkedin ? "is-invalid" : ""}`}
                                                        id="id_linkedin"
                                                    />
                                                    {errors.linkedin && <div className="invalid-feedback">{errors.linkedin.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_facebook">Facebook:</label>
                                                    <input
                                                        type="url"
                                                        {...register("facebook", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "URL cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Please enter a valid URL",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.facebook ? "is-invalid" : ""}`}
                                                        id="id_facebook"
                                                    />
                                                    {errors.facebook && <div className="invalid-feedback">{errors.facebook.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_github">Github:</label>
                                                    <input
                                                        type="url"
                                                        {...register("github", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "URL cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Please enter a valid URL",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.github ? "is-invalid" : ""}`}
                                                        id="id_github"
                                                    />
                                                    {errors.github && <div className="invalid-feedback">{errors.github.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_about" className="required">
                                                        About:
                                                    </label>
                                                    <textarea {...register("about", {required: "About is required"})} cols="40" rows="10" className={`form-control ${errors.about ? "is-invalid" : ""}`} id="id_about" />
                                                    {errors.about && <div className="invalid-feedback">{errors.about.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_phone_number">Phone Number:</label>
                                                    <input
                                                        type="text"
                                                        {...register("phone_number", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Phone number cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[0-9]*$/,
                                                                message: "Phone number can only contain numbers",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                                                        id="id_phone_number"
                                                    />
                                                    {errors.phone_number && <div className="invalid-feedback">{errors.phone_number.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="profile_picture">Profile Picture:</label>
                                                    <input type="file" {...register("profile_picture")} className={`form-control ${errors.profile_picture ? "is-invalid" : ""}`} id="profile_picture" />
                                                    {errors.profile_picture && <div className="invalid-feedback">{errors.profile_picture.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_gender" className="required">
                                                        Gender:
                                                    </label>
                                                    <Controller
                                                        name="gender"
                                                        control={control}
                                                        rules={{required: "Gender is required"}}
                                                        render={({field}) => (
                                                            <select {...field} className={`form-control ${errors.gender ? "is-invalid" : ""}`} id="id_gender">
                                                                <option value="">---------</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        )}
                                                    />
                                                    {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_marital_status">Marital Status:</label>
                                                    <Controller
                                                        name="marital_status"
                                                        control={control}
                                                        render={({field}) => (
                                                            <select {...field} className={`form-control ${errors.marital_status ? "is-invalid" : ""}`} id="id_marital_status">
                                                                <option value="">---------</option>
                                                                <option value="Married">Married</option>
                                                                <option value="Unmarried">Unmarried</option>
                                                                <option value="Divorced">Divorced</option>
                                                            </select>
                                                        )}
                                                    />
                                                    {errors.marital_status && <div className="invalid-feedback">{errors.marital_status.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label>Skills:</label>
                                                    <div className="form-check">
                                                        {skills.map((skill) => (
                                                            <div key={skill.id}>
                                                                <input type="checkbox" {...register("skills")} value={skill.name} className="form-check" />
                                                                <label className="form-check-label">{skill.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="button">
                                                        <button type="submit" className="btn" disabled={isLoading}>
                                                            {isLoading ? "Submitting..." : "Save"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
